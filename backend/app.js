const express = require('express');
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const users = require('./routes/users');
const doctors = require('./routes/doctors');
const patients = require('./routes/patients');
const feedback = require('./routes/feedback');
const appointments = require('./routes/appointments');
const medicalrecords = require('./routes/medicalrecords');
const checkupinfo = require('./routes/checkupinfo');

app.use("/users", users);
app.use("/doctors", doctors);
app.use("/patients", patients);
app.use("/feedback", feedback);
app.use("/appointments", appointments);
app.use("/medicalrecords", medicalrecords);
app.use("/checkupinfo", checkupinfo);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Hi from Backend" });
});

// ✅ Use Railway-compatible port and host
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
