import React, { useEffect } from "react";
import HeaderforDoctor from "./HeaderforDoctor";
import NavbarforDoctor from "./NavbarforDoctor";
import AboutUsDoctor from "./AboutUsDoctor";
import ContactUs from "./ContactUs";
import DoctorDashboard from "./DoctorDashboard";
import WelcomeDoctor from "./WelcomeDoctor";
import PatientQueue from "./PatientQueue";
import ConsultationPanel from "./ConsultationPanel";

const DoctorHome = ({
  currpage,
  setcurrpage,
  menuOpen,
  setMenuOpen,
  curruser,
  setselected,
  setcurruser,
}) => {
  useEffect(() => {
    console.log("👨‍⚕️ DoctorHome loaded | curruser:", curruser);
  }, [curruser]);

  function handleLogout() {
    localStorage.removeItem("loginInfo");
    setcurruser(null);
    setselected("login");
  }

  return (
    <div>
      {curruser === "Doctor" && (
        <>
          <HeaderforDoctor
            currpage={currpage}
            setcurrpage={setcurrpage}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <NavbarforDoctor
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setselected={setselected}
            setcurruser={setcurruser}
          />
          <div className="min-h-screen bg-white p-4 md:p-10 font-sans text-gray-800">
            <WelcomeDoctor />
            <AboutUsDoctor />
            <DoctorDashboard />
            <PatientQueue />
            <ConsultationPanel />
            <ContactUs />
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorHome;
