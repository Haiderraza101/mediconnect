const express = require('express');
const doctorRouter = express.Router();
const db= require('../utils/databaseutil');

doctorRouter.get("/",async (req,res)=>{
try{
  const [rows] = await db.query('Select * from doctors');
  console.log(rows);
  res.json(rows);
}
catch(err){
    console.log(err);
    res.status(404).send("Server End");
}
});

doctorRouter.get("/:id",async(req,res) => {

  try{
    const [rows] = await db.query(
    `Select d.firstname , d.lastname from Doctors d 
    join Users u on d.userid = u.userid 
    where d.doctorid = ? 
    `,
    [req.params.id]
  )

  if(rows.length===0){
    return res.status(404).json({error:"Doctor  not Found"});
  }
  res.json(rows[0]);
  }
  catch(err){
    console.log(err);
    res.status(404).send("Server Error");
  }
});

doctorRouter.get("/user/:userid", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT d.*, u.username 
      FROM doctors d
      JOIN users u ON d.userid = u.userid 
      WHERE d.userid = ?
      `,
      [req.params.userid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Server Error" });
  }
});

doctorRouter.post("/",async(req,res)=>{
  const {
    userid,
    firstname,
    lastname,
    specialization,
    contactnumber,
    email,
    availaibility,
    age,
    qualification,
    previousexperience
    
   } = req.body;

  try{
    const [result] = await db.query(
      `
      insert into doctors (userid,firstname,lastname,specialization,contactnumber,email,availaibility,age,qualification,previousexperience)
      values (?,?,?,?,?,?,?,?,?,?)
      `,[
         userid,
         firstname,
         lastname,
         specialization,
         contactnumber,
         email,
        availaibility,
         age,
         qualification,
         previousexperience,
      ]
    );

    const [inserteddoctor] = await db.query(
      `
      Select * from doctors where doctorid=?
      `,[
        [result.insertId]
      ]
    );
    res.status(201).json(inserteddoctor[0]);

  }
  catch(err){
     console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
      res.status(409).send("Patient with this email or contact already exists.");
    } else {
       res.status(500).json({ error: "Server Error" });
    }
  }
})
doctorRouter.put("/:id" , async (req,res) => {

  console.log("Entered in the updation of the doctor ");
  const {
   firstname,
   lastname,
   specialization,
   contactnumber,
   email,
   availaibility,
   age,
   qualification,
   previousexperience
  } = req.body;

try{
    let query = "Update doctors set ";
    const fields = [];
    const values = [];


    if(firstname!=undefined){
      fields.push("firstname = ? ");
      values.push(firstname);
    }
    if(lastname!=undefined){
      fields.push("lastname = ?");
      values.push(lastname);
    }
    if(specialization!=undefined){
      fields.push("contactnumber = ?");
      values.push(contactnumber);
    }
    if(email!=undefined){
      fields.push("email = ? ");
      values.push(email);
    }
    if(availaibility!=undefined){
      fields.push("availaibility=?");
      values.push(availaibility);
    }
    if(age!=undefined){
      fields.push("age=?");
      values.push(age);
    }
    if(qualification!=undefined){
      fields.push("qualification = ?");
      values.push(qualification);
    }
    if(previousexperience!=undefined){
      fields.push("previousexperience = ? ");
      values.push(previousexperience);
    }
    if(fields.length===0){
      return res.status(404).send("No fields to update");
    }

    query +=fields.join(",") + "where doctorid = ?";
    values.push(req.params.id);

    const [result] = await db.query(query,values);
    
    if (result.affectedRows === 0){
      return res.status(404).send("Doctor not found");
    }
    console.log(result);
    const [updatedDoctor] = await db.query(
      `
      Select * from Doctors where doctorid = ?
      `,
      [req.params.id]
    )
    res.status(200).json(updatedDoctor[0]);
}
catch(err){
    console.log(err);
    res.status(500).json({ error: "Server Error" });
}
});

doctorRouter.delete("/:id",async (req,res) => {
  try{
    const [result] = await db.query('Delete from Doctors where doctorid = ? ',[req.params.id])

    if(result.affectedRows===0){
      return res.status(404).send("Doctor not found");
    }

    res.send("Doctor deleted successfully ! ");
  }
  catch(err){
      console.log(err);
      res.status(404).send("Server Error");
  }
});

doctorRouter.get("/specialization/:specialization", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT d.firstname, d.lastname 
      FROM doctors d 
      WHERE specialization = ?
      `,
      [req.params.specialization]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "No Doctor"
      });
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

doctorRouter.get("/name/:fullname", async (req, res) => {
  try {
    const fullname = req.params.fullname;
    const [firstname, lastname] = fullname.split(" ");

    const [rows] = await db.query(
      `SELECT doctorid FROM doctors WHERE firstname = ? AND lastname = ?`,
      [firstname, lastname]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(rows[0]); // { doctorid: ... }
  } catch (err) {
    console.error("Error fetching doctor ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = doctorRouter;