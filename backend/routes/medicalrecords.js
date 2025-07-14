const express = require('express');
const recordsRouter = express.Router();
const db = require("../utils/databaseutil");

recordsRouter.get("/",async (req,res) =>{
   try{
    const [rows] = await db.query('select * from medicalrecords');
    console.log(rows);
    res.json(rows);
   }
   catch(err){
    console.log(err);
    res.status(404).send("Server Error");
   }

});

recordsRouter.post("/",async (req,res)=>{

  try{
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

    const [result]= await db.query(
  `
  insert into medicalrecords (patientid,doctorid,diagonisis,bloodpressure,bloodsugar,heartrate,temperature,respiratoryrate,oxygensaturation)
  values (?,?,?,?,?,?,?,?,?)
  `,[
    patientid,
    doctorid,
    diagonisis,
    bloodpressure,
    bloodsugar,
    heartrate,
    temperature,
    respiratoryrate,
    oxygensaturation,
    
  ]
    );
    res.status(201).json({message:"Medical Records Successfully ! ",id:result.insertId});
  }
  catch (err) {
    console.error("Error inserting Medical Records:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

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
    duration3,
  } = req.body;

  try {
    const query = `
      INSERT INTO medicalrecords (
        patientid, doctorid, diagonisis, prescriptions, bloodpressure,
        bloodsugar, heartrate, temperature,
        medicine1, dosage1, duration1,
        medicine2, dosage2, duration2,
        medicine3, dosage3, duration3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
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
      duration3,
    ];

    await db.query(query, values);

    res.status(200).json({ message: "Medical record added successfully." });
  } catch (error) {
    console.error("Error adding medical record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

recordsRouter.get("/vitals/:patientid", async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT bloodpressure, bloodsugar, heartrate, temperature,diagonisis
       FROM medicalrecords 
       WHERE patientid = ? 
       ORDER BY recorddate DESC 
       LIMIT 1`,
      [req.params.patientid]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "No vitals found" });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = recordsRouter;
