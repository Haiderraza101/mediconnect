import { AppContext } from "../store";
import { useContext, useState, useEffect } from "react";

const DoctorDashboard = () => {
  const { curruserdata } = useContext(AppContext);
  const [todayappointments, setTodayAppointments] = useState(null);
  const [pendingpatients, setpendingpatients] = useState(null);
  const [completedappointments, setcompletedappointments] = useState(null);
  const { doctorid } = curruserdata;
  const [nextpatient, setnextpatient] = useState(null);

  useEffect(() => {
    if (doctorid) {
      Getappointmentinformation();
    }
  }, [doctorid]);
  console.log(doctorid);

  async function Getappointmentinformation() {
    try {
      const appointmenttodayresponse = await fetch(
        `http://localhost:3000/appointments/appointmentstoday/${doctorid}`
      );

      if (!appointmenttodayresponse.ok) {
        alert("Failed to fetch number of appointments today");
        return;
      }

      const appointmenttoday = await appointmenttodayresponse.json();
      setTodayAppointments(appointmenttoday.totalAppointmentsToday);

      console.log("Today's Appointments:", todayappointments);
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
      alert("Something went wrong while fetching appointments");
    }

    try {
      const pendingpatientresponse = await fetch(`
        http://localhost:3000/appointments/pendingpatients/${doctorid}
        `);
      if (!pendingpatientresponse.ok) {
        alert("Failed to fetch number of penidng appointments today");
        return;
      }

      const patientspending = await pendingpatientresponse.json();
      setpendingpatients(patientspending.totalpendingpatients);

      console.log("Pending Appointments :", pendingpatients);
    } catch (error) {
      console.error("Error fetching today's pending appointments:", error);
      alert("Something went wrong while fetching pending appointments");
    }

    try {
      const completedappointmentsresponse = await fetch(`
        http://localhost:3000/appointments/completedappointments/${doctorid}
        `);
      if (!completedappointmentsresponse.ok) {
        alert("Failed to fetch number of completed appointments today");
        return;
      }

      const appointmentscompleted = await completedappointmentsresponse.json();
      setcompletedappointments(appointmentscompleted.completedappointments);

      console.log("Completed Appointments :", completedappointments);
    } catch (error) {
      console.error("Error fetching today's completed appointments:", error);
      alert("Something went wrong while fetching completed appointments");
    }

    try {
      const nextpatientresponse = await fetch(`
        http://localhost:3000/appointments/nextpatient/${doctorid}
        `);
      if (!nextpatientresponse.ok) {
        return;
      }

      const patientnext = await nextpatientresponse.json();
      setnextpatient(patientnext);
      console.log("Next Patient :", nextpatient);
    } catch (error) {
      console.error("Error fetching next patient", error);
      alert("Something went wrong while fetching next patient");
    }
  }

  return (
    <section id="doctordashboard">
      <h1 className="text-4xl font-bold text-teal-900 text-center mt-10">
        Dashboard
      </h1>
      <div className="text-center mt-5">
        <button
          className="mt-3 bg-[#00897B] hover:bg-[#00695C] text-white px-4 py-2 rounded transition"
          onClick={() => {
            Getappointmentinformation();
          }}
        >
          Update
        </button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 py-20 bg-white">
        <div className="bg-cyan-50 rounded-xl shadow-md p-5 text-center">
          <h2 className="text-sm font-semibold text-gray-500">
            Appointments Today
          </h2>
          <p className="text-4xl font-bold text-[#00897B]">
            {todayappointments ? todayappointments : 0}
          </p>
        </div>
        <div className="bg-cyan-50 rounded-xl shadow-md p-5 text-center">
          <h2 className="text-sm font-semibold text-gray-500">
            Pending Patients
          </h2>
          <p className="text-4xl font-bold text-yellow-500">
            {pendingpatients ? pendingpatients : 0}
          </p>
        </div>
        <div className="bg-cyan-50 rounded-xl shadow-md p-5 text-center">
          <h2 className="text-sm font-semibold text-gray-500">Completed</h2>
          <p className="text-4xl font-bold text-green-600">
            {" "}
            {completedappointments ? completedappointments : 0}
          </p>
        </div>
        <div className="bg-cyan-50 rounded-xl shadow-md p-5 text-center">
          <h2 className="text-sm font-semibold text-gray-500">Next Patient</h2>
          <p className="text-xl font-medium mt-2">
            {nextpatient
              ? `${nextpatient.firstname} ${nextpatient.lastname}`
              : "No Patient"}
          </p>
        </div>
      </section>
    </section>
  );
};

export default DoctorDashboard;
