const express = require('express');
const doctorRouter = express.Router();
const db = require('../utils/databaseutil');

doctorRouter.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM doctors');
    res.json(result.rows);
  } catch (err) {
     console.error('ERROR:', err.message);
res.status(500).json({ error: err.message })
  }
});


doctorRouter.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT d.firstname, d.lastname FROM doctors d 
       JOIN users u ON d.userid = u.userid 
       WHERE d.doctorid = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR:', err.message);
res.status(500).json({ error: err.message });

  }
});


doctorRouter.get('/user/:userid', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT d.*, u.username FROM doctors d 
       JOIN users u ON d.userid = u.userid 
       WHERE d.userid = $1`,
      [req.params.userid]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});


doctorRouter.post('/', async (req, res) => {
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
    previousexperience,
  } = req.body;

  try {
    const insertResult = await db.query(
      `INSERT INTO doctors (userid, firstname, lastname, specialization, contactnumber, email, availaibility, age, qualification, previousexperience)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
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
    res.status(201).json(insertResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

doctorRouter.put('/:id', async (req, res) => {
  const {
    firstname,
    lastname,
    specialization,
    contactnumber,
    email,
    availaibility,
    age,
    qualification,
    previousexperience,
  } = req.body;

  try {
    let fields = [];
    let values = [];
    let index = 1;

    if (firstname !== undefined) {
      fields.push(`firstname = $${index++}`);
      values.push(firstname);
    }
    if (lastname !== undefined) {
      fields.push(`lastname = $${index++}`);
      values.push(lastname);
    }
    if (specialization !== undefined) {
      fields.push(`specialization = $${index++}`);
      values.push(specialization);
    }
    if (contactnumber !== undefined) {
      fields.push(`contactnumber = $${index++}`);
      values.push(contactnumber);
    }
    if (email !== undefined) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }
    if (availaibility !== undefined) {
      fields.push(`availaibility = $${index++}`);
      values.push(availaibility);
    }
    if (age !== undefined) {
      fields.push(`age = $${index++}`);
      values.push(age);
    }
    if (qualification !== undefined) {
      fields.push(`qualification = $${index++}`);
      values.push(qualification);
    }
    if (previousexperience !== undefined) {
      fields.push(`previousexperience = $${index++}`);
      values.push(previousexperience);
    }

    if (fields.length === 0) {
      return res.status(400).send('No fields to update');
    }

    const query = `UPDATE doctors SET ${fields.join(', ')} WHERE doctorid = $${index} RETURNING *`;
    values.push(req.params.id);

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send('Doctor not found');
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});


doctorRouter.delete('/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM doctors WHERE doctorid = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Doctor not found');
    }

    res.send('Doctor deleted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


doctorRouter.get('/specialization/:specialization', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT firstname, lastname FROM doctors WHERE specialization = $1`,
      [req.params.specialization]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No Doctor' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


doctorRouter.get('/name/:fullname', async (req, res) => {
  try {
    const [firstname, lastname] = req.params.fullname.split(' ');

    const result = await db.query(
      `SELECT doctorid FROM doctors WHERE firstname = $1 AND lastname = $2`,
      [firstname, lastname]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching doctor ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = doctorRouter;