const express = require('express');
const patientRouter = express.Router();
const db = require("../utils/databaseutil");

patientRouter.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM patients');
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

patientRouter.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.*, u.username
       FROM patients p
       JOIN users u ON p.userid = u.userid
       WHERE p.patientid = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not Found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

patientRouter.get("/user/:userid", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.*, u.username
       FROM patients p
       JOIN users u ON p.userid = u.userid
       WHERE p.userid = $1`,
      [req.params.userid]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

patientRouter.post("/", async (req, res) => {
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
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO patients (userid, firstname, lastname, gender, contactnumber, email, address, medicalhistory, disease, age)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING patientid`,
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
    const insertedPatient = await db.query(
      `SELECT * FROM patients WHERE patientid = $1`,
      [result.rows[0].patientid]
    );
    res.status(201).json(insertedPatient.rows[0]);
  } catch (err) {
    console.log(err);
    if (err.code === "23505") { // Unique violation
      res.status(409).send("Patient with this email or contact already exists.");
    } else {
      return res.status(500).json({ error: "Server Error" });
    }
  }
});

patientRouter.put("/:id", async (req, res) => {
  const {
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

  try {
    let query = "UPDATE patients SET ";
    const updates = [];
    const values = [];

    if (firstname !== undefined) {
      updates.push("firstname = $");
      values.push(firstname);
    }
    if (lastname !== undefined) {
      updates.push("lastname = $");
      values.push(lastname);
    }
    if (dateofbirth !== undefined) {
      updates.push("dateofbirth = $");
      values.push(dateofbirth);
    }
    if (gender !== undefined) {
      updates.push("gender = $");
      values.push(gender);
    }
    if (contactnumber !== undefined) {
      updates.push("contactnumber = $");
      values.push(contactnumber);
    }
    if (email !== undefined) {
      updates.push("email = $");
      values.push(email);
    }
    if (address !== undefined) {
      updates.push("address = $");
      values.push(address);
    }
    if (medicalhistory !== undefined) {
      updates.push("medicalhistory = $");
      values.push(medicalhistory);
    }
    if (disease !== undefined) {
      updates.push("disease = $");
      values.push(disease);
    }
    if (age !== undefined) {
      updates.push("age = $");
      values.push(age);
    }

    if (updates.length === 0) {
      return res.status(400).send("No fields to update");
    }

    const setClause = updates.map((u, i) => `${u}${i + 1}`).join(", ");
    query += setClause + ` WHERE patientid = $${updates.length + 1}`;
    values.push(req.params.id);

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).send("Patient not found");
    }

    const updated = await db.query("SELECT * FROM patients WHERE patientid = $1", [req.params.id]);
    res.json(updated.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

patientRouter.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM patients WHERE patientid = $1", [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).send("Patient not found");
    }
    res.send("Patient deleted successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = patientRouter;
