const express = require('express');
const userRouter = express.Router();
const db = require('../utils/databaseutil');

userRouter.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

userRouter.get("/name/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in route:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE userid = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

userRouter.post("/", async (req, res) => {
  const { username, passwordhash, role } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO users (username, passwordhash, role) VALUES ($1, $2, $3) RETURNING userid`,
      [username, passwordhash, role]
    );
    const inserted = await db.query("SELECT * FROM users WHERE userid = $1", [result.rows[0].userid]);
    res.status(201).json(inserted.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

userRouter.put("/:id", async (req, res) => {
  const { username, passwordhash, role } = req.body;
  const updates = [];
  const values = [];

  if (username !== undefined) {
    updates.push("username = $");
    values.push(username);
  }
  if (passwordhash !== undefined) {
    updates.push("passwordhash = $");
    values.push(passwordhash);
  }
  if (role !== undefined) {
    updates.push("role = $");
    values.push(role);
  }

  if (updates.length === 0) {
    return res.status(400).send("No fields to update");
  }

  const setClause = updates.map((u, i) => `${u}${i + 1}`).join(", ");
  const query = `UPDATE users SET ${setClause} WHERE userid = $${updates.length + 1}`;
  values.push(req.params.id);

  try {
    const result = await db.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }
    const updatedUser = await db.query("SELECT * FROM users WHERE userid = $1", [req.params.id]);
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM users WHERE userid = $1", [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = userRouter;
