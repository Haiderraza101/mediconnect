import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";
import ConsultationPanel from "./ConsultationPanel";

const API = import.meta.env.VITE_REACT_APP_API_URL;

const PatientQueue = () => {
  const { curruserdata } = useContext(AppContext);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API}/appointments/queue/${curruserdata.doctorid}`
      );
      const data = await res.json();
      console.log("Queue Fetched:", data);
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patient queue:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (appointmentid) => {
    try {
      await fetch(`${API}/appointments/complete/${appointmentid}`, {
        method: "PUT",
      });
      setPatients((prev) =>
        prev.map((p) =>
          p.appointmentid === appointmentid
            ? { ...p, appointmentstatus: "completed" }
            : p
        )
      );
      setSelectedPatient(null);
    } catch (err) {
      console.error("Failed to update appointment:", err);
    }
  };

  useEffect(() => {
    if (curruserdata?.doctorid) {
      fetchQueue();
    }
  }, [curruserdata]);

  return (
    <section
      id="patientqueue"
      className="bg-white rounded-xl shadow-md p-6 mb-10"
    >
      <h2 className="text-2xl font-semibold text-[#00695C] mb-4">
        Patient Queue
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800 table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : patients.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No patients in queue.
                </td>
              </tr>
            ) : (
              patients.map((p) => (
                <tr key={p.appointmentid} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">
                    {p.firstname} {p.lastname}
                  </td>
                  <td className="px-4 py-2">{p.age}</td>
                  <td className="px-4 py-2">
                    {new Date(p.appointmentdate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    {p.appointmentstatus === "completed" ? (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    ) : (
                      p.appointmentstatus
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {p.appointmentstatus === "completed" ? (
                      <span className="text-gray-500 italic">Done</span>
                    ) : (
                      <button
                        onClick={() => setSelectedPatient(p)}
                        className="bg-[#26A69A] hover:bg-[#00796B] text-white px-4 py-1 rounded"
                      >
                        Start
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <ConsultationPanel
          selectedPatient={selectedPatient}
          onComplete={() => markAsCompleted(selectedPatient.appointmentid)}
        />
      )}
    </section>
  );
};

export default PatientQueue;
