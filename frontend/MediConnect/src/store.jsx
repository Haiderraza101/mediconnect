import { createContext, useState, useEffect } from "react";

export const AppContext = createContext({
  curruserdata: {},
  setcurruserdata: () => {},
  doctordata: {},
  setdoctordata: () => {},
  patientdata: {},
  setpatientdata: () => {},
  currpage: "",
  setcurrpage: () => {},
  appointmentstatus: "",
  setappointmentstatus: () => {},
  selectedPatient: "",
  setSelectedPatient: () => {},
});

const Provider = ({ children }) => {
  const [curruserdata, setcurruserdata] = useState({});
  const [doctordata, setdoctordata] = useState({});
  const [patientdata, setpatientdata] = useState({});
  const [appointmentstatus, setappointmentstatus] = useState("Scheduled");
  const [currpage, setcurrpage] = useState("home");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // 🟢 On page load, restore from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("curruserdata");
    if (savedUser) {
      setcurruserdata(JSON.parse(savedUser));
    }
  }, []);

  // 🔁 Save to localStorage whenever curruserdata changes
  useEffect(() => {
    if (curruserdata && Object.keys(curruserdata).length > 0) {
      localStorage.setItem("curruserdata", JSON.stringify(curruserdata));
    }
  }, [curruserdata]);

  return (
    <AppContext.Provider
      value={{
        curruserdata,
        setcurruserdata,
        doctordata,
        setdoctordata,
        patientdata,
        setpatientdata,
        currpage,
        setcurrpage,
        appointmentstatus,
        setappointmentstatus,
        selectedPatient,
        setSelectedPatient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
