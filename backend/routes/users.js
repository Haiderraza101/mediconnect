const express = require('express');
const userRouter = express.Router();
const db = require('../utils/databaseutil');

userRouter.get("/",async(req,res) => {
  try{
    const [rows] = await db.query('Select * from users');
    console.log(rows);
    res.json(rows);
  }
  catch(err){
     console.log(err);
     res.status(500).send("Serer End");
  }
});

userRouter.get("/name/:username", async (req, res) => {
  const { username } = req.params;
  console.log("Searching for:", username);

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    console.log("Query Result:", rows);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error in route:", err);
    res.status(500).json({ error: "Server Error" });
  }
});
// Get user by ID
userRouter.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Users WHERE userID = ?", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(rows[0]);
    console.log(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

userRouter.post("/",async(req,res) => {
  const {username,passwordhash,role}=req.body;
  try{
    const [result]=await db.query(
      `
      insert into users (username,passwordHash,role)
      values (?,?,?)
      `,
      [username,passwordhash,role]
    );
    const  [rows] = await db.query(
      `
      select * from users where userid = ? 
      `,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  }
  catch(err){
      console.error(err);
    res.status(500).send("Server Error");
  }
})



// Update user
userRouter.put("/:id", async (req, res) => {
  console.log("Entered into the userRouter.put");
  const { username, passwordHash, role } = req.body;
  const updates = [];
  const values = [];

  if (username !== undefined) {
    updates.push("username = ?");
    values.push(username);
  }

  if (passwordHash !== undefined) {
    updates.push("passwordHash = ?");
    values.push(passwordHash);
  }

  if (role !== undefined) {
    updates.push("role = ?");
    values.push(role);
  }

  if (updates.length === 0) {
    return res.status(400).send("No fields to update");
  }

  values.push(req.params.id);

  try {
    const [result] = await db.query(
      `UPDATE Users SET ${updates.join(", ")} WHERE userID = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    // Optionally, fetch updated user
    const [updatedUser] = await db.query("SELECT * FROM Users WHERE userID = ?", [req.params.id]);
    res.json(updatedUser[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM Users WHERE userID = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



module.exports = userRouter;