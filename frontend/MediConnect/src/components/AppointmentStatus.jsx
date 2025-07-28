import { useEffect, useState, useContext } from "react";
import mediconnectLogo from "../images/mediconnectlogo.png";
import { AppContext } from "../store";

const API = import.meta.env.VITE_REACT_APP_API_URL;

const AppointmentCard = ({ appointment }) => {
  const [showPrescription, setShowPrescription] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [prescription, setprescription] = useState("");

  const fetchPrescription = async () => {
    try {
      const res = await fetch(
        `${API}/checkupinfo/${appointment.appointmentid}`
      );
      const data = await res.json();
      const meds = [];
      for (let i = 1; i <= 3; i++) {
        if (data[`medicine${i}`]) {
          meds.push(
            `${data[`medicine${i}`]} - ${data[`dosage${i}`]} for ${
              data[`duration${i}`]
            }`
          );
        }
      }
      setprescription(data.prescriptions);
      setMedicines(meds);
      setShowPrescription(true);
    } catch (error) {
      console.error("Error fetching prescription:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 mb-8 border border-cyan-300 transition hover:shadow-xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-cyan-800">
            Appointment with Dr. {appointment.docFirst} {appointment.docLast}
          </h2>
          <p className="text-sm text-gray-500">{appointment.qualification}</p>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span
              className={`font-medium ${
                appointment.appointmentstatus === "Completed"
                  ? "text-green-600"
                  : "text-yellow-500"
              }`}
            >
              {appointment.appointmentstatus}
            </span>
          </p>
        </div>

        {appointment.appointmentstatus === "Completed" && (
          <button
            onClick={
              showPrescription
                ? () => setShowPrescription(false)
                : fetchPrescription
            }
            className="mt-4 sm:mt-0 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-sm transition"
          >
            {showPrescription ? "Hide Prescription" : "Check Prescription"}
          </button>
        )}
      </div>

      {showPrescription && appointment.appointmentstatus === "Completed" && (
        <div className="bg-white border border-cyan-200 rounded-xl p-6 shadow-inner">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <img
              src={mediconnectLogo}
              alt="MediConnect Logo"
              className="h-12 w-auto"
            />
            <div className="text-right">
              <h3 className="text-xl font-bold text-cyan-800">
                Dr. {appointment.docFirst} {appointment.docLast}
              </h3>
              <p className="text-sm text-gray-500">
                {appointment.qualification}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-700 mb-2">
              Prescription
            </h4>
            <ul className="list-disc list-inside text-gray-700 pl-4 space-y-1">
              {medicines.length > 0 ? (
                medicines.map((med, idx) => <li key={idx}>{med}</li>)
              ) : (
                <li>No medicines found</li>
              )}
            </ul>
            <h3 className="text-lg font-semibold text-cyan-700 mt-4">
              Advice:
            </h3>
            <p>{prescription}</p>
          </div>

          <div className="border-t pt-4 mt-6 text-sm text-gray-600">
            <p>Contact: +92-336-7407516</p>
            <p>Email: support@mediconnect.com</p>
            <p className="italic text-xs mt-1">Powered by MediConnect</p>
          </div>
        </div>
      )}
    </div>
  );
};

const PatientAppointments = () => {
  const { curruserdata } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `${API}/appointments/my/${curruserdata.patientid}`
        );
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    if (curruserdata?.patientid) {
      fetchAppointments();
    }

    const handler = () => {
      fetchAppointments();
    };

    window.addEventListener("appointmentAdded", handler);
    return () => window.removeEventListener("appointmentAdded", handler);
  }, [curruserdata]);

  if (!curruserdata?.patientid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading your appointments...</p>
      </div>
    );
  }

  return (
    <section id="myappointments">
      <div className="bg-cyan-50 min-h-screen py-16 px-6 sm:px-12">
        <h1 className="text-4xl font-extrabold text-teal-900 text-center mb-12">
          My Appointments
        </h1>
        <div className="max-w-5xl mx-auto">
          {appointments.length === 0 ? (
            <p className="text-center text-gray-600">No appointments found.</p>
          ) : (
            appointments.map((appt, index) => (
              <AppointmentCard key={index} appointment={appt} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PatientAppointments;
