import { useContext, useEffect } from "react";
import { AppContext } from "../store";
import Header from "./Header";
import Navbar from "./Navbar";
import doctor from "../images/doctorforHome.jpeg";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Appointments from "./Appointments";
import ContactUs from "./ContactUs";

const Home = ({
  currpage,
  setcurrpage,
  menuOpen,
  setMenuOpen,
  curruser,
  setselected,
  setcurruser,
}) => {
  const { curruserdata } = useContext(AppContext);

  useEffect(() => {
    console.log("🏠 Home loaded. curruser:", curruser);
    console.log("👤 User data:", curruserdata);
  }, [curruser, curruserdata]);

  function ScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const position = section.offsetTop - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  }

  return (
    <section id="home">
      {curruser === "Patient" && (
        <>
          <Header
            currpage={currpage}
            setcurrpage={setcurrpage}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <Navbar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setselected={setselected}
            setcurruser={setcurruser}
          />
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-16 bg-teal-50">
            <div className="text-center lg:text-left lg:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-teal-800 leading-tight">
                Connecting Patients with Trusted Doctors
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">
                Book Appointments Anytime, Anywhere with{" "}
                <span className="text-teal-700 font-semibold">MediConnect</span>
                .
              </p>
              <button
                className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-2xl shadow-md hover:bg-teal-700 transition"
                onClick={() => ScrollToSection("appointment")}
              >
                Get Started
              </button>
            </div>
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img
                src={doctor}
                alt="Healthcare illustration"
                className="w-full rounded-2xl shadow-lg mx-auto"
              />
            </div>
          </div>
          <AboutUs />
          <Services />
          <Appointments />
          <ContactUs />
        </>
      )}
    </section>
  );
};

export default Home;
