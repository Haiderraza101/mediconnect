const express = require('express');
const appointmentRouter = express.Router();
const db = require("../utils/databaseutil");

appointmentRouter.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM appointments');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

appointmentRouter.post("/", async (req, res) => {
  try {
    const {
      patientid,
      doctorid,
      appointmentdate,
      appointmentstatus,
      notes
    } = req.body;

    const result = await db.query(
      `INSERT INTO appointments (patientid, doctorid, appointmentdate, appointmentstatus, notes)
       VALUES ($1, $2, $3, $4, $5) RETURNING appointmentid`,
      [patientid, doctorid, appointmentdate, appointmentstatus, notes]
    );

    res.status(201).json({ message: "Appointment created Successfully!", id: result.rows[0].appointmentid });
  } catch (err) {
    console.error("Error inserting appointment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/appointmentstoday/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(appointmentid) AS totalappointmentstoday
       FROM appointments
       WHERE appointmentdate = CURRENT_DATE AND doctorid = $1`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error counting total appointments today:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/pendingpatients/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(appointmentid) AS totalpendingpatients
       FROM appointments
       WHERE appointmentdate = CURRENT_DATE AND doctorid = $1 AND appointmentstatus = 'Scheduled'`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error counting pending appointments today:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/completedappointments/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(appointmentid) AS completedappointments
       FROM appointments
       WHERE appointmentdate = CURRENT_DATE AND doctorid = $1 AND appointmentstatus = 'Completed'`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error counting completed appointments today:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/nextpatient/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.firstname, p.lastname
       FROM appointments u
       JOIN patients p ON u.patientid = p.patientid
       WHERE u.doctorid = $1 
         AND u.appointmentdate = CURRENT_DATE 
         AND u.appointmentstatus = 'Scheduled'
       ORDER BY u.appointmentid ASC
       LIMIT 1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No upcoming patient found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in getting next patient:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
appointmentRouter.get("/queue/:doctorid", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
         a.appointmentid,
         a.patientid,
         a.doctorid, 
         a.appointmentdate,
         a.appointmentstatus,
         p.firstname,
         p.lastname,
         p.age
       FROM appointments a
       JOIN patients p ON a.patientid = p.patientid
       WHERE a.doctorid = $1 
         AND a.appointmentdate = CURRENT_DATE 
         AND a.appointmentstatus != 'Completed'
       ORDER BY a.appointmentdate ASC`,
      [req.params.doctorid]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching patient queue:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


appointmentRouter.put("/complete/:appointmentid", async (req, res) => {
  try {
    await db.query(
      `UPDATE appointments SET appointmentstatus = 'Completed' WHERE appointmentid = $1`,
      [req.params.appointmentid]
    );
    res.json({ message: "Appointment marked as completed" });
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/notes/:appointmentid", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT notes FROM appointments WHERE appointmentid = $1`,
      [req.params.appointmentid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ notes: result.rows[0].notes });
  } catch (err) {
    console.error("Error fetching appointment notes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

appointmentRouter.get("/my/:patientid", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT a.appointmentid, a.doctorid, a.appointmentstatus, a.appointmentdate,
              d.firstname AS docfirst, d.lastname AS doclast, d.qualification
       FROM appointments a
       JOIN doctors d ON a.doctorid = d.doctorid
       WHERE a.patientid = $1`,
      [req.params.patientid]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = appointmentRouter;
