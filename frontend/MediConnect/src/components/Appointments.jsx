import { useContext, useRef, useState } from "react";
import AppointmentStatus from "./AppointmentStatus";
import doctorwitpatient from "../images/doctorwithpatient.jpg";
import { AppContext } from "../store";

const Appointments = () => {
  const { appointmentstatus, curruserdata } = useContext(AppContext);

  const specializationofdoctor = useRef();
  const doctor = useRef();
  const appointmentdate = useRef();
  const bloodpressure = useRef();
  const bloodsugar = useRef();
  const heartrate = useRef();
  const temperature = useRef();
  const respiratoryrate = useRef();
  const oxygensaturation = useRef();
  const notes = useRef();
  const diagnosis = useRef();

  const [doctors, setdoctors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  async function Submit(event) {
    event.preventDefault();

    const Specializationofdoctor = specializationofdoctor.current.value;
    const Doctorname = doctor.current.value;
    const Appointmentdate = appointmentdate.current.value;
    const Bloodpressure = bloodpressure.current.value;
    const Bloodsugar = bloodsugar.current.value;
    const Heartrate = heartrate.current.value;
    const Temperature = temperature.current.value;
    const Respiratoryrate = respiratoryrate.current.value;
    const Oxygensaturation = oxygensaturation.current.value;
    const Notes = notes.current.value;
    const Diagnosis = diagnosis.current.value;

    const { patientid } = curruserdata;

    if (!Doctorname || !Appointmentdate || !Diagnosis) {
      alert("Please fill all required fields.");
      return;
    }

    const doctoridresponse = await fetch(
      `http://localhost:3000/doctors/name/${Doctorname}`
    );

    if (!doctoridresponse.ok) {
      alert("No Doctor exists with this name");
      return;
    }

    const doctorData = await doctoridresponse.json();
    const doctorid = doctorData.doctorid;

    const appointmentresponse = await fetch(
      "http://localhost:3000/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientid,
          doctorid,
          appointmentdate: Appointmentdate,
          appointmentstatus,
          notes: Notes,
        }),
      }
    );

    if (!appointmentresponse.ok) {
      alert("Appointment not made. There is an error");
      return;
    }

    const recordsresponse = await fetch(
      "http://localhost:3000/medicalrecords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientid,
          doctorid,
          diagnosis: Diagnosis,
          bloodpressure: Bloodpressure,
          bloodsugar: Bloodsugar,
          heartrate: Heartrate,
          temperature: Temperature,
          respiratoryrate: Respiratoryrate,
          oxygensaturation: Oxygensaturation,
        }),
      }
    );

    if (!recordsresponse.ok) {
      alert("There is an error. Records are not saved.");
      return;
    }

    // Clear input fields
    [
      specializationofdoctor,
      doctor,
      diagnosis,
      appointmentdate,
      bloodpressure,
      bloodsugar,
      heartrate,
      temperature,
      respiratoryrate,
      oxygensaturation,
      notes,
    ].forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);
    window.dispatchEvent(new Event("appointmentAdded")); // optional event trigger
  }

  const handlespecializationchange = async () => {
    const Specializationofdoctor = specializationofdoctor.current.value;

    try {
      const response = await fetch(
        `http://localhost:3000/doctors/specialization/${Specializationofdoctor}`
      );
      if (!response.ok) {
        alert("No Doctor exists with this specialization");
        setdoctors([]);
        return;
      }

      const doctorinfo = await response.json();
      setdoctors(doctorinfo);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      alert("Server error while fetching doctors");
      setdoctors([]);
    }
  };

  return (
    <section id="appointment">
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
              Appointment Scheduled!
            </p>
          </div>
        </div>
      )}

      <form onSubmit={Submit}>
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden max-w-6xl mx-auto my-10">
          <div className="md:w-1/2 bg-gradient-to-br from-teal-200 to-cyan-800 text-white p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Make Appointment & Take Care Of Your Healthy Life
              </h2>
              <p className="text-sm opacity-90">
                Book now for a healthier you — where care meets commitment.
              </p>
            </div>
            <div className="mt-6">
              <img
                src={doctorwitpatient}
                alt="Doctors team"
                className="w-full h-56 md:h-full object-cover rounded-md shadow-lg"
              />
            </div>
          </div>

          <div className="md:w-1/2 bg-white p-8 space-y-4">
            <div className="flex space-x-4">
              <select
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                ref={specializationofdoctor}
                onChange={handlespecializationchange}
              >
                <option value="">Select Specialization</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroentrologist">Gastroentrologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Eye Specialist">Eye Specialist</option>
                <option value="ENT Specialist">ENT Specialist</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </select>

              <select
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                ref={doctor}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc, index) => (
                  <option
                    key={index}
                    value={`${doc.firstname} ${doc.lastname}`}
                  >
                    {doc.firstname} {doc.lastname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <select
                ref={diagnosis}
                required
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Disease</option>
                <option value="Migraine">Migraine</option>
                <option value="Epilepsy">Epilepsy</option>
                <option value="Parkinson's">Parkinson's</option>
                <option value="IBS">Irritable Bowel Syndrome (IBS)</option>
                <option value="GERD">GERD</option>
                <option value="Crohn's">Crohn's Disease</option>
                <option value="Arthritis">Arthritis</option>
                <option value="Fracture">Fracture</option>
                <option value="Back Pain">Back Pain</option>
                <option value="Acne">Acne</option>
                <option value="Eczema">Eczema</option>
                <option value="Psoriasis">Psoriasis</option>
                <option value="Asthma">Asthma</option>
                <option value="COPD">COPD</option>
                <option value="Pulmonologist - Pneumonia">Pneumonia</option>
                <option value="Cataract">Cataract</option>
                <option value="Glaucoma">Glaucoma</option>
                <option value="Conjunctivitis">Conjunctivitis</option>
                <option value="Sinusitis">Sinusitis</option>
                <option value="Hearing Loss">Hearing Loss</option>
                <option value="Tonsillitis">Tonsillitis</option>
                <option value="Depression">Depression</option>
                <option value="Anxiety">Anxiety</option>
                <option value="Bipolar">Bipolar Disorder</option>
                <option value="Other">Other (Specify in notes)</option>
              </select>

              <input
                type="date"
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                ref={appointmentdate}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Blood Pressure"
                ref={bloodpressure}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Blood Sugar"
                ref={bloodsugar}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Heart Rate"
                ref={heartrate}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Temperature"
                ref={temperature}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Respiratory Rate"
                ref={respiratoryrate}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Oxygen Saturation"
                ref={oxygensaturation}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <textarea
              ref={notes}
              placeholder="Additional details"
              className="w-full p-3 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-semibold transition"
            >
              Make Appointment
            </button>
          </div>
        </div>
      </form>
      <AppointmentStatus />
    </section>
  );
};

export default Appointments;
