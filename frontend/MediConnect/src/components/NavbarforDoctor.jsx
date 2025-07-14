import { Facebook, Twitter, Youtube, Instagram, LogOut } from "lucide-react";

function Navbar({ menuOpen, setMenuOpen, setselected, setcurruser }) {
  function ScrollToSection(sectionId, closeMenu) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const position = section.offsetTop - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("loginInfo");
    setcurruser(null);
    setselected("login");
  }

  return (
    <>
      <div className="hidden lg:flex justify-center items-center gap-12 py-4 border-t">
        <a
          className="font-semibold tracking-wide cursor-pointer hover:text-cyan-400"
          onClick={() => ScrollToSection("home")}
        >
          Home
        </a>
        <a
          className="font-semibold tracking-wide cursor-pointer hover:text-cyan-400"
          onClick={() => ScrollToSection("aboutus")}
        >
          About Us
        </a>
        <a
          className="font-semibold tracking-wide cursor-pointer hover:text-cyan-400"
          onClick={() => ScrollToSection("services")}
        >
          Services
        </a>
        <a
          className="font-semibold tracking-wide cursor-pointer hover:text-cyan-400"
          onClick={() => ScrollToSection("appointment")}
        >
          Appointment
        </a>
        <a
          className="font-semibold tracking-wide cursor-pointer hover:text-cyan-400"
          onClick={() => ScrollToSection("myappointments")}
        >
          My Appointments
        </a>
        <a
          className="font-semibold tracking-wide cursor-pointer hover:text-cyan-400"
          onClick={() => ScrollToSection("contactus")}
        >
          Contact Us
        </a>
        <div className="flex gap-4 cursor-pointer">
          {[Facebook, Twitter, Youtube, Instagram].map((Icon, index) => (
            <div
              key={index}
              className="bg-cyan-400 rounded-full w-10 h-10 flex items-center justify-center text-white"
            >
              <Icon size={20} />
            </div>
          ))}
          <div
            onClick={handleLogout}
            className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-red-600"
            title="Logout"
          >
            <LogOut size={20} />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden flex flex-col items-start gap-4 bg-cyan-400 text-white p-4 cursor-pointer">
          <a
            className="text-lg font-semibold"
            onClick={() => ScrollToSection("home")}
          >
            Home
          </a>
          <a
            className="text-lg font-semibold"
            onClick={() => ScrollToSection("aboutus")}
          >
            About Us
          </a>
          <a
            className="text-lg font-semibold"
            onClick={() => ScrollToSection("services")}
          >
            Services
          </a>
          <a
            className="text-lg font-semibold"
            onClick={() => ScrollToSection("appointment")}
          >
            Appointment
          </a>
          <a
            className="text-lg font-semibold"
            onClick={() => ScrollToSection("myappointments")}
          >
            My Appointments
          </a>
          <a
            className="text-lg font-semibold"
            onClick={() => ScrollToSection("contactus")}
          >
            Contact Us
          </a>
          <div className="flex gap-3 mt-2 cursor-pointer">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, index) => (
              <div
                key={index}
                className="bg-white text-cyan-400 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <Icon size={20} />
              </div>
            ))}
            <div
              onClick={handleLogout}
              className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
              title="Logout"
            >
              <LogOut size={20} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
