const express = require('express');
const recordsRouter = express.Router();
const db = require("../utils/databaseutil");

recordsRouter.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM medicalrecords');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

recordsRouter.post("/", async (req, res) => {
  try {
    const {
      patientid,
      doctorid,
      bloodpressure,
      bloodsugar,
      heartrate,
      temperature,
      respiratoryrate,
      oxygensaturation,
      diagonisis
    } = req.body;

    const result = await db.query(
      `INSERT INTO medicalrecords (patientid, doctorid, diagonisis, bloodpressure, bloodsugar, heartrate, temperature, respiratoryrate, oxygensaturation)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING recordid`,
      [
        patientid,
        doctorid,
        diagonisis,
        bloodpressure,
        bloodsugar,
        heartrate,
        temperature,
        respiratoryrate,
        oxygensaturation
      ]
    );
    res.status(201).json({ message: "Medical Records Successfully!", id: result.rows[0].recordid });
  } catch (err) {
    console.error("Error inserting Medical Records:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recordsRouter.post("/add", async (req, res) => {
  console.log("POST /medicalrecords/add received!");
  const {
    patientid,
    doctorid,
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
    duration3
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO medicalrecords (
        patientid, doctorid, diagonisis, prescriptions, bloodpressure,
        bloodsugar, heartrate, temperature,
        medicine1, dosage1, duration1,
        medicine2, dosage2, duration2,
        medicine3, dosage3, duration3
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
      [
        patientid,
        doctorid,
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
        duration3
      ]
    );

    res.status(200).json({ message: "Medical record added successfully." });
  } catch (error) {
    console.error("Error adding medical record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

recordsRouter.get("/vitals/:patientid", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT bloodpressure, bloodsugar, heartrate, temperature, diagonisis
       FROM medicalrecords 
       WHERE patientid = $1 
       ORDER BY recorddate DESC 
       LIMIT 1`,
      [req.params.patientid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No vitals found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = recordsRouter;