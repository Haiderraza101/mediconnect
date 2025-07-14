const express = require('express');
const cors = require("cors");

const app=express();
app.use(cors());
app.use(express.json());


const users = require('./routes/users');
const doctors = require('./routes/doctors');
const patients = require('./routes/patients');
const feedback = require('./routes/feedback');
const appointments = require('./routes/appointments');
const medicalrecords = require('./routes/medicalrecords');
const checkupinfo = require('./routes/checkupinfo');

app.use("/users",users);
app.use("/doctors",doctors);
app.use("/patients",patients);
app.use('/feedback',feedback);
app.use('/appointments',appointments);
app.use('/medicalrecords',medicalrecords);
app.use('/checkupinfo',checkupinfo);


app.get("/",(req,res) => {
  res.json({message:"Hello from Backend "});
})

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`)
});