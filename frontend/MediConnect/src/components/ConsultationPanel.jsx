import { useEffect, useRef, useState } from "react";
import { AppContext } from "../store";
import { useContext } from "react";

const API = import.meta.env.VITE_REACT_APP_API_URL;

const ConsultationPanel = ({ selectedPatient, onComplete }) => {
  const [fetchedVitals, setFetchedVitals] = useState(null);
  const [notes, setNotes] = useState("");
  const { appointmentstatus, setappointmentstatus } = useContext(AppContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const medicine1 = useRef();
  const dosage1 = useRef();
  const duration1 = useRef();

  const medicine2 = useRef();
  const dosage2 = useRef();
  const duration2 = useRef();

  const medicine3 = useRef();
  const dosage3 = useRef();
  const duration3 = useRef();

  const prescriptionNotes = useRef();

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const res = await fetch(
          `${API}/medicalrecords/vitals/${selectedPatient.patientid}`
        );
        if (res.ok) {
          const data = await res.json();
          setFetchedVitals({
            bp: data.bloodpressure,
            sugar: data.bloodsugar,
            temp: data.temperature,
            heart: data.heartrate,
            diagonisis: data.diagonisis,
          });
        }
      } catch (err) {
        console.error("Error fetching vitals:", err);
      }
    };

    const fetchAppointmentNotes = async () => {
      try {
        const res = await fetch(
          `${API}/appointments/notes/${selectedPatient.appointmentid}`
        );
        if (res.ok) {
          const data = await res.json();
          setNotes(data.notes || "");
        }
      } catch (err) {
        console.error("Error fetching appointment notes:", err);
      }
    };

    if (selectedPatient?.patientid) {
      fetchVitals();
      fetchAppointmentNotes();
    }
  }, [selectedPatient]);

  const handleComplete = async () => {
    const body = {
      patientid: selectedPatient.patientid,
      doctorid: selectedPatient.doctorid,
      appointmentid: selectedPatient.appointmentid,
      diagonisis: fetchedVitals?.diagonisis,
      prescriptions: prescriptionNotes.current.value,
      bloodpressure: fetchedVitals?.bp || null,
      bloodsugar: fetchedVitals?.sugar || null,
      heartrate: fetchedVitals?.heart ? parseInt(fetchedVitals.heart) : null,
      temperature: fetchedVitals?.temp ? parseFloat(fetchedVitals.temp) : null,
      medicine1: medicine1.current.value,
      dosage1: dosage1.current.value,
      duration1: duration1.current.value,
      medicine2: medicine2.current.value,
      dosage2: dosage2.current.value,
      duration2: duration2.current.value,
      medicine3: medicine3.current.value,
      dosage3: dosage3.current.value,
      duration3: duration3.current.value,
    };

    try {
      const res = await fetch(`${API}/checkupinfo/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false), onComplete();
        }, 1000);

        setappointmentstatus("Completed");
      } else {
        alert("Failed to save consultation.");
      }
    } catch (err) {
      console.error("Error submitting consultation:", err);
    }
  };

  if (!selectedPatient) return null;

  return (
    <div>
      {showSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white border-1 border-cyan-800 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <svg
              className="w-16 h-16 text-green-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-xl font-semibold text-green-600">
              The prescription has been sent to the patient.
            </p>
          </div>
        </div>
      )}

      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl text-[#00695C] mb-6">Consultation Panel</h2>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <p className="mb-1">
              <strong>Name:</strong> {selectedPatient.firstname}{" "}
              {selectedPatient.lastname}
            </p>
            <p className="mb-1">
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p className="mb-4">
              <strong>Status:</strong> {selectedPatient.appointmentstatus}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded mb-6 border">
          <h3 className="text-lg font-medium mb-2 text-[#00695C]">
            Previous Vitals
          </h3>
          <ul className="text-cyan-800 space-y-1">
            <li>
              <strong>Blood Pressure:</strong> {fetchedVitals?.bp || "N/A"}
            </li>
            <li>
              <strong>Blood Sugar:</strong> {fetchedVitals?.sugar || "N/A"}
            </li>
            <li>
              <strong>Temperature:</strong> {fetchedVitals?.temp || "N/A"}
            </li>
            <li>
              <strong>Heart Rate:</strong> {fetchedVitals?.heart || "N/A"}
            </li>
          </ul>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded border">
          <h3 className="text-lg font-medium mb-2 text-[#00695C]">
            Symptoms / Complaints
          </h3>
          <p className="text-gray-800">
            {fetchedVitals?.diagonisis || "No known disease"}
          </p>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded border">
          <h3 className="text-lg font-medium mb-2 text-[#00695C]">
            Extra Notes
          </h3>
          <p className="text-gray-800">{notes || "No extra Notes"}</p>
        </div>

        <input type="file" className="mb-4" />

        {[1, 2, 3].map((num) => (
          <div key={num} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              ref={eval(`medicine${num}`)}
              placeholder={`Medicine ${num}`}
              className="p-3 border rounded shadow-sm"
            />
            <input
              ref={eval(`dosage${num}`)}
              placeholder={`Dosage ${num}`}
              className="p-3 border rounded shadow-sm"
            />
            <input
              ref={eval(`duration${num}`)}
              placeholder={`Duration ${num}`}
              className="p-3 border rounded shadow-sm"
            />
          </div>
        ))}

        <textarea
          ref={prescriptionNotes}
          placeholder="Prescription Notes"
          className="w-full p-3 border rounded shadow-sm mb-4"
          rows="3"
        ></textarea>

        <button
          onClick={handleComplete}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition"
        >
          Finish Consultation
        </button>
      </section>
    </div>
  );
};

export default ConsultationPanel;
