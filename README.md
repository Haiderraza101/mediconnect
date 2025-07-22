# 💊 MediConnect - Full Stack Appointment System

MediConnect is a **full-stack medical appointment web application** built using **React.js**, **Node.js**, **Express**, and **MySQL**. It features two separate user interfaces: one for **patients** and one for **doctors**.

Patients can book appointments online, while doctors can manage them in real time, write prescriptions, and send them to patients digitally.

---

## 🖥️ Interfaces

### 👨‍⚕️ Doctor Panel
- Register and log in
- View all upcoming appointments
- Write and send digital prescriptions

### 🧑‍💼 Patient Panel
- Register and log in
- Book an online appointment
- View doctor prescriptions

---

## 🖼️ Screenshots

All project screenshots are available in the [`./screenshots`](./screenshots) folder.


---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ **React.js** – Component-based UI
- 🎨 **Tailwind CSS / CSS** – Styling
- 🔄 **Axios** – API communication

### Backend:
- 🟢 **Node.js + Express.js** – RESTful API backend
- 🐬 **MySQL** – Relational database for storing users, appointments, prescriptions

---

## 🔐 Features

- ✅ Patient & Doctor login/signup (role-based access)
- ✅ Appointment booking & management
- ✅ Real-time appointment status updates
- ✅ Prescription writing & sharing (doctor → patient)
- ✅ Secure authentication with tokens
- ✅ Fully responsive UI for all screens

---

## 🧠 Purpose of the Project

MediConnect was developed to simulate a real-world **healthcare appointment system** with digital interaction between patients and doctors.

It helped me:
- Master full-stack development with MERN-like stack (MySQL instead of MongoDB)
- Handle real-time data flow between client and server
- Work with authentication and authorization securely
- Build scalable REST APIs and manage state across components

---

## 🚀 Getting Started Locally

> You need **Node.js**, **MySQL**, and **npm** installed

### 1. Clone the repository

```bash
git clone https://github.com/Haiderraza101/mediconnect.git
cd mediconnect

```
 Set up the Backend
```bash
cd backend
npm install
npm start
```

Set up the Frontend
Open a new terminal tab:

```bash
cd frontend
cd MediConnect
npm install
npm run dev
```
Then go to: http://localhost:5173
