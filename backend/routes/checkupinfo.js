const express = require('express');
const checkupRouter = express.Router();
const db = require("../utils/databaseutil");

checkupRouter.get("/",async (req,res) =>{
   try{
    const [rows] = await db.query('select * from checkupinfo');
    console.log(rows);
    res.json(rows);
   }
   catch(err){
    console.log(err);
    res.status(404).send("Server Error");
   }

});

checkupRouter.post("/add", async (req, res) => {
  
  const {
    patientid,
    doctorid,
    appointmentid,
    diagonisis,
    prescriptions,
    bloodpressure,
    bloodsugar,
    heartrate,
    temperature,
    medicine1,
    dosage1,
    duration1,
    medicine2,
    dosage2,
    duration2,
    medicine3,
    dosage3,
    duration3,
  } = req.body;

  try {
    const query = `
      INSERT INTO checkupinfo (
        patientid, doctorid, appointmentid,diagonisis, prescriptions, bloodpressure,
        bloodsugar, heartrate, temperature,
        medicine1, dosage1, duration1,
        medicine2, dosage2, duration2,
        medicine3, dosage3, duration3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const values = [
      patientid,
      doctorid,
      appointmentid,
      diagonisis,
      prescriptions,
      bloodpressure,
      bloodsugar,
      heartrate,
      temperature,
      medicine1,
      dosage1,
      duration1,
      medicine2,
      dosage2,
      duration2,
      medicine3,
      dosage3,
      duration3,
    ];

    await db.query(query, values);

    res.status(200).json({ message: "Medical record added successfully." });
  } catch (error) {
    console.error("Error adding medical record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

checkupRouter.get("/:appointmentid", async (req, res) => {
  const { appointmentid } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT prescriptions,
              medicine1, dosage1, duration1,
              medicine2, dosage2, duration2,
              medicine3, dosage3, duration3
       FROM checkupinfo
       WHERE appointmentid = ?`, [appointmentid]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = checkupRouter;