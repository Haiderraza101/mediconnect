import mediconnectlogo from "../images/mediconnectlogo.png";
import maillogo from "../images/maillogo.png";
import calllogo from "../images/calllogo.png";
import { Menu, X } from "lucide-react";
const Header = ({ currpage, setcurrpage, menuOpen, setMenuOpen }) => {
  function ScrollToSection(sectionId, closeMenu) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const position = section.offsetTop - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  }
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center p-4 sm:p-6 lg:px-10 sm:mr-0 mr-10">
          <img
            src={mediconnectlogo}
            alt="MediConnect Logo"
            className="h-24 w-auto sm:h-20 sm:w-60 md:h-30 md:w-70 lg:w-100 lg:h-30"
          />

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-2">
              <img src={maillogo} alt="Mail Logo" className="h-10" />
              <div>
                <div className="font-bold text-xl">Mail Us</div>
                <a
                  href="mailto:support@mediconnect.com"
                  className="text-sm cursor-pointer underline"
                >
                  support@mediconnect.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={calllogo} alt="Call Logo" className="h-10" />
              <div>
                <div className="font-bold text-xl">Call Us</div>
                <a href="tel:03367407516" className="text-sm cursor-pointer">
                  03367407516
                </a>
              </div>
            </div>
            <button
              className="bg-cyan-400 text-white px-6 py-3 rounded-full cursor-pointer"
              onClick={() => {
                ScrollToSection("doctordashboard");
              }}
            >
              Go To Dashboard
            </button>
          </div>

          <button
            className="lg:hidden text-cyan-400 mr-10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
