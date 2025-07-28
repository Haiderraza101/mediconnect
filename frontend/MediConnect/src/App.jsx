import "./App.css";
import { useEffect, useState, useContext } from "react";
import Provider, { AppContext } from "./store";

import LoginPage from "./components/LoginPage";
import SignUpRole from "./components/SignUpRole";
import PatientForm from "./components/PatientForm";
import DoctorForm from "./components/DoctorForm";
import Home from "./components/Home";
import DoctorHome from "./components/DoctorHome";

const API = import.meta.env.VITE_REACT_APP_API_URL;

function AppWrapper() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

function App() {
  const [selected, setselected] = useState("login");
  const [signup, setsignup] = useState("roleselect");
  const [curruser, setcurruser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    currpage,
    setcurrpage,
    setcurruserdata,
    setdoctordata,
    setpatientdata,
  } = useContext(AppContext);

  useEffect(() => {
    const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    if (loginInfo && loginInfo.userid && loginInfo.role) {
      const { userid, role } = loginInfo;
      const loadUser = async () => {
        try {
          if (role === "Patient") {
            const res = await fetch(`${API}/patients/user/${userid}`);
            const data = await res.json();
            if (!data || !data.firstname) throw new Error("Invalid patient");
            setcurruserdata(data);
            setcurruser("Patient");
          } else if (role === "Doctor") {
            const res = await fetch(`${API}/doctors/user/${userid}`);
            const data = await res.json();
            if (!data || !data.firstname) throw new Error("Invalid doctor");
            setcurruserdata(data);
            setcurruser("Doctor");
          }

          const patientRes = await fetch(`${API}/patients`);
          const doctorRes = await fetch(`${API}/doctors`);

          if (patientRes.ok) setpatientdata(await patientRes.json());
          if (doctorRes.ok) setdoctordata(await doctorRes.json());

          setselected("logged");
        } catch (err) {
          console.error(" Error loading user:", err);
          sessionStorage.removeItem("loginInfo");
          setselected("login");
        } finally {
          setLoading(false);
        }
      };
      loadUser();
    } else {
      setselected("login");
      setLoading(false);
    }
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-cyan-500">Loading...</div>;

  return (
    <>
      {selected === "login" && (
        <LoginPage
          setselected={setselected}
          setsignup={setsignup}
          curruser={curruser}
          setcurruser={setcurruser}
        />
      )}

      {selected === "signup" && signup === "roleselect" && (
        <SignUpRole setsignup={setsignup} />
      )}

      {selected === "signup" && signup === "patient" && <PatientForm />}
      {selected === "signup" && signup === "doctor" && <DoctorForm />}

      {selected === "logged" && curruser === "Patient" && (
        <Home
          currpage={currpage}
          setcurrpage={setcurrpage}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          curruser={curruser}
          setselected={setselected}
          setcurruser={setcurruser}
        />
      )}

      {selected === "logged" && curruser === "Doctor" && (
        <DoctorHome
          currpage={currpage}
          setcurrpage={setcurrpage}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          curruser={curruser}
          setselected={setselected}
          setcurruser={setcurruser}
        />
      )}
    </>
  );
}

export default AppWrapper;
