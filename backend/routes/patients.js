const express = require('express');
const patientRouter = express.Router();
const db = require("../utils/databaseutil");

patientRouter.get("/",async (req,res) =>{
   try{
    const [rows] = await db.query('select * from patients');
    console.log(rows);
    res.json(rows);
   }
   catch(err){
    console.log(err);
    res.status(404).send("Server Error");
   }

});

patientRouter.get("/:id",async (req,res) => {
    try{
      const [rows] = await db.query(
        `
        Select p.* , u.username
        from patients p join users u on 
        p.userid = u.userid 
        where p.patientid = ? 
        `,
        [req.params.id]
      );
       if (rows.length===0){
      return res.status(404).json({error:"Patient not Found"});
       }
       res.json(rows[0]);
    }
    catch(err){
      console.log(err);
    res.status(500).json({ error: "Server Error" });
    }
});

patientRouter.get("/user/:userid", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT p.*, u.username 
      FROM patients p 
      JOIN users u ON p.userid = u.userid 
      WHERE p.userid = ?
      `,
      [req.params.userid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});


patientRouter.post("/",async(req,res)=>{
  const {
   userid,
   firstname,
   lastname,
   dateofbirth,
   gender,
   contactnumber,
   email,
   address,
   medicalhistory,
   disease,
   age
  }  = req.body;

  try {
    const [result] = await db.query(
      `
      insert into patients (userid,firstname,lastname,gender,contactnumber,email,address,medicalhistory,disease,age)
      values (?,?,?,?,?,?,?,?,?,?)
      `,
      [
        userid,
        firstname,
        lastname,
        gender,
        contactnumber,
        email,
        address,
        medicalhistory,
        disease,
        age
      ]
    );
    const [insertedpatient] = await db.query(
      `
      select * from patients where patientid = ?
      `,[result.insertId]
    );
    res.status(201).json(insertedpatient[0]);
  }
  catch(err){
     console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
      res.status(409).send("Patient with this email or contact already exists.");
    } else {
      return res.status(404).json({error:"Patient not Found"});
    }
  }
})
patientRouter.put("/:id",async(req,res) => {
  const{
    firstname,
    lastname,
    dateofbirth,
    gender,
    contactnumber,
    email,
    address,
    medicalhistory,
    disease,
    age
  } = req.body;

  try{
    let query = "Update patients set ";
    const updates = [];
    const values = [];

    if(firstname!=undefined){
      updates.push("firstname = ?");
      values.push(firstname);
    }
    if(lastname!=undefined){
      updates.push("lastname = ? ");
      values.push(lastname);
    }
    if (dateofbirth!=undefined){
      updates.push("dateofbirth = ?");
      values.push(dateofbirth);
    }
    if(gender != undefined){
      updates.push("gender = ? ");
      values.push(gender);
    }
    if(contactnumber!=undefined){
      updates.push("contactnumber = ? ");
      values.push(contactnummber);
    }
    if(email!=undefined){
      updates.push("email = ?");
      values.push(email);
    }
    if (address=undefined){
      updates.push("address = ? ");
      values.push(address);
    }
    if(medicalhistory!=undefined){
      updates.push("medicalhistory = ?");
      values.push(medicalhistory);
    }
     if(medicalhistory!=undefined){
      updates.push("disease = ?");
      values.push(disease);
    }
     if(medicalhistory!=undefined){
      updates.push("age = ?");
      values.push(age);
    }
    if(updates.length===0){
      return res.status(404).send("no fields to  update ");
    }

    query+=updates.join(",") + "where patiendid = ?";
    values.push(req.params.id);

    const [rows] = await db.query(query,values);

    if(result.affectedRows===0){
      return res.status(404).send('Patient not found');
    }

    const [updated] = await db.query("Select * from patients where patientid = ? ",[req.params.id]);

       res.json(updated[0])
  }

  catch(err){
    console.log(err);
    res.status(404).send("Server Error");
  }
});

patientRouter.delete("/:id",async (req,res) =>{
  try{
    const [result] = await db.query(
      "Delete from patients where patientid = ? ",[req.params.id]
    );
    if(result.affectedRows===0){
      return res.status(404).send("Patient not found ");
    }
    res.send("Patient deleted successfully ! ");
  }
  catch(err){
    console.log(err);
    res.status(404).send("Server Error ");
  }
})
module.exports = patientRouter;