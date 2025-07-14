const express = require('express');
const appointmentRouter = express.Router();
const db = require("../utils/databaseutil");


appointmentRouter.get("/",async (req,res) =>{
   try{
    const [rows] = await db.query('select * from appointments');
    console.log(rows);
    res.json(rows);
   }
   catch(err){
    console.log(err);
    res.status(404).send("Server Error");
   }

});

appointmentRouter.post("/",async (req,res)=>{

  try{
    const {
       patientid,
       doctorid,
       appointmentdate,
       appointmentstatus,
       notes
    } = req.body;

    const [result]= await db.query(
  `
  insert into appointments (patientid,doctorid,appointmentdate,appointmentstatus,notes)
  values (?,?,?,?,?)
  `,[
    patientid,
    doctorid,
    appointmentdate,
    appointmentstatus,
    notes
  ]
    );
    res.status(201).json({message:"Appointment created Successfully ! ",id:result.insertId});
  }
  catch (err) {
    console.error("Error inserting appointment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

appointmentRouter.get("/appointmentstoday/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(appointmentid) AS totalAppointmentsToday
      FROM appointments
      WHERE appointmentdate = CURDATE() AND doctorid = ?
      `,
      [req.params.id]
    );
    console.log(rows);
    res.json(rows[0]);
  } catch (err) {
    console.error("Error counting total appointments today:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/pendingpatients/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(appointmentid) AS totalpendingpatients
      FROM appointments
      WHERE appointmentdate = CURDATE() AND doctorid = ? AND appointmentstatus='Scheduled'
      `,
      [req.params.id]
    );
    console.log(rows);
    res.json(rows[0]);
  } catch (err) {
    console.error("Error counting pending appointments today:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


appointmentRouter.get("/completedappointments/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(appointmentid) AS completedappointments
      FROM appointments
      WHERE appointmentdate = CURDATE() AND doctorid = ? AND appointmentstatus='Completed'
      `,
      [req.params.id]
    );
    console.log(rows);
    res.json(rows[0]);
  } catch (err) {
    console.error("Error counting completed appointments today:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/nextpatient/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT p.firstname, p.lastname
      FROM appointments u
      JOIN patients p ON u.patientid = p.patientid
      WHERE u.doctorid = ? 
        AND u.appointmentdate = CURDATE() 
        AND u.appointmentstatus = 'Scheduled'
      ORDER BY u.appointmentid ASC
      LIMIT 1
      `,
      [req.params.id]
    );

    console.log(rows);
    if (rows.length === 0) {
      return res.status(404).json({ message: "No upcoming patient found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error in getting next patient:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/queue/:doctorid", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        a.appointmentid,
        a.patientid,
        a.appointmentdate,
        a.appointmentstatus,
        p.firstname,
        p.lastname,
        p.age
      FROM appointments a
      JOIN patients p ON a.patientid = p.patientid
      WHERE a.doctorid = ? AND a.appointmentdate = CURDATE() AND a.appointmentstatus != 'Completed'
      ORDER BY a.appointmentdate ASC
      `,
      [req.params.doctorid]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching patient queue:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.put("/complete/:appointmentid", async (req, res) => {
  try {
    const [result] = await db.query(
      `UPDATE appointments SET appointmentstatus = 'Completed' WHERE appointmentid = ?`,
      [req.params.appointmentid]
    );
    res.json({ message: "Appointment marked as completed" });
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/notes/:appointmentid", async (req, res) => {
  const { appointmentid } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT notes FROM appointments WHERE appointmentid = ?",
      [appointmentid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ notes: rows[0].notes });
  } catch (err) {
    console.error("Error fetching appointment notes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

appointmentRouter.get("/my/:patientid", async (req, res) => {
  const { patientid } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT a.appointmentid,a.doctorid,a.appointmentstatus,a.appointmentdate,
              d.firstname AS docFirst, d.lastname AS docLast, d.qualification
       FROM appointments a
       JOIN doctors d ON a.doctorid = d.doctorid
       WHERE a.patientid = ?`, [patientid]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = appointmentRouter;