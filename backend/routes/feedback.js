const expresss = require('express');
const feedbackRouter = expresss.Router();
const db = require('../utils/databaseutil');

feedbackRouter.get("/",async(req,res)=> {
  try{
    const [rows] = await db.query(`
      Select * from feedback
      `);
      console.log(rows);
      res.json(rows);
  }
  catch(err){
    console.log(err);
    res.status(404).send("Server Error");
  }
});

feedbackRouter.get("/:id",async (req,res) => {
      try{
        const [rows] = await db.query(
    `  
     Select * from feedback where feedbackid = ?
    `,[req.params.id]
        );
        
        if (rows.length===0){
          return res.status(404).send("Feedback not found");
        }
        res.json([rows[0]]);
      }
      catch(err){
        console.log(err);
        res.status(404).send("Server Error")
      }
});

feedbackRouter.post("/:id",async(req,res)=>{
     const {patientid,doctorid,rating,comments}=req.body;

     try{
      const [result] = await db.query(
        `
        insert into feedback (patiendid,doctorid,rating,comments) values (?,?,?,?)
        `,
     [patientID, doctorID, rating, comments]
    );
    const [inserted] = await db.query("SELECT * FROM Feedback WHERE feedbackID = ?", [result.insertId]);
    res.status(201).json(inserted[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

feedbackRouter.put("/:id", async (req, res) => {
  const {
    patientID,
    doctorID,
    rating,
    comments,
    feedbackPostDate
  } = req.body;

  try {
    let query = "UPDATE Feedback SET ";
    const updates = [];
    const values = [];

    if (patientID !== undefined) {
      updates.push("patientID = ?");
      values.push(patientID);
    }

    if (doctorID !== undefined) {
      updates.push("doctorID = ?");
      values.push(doctorID);
    }

    if (rating !== undefined) {
      updates.push("rating = ?");
      values.push(rating);
    }

    if (comments !== undefined) {
      updates.push("comments = ?");
      values.push(comments);
    }

    if (feedbackPostDate !== undefined) {
      updates.push("feedbackPostDate = ?");
      values.push(feedbackPostDate);
    }

    if (updates.length === 0) {
      return res.status(400).send("No fields to update");
    }

    query += updates.join(", ") + " WHERE feedbackID = ?";
    values.push(req.params.id);

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).send("Feedback not found");
    }

    const [updated] = await db.query("SELECT * FROM Feedback WHERE feedbackID = ?", [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

feedbackRouter.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM Feedback WHERE feedbackID = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Feedback not found");
    }

    res.send("Feedback deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


module.exports = feedbackRouter;