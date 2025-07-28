const express = require('express');
const checkupRouter = express.Router();
const db = require("../utils/databaseutil");

checkupRouter.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM checkupinfo');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message, err.stack);
    res.status(500).send("Server Error");
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
    duration3
  } = req.body;

  // Basic validation
  if (!patientid || !doctorid || !appointmentid) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("Received values for /add route:", {
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
    duration3
  });

  try {
    const query = `
      INSERT INTO checkupinfo (
        patientid, doctorid, appointmentid, diagonisis, prescriptions, bloodpressure,
        bloodsugar, heartrate, temperature,
        medicine1, dosage1, duration1,
        medicine2, dosage2, duration2,
        medicine3, dosage3, duration3
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12,
        $13, $14, $15,
        $16, $17, $18
      )
    `;

    const values = [
      patientid,
      doctorid,
      appointmentid,
      diagonisis,
      prescriptions,
      bloodpressure,
      bloodsugar,
      heartrate ? Number(heartrate) : null,
      temperature ? parseFloat(temperature) : null,
      medicine1,
      dosage1,
      duration1,
      medicine2,
      dosage2,
      duration2,
      medicine3,
      dosage3,
      duration3
    ];

    await db.query(query, values);
    res.status(200).json({ message: "Medical record added successfully." });
  } catch (error) {
    console.error("Error adding medical record:", error.message, error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

checkupRouter.get("/:appointmentid", async (req, res) => {
  const { appointmentid } = req.params;
  try {
    const result = await db.query(
      `SELECT prescriptions,
              medicine1, dosage1, duration1,
              medicine2, dosage2, duration2,
              medicine3, dosage3, duration3
       FROM checkupinfo
       WHERE appointmentid = $1`,
      [appointmentid]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message, err.stack);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = checkupRouter;
