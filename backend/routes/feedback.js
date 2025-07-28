const express = require('express');
const feedbackRouter = express.Router();
const db = require('../utils/databaseutil');

feedbackRouter.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feedback');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

feedbackRouter.get("/:id", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feedback WHERE feedbackid = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Feedback not found");
    }
    res.json([result.rows[0]]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

feedbackRouter.post("/:id", async (req, res) => {
  const { patientid, doctorid, rating, comments } = req.body;

  try {
    const insertResult = await db.query(
      `INSERT INTO feedback (patientid, doctorid, rating, comments) VALUES ($1, $2, $3, $4) RETURNING *`,
      [patientid, doctorid, rating, comments]
    );
    res.status(201).json(insertResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

feedbackRouter.put("/:id", async (req, res) => {
  const {
    patientid,
    doctorid,
    rating,
    comments,
    feedbackpostdate
  } = req.body;

  try {
    const fields = [];
    const values = [];
    let idx = 1;

    if (patientid !== undefined) {
      fields.push(`patientid = $${idx++}`);
      values.push(patientid);
    }
    if (doctorid !== undefined) {
      fields.push(`doctorid = $${idx++}`);
      values.push(doctorid);
    }
    if (rating !== undefined) {
      fields.push(`rating = $${idx++}`);
      values.push(rating);
    }
    if (comments !== undefined) {
      fields.push(`comments = $${idx++}`);
      values.push(comments);
    }
    if (feedbackpostdate !== undefined) {
      fields.push(`feedbackpostdate = $${idx++}`);
      values.push(feedbackpostdate);
    }

    if (fields.length === 0) {
      return res.status(400).send("No fields to update");
    }

    values.push(req.params.id);

    const query = `UPDATE feedback SET ${fields.join(", ")} WHERE feedbackid = $${idx}`;
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).send("Feedback not found");
    }

    const updated = await db.query("SELECT * FROM feedback WHERE feedbackid = $1", [req.params.id]);
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

feedbackRouter.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM feedback WHERE feedbackid = $1", [req.params.id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Feedback not found");
    }

    res.send("Feedback deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = feedbackRouter;
