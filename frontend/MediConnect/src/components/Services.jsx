import { useEffect, useRef } from "react";
import {
  FaEye,
  FaTeeth,
  FaHeartbeat,
  FaStethoscope,
  FaBrain,
  FaBone,
} from "react-icons/fa";
import "./services.css";

const Services = () => {
  const introRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            const animType = el.dataset.anim;
            if (animType === "moveright") {
              el.classList.add("animate-moveright");
            } else if (animType === "moveleft") {
              el.classList.add("animate-moveleft");
            } else if (animType === "moveup") {
              el.classList.add("animate-moveup");
            } else if (animType === "movedown") {
              el.classList.add("animate-movedown");
            }
          } else {
            el.classList.remove(
              "animate-moveright",
              "animate-moveleft",
              "animate-moveup",
              "animate-movedown"
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = introRef.current.querySelectorAll(".animated");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="services" ref={introRef}>
      <div className="bg-cyan-50 py-16 px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-800 mb-12">
          Best Medical and Healthcare Services for Your Family
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            className="animated rounded-xl p-6 bg-white transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            data-anim="moveright"
          >
            <FaEye size={40} className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Eye Care</h3>
            <p className="text-sm leading-relaxed text-gray-700 font-semibold">
              Precision and care for your vision. Our eye care services ensure a
              clear outlook on your well-being.
            </p>
            <div className="mt-4 text-sm font-semibold text-cyan-500 hover:underline flex items-center gap-1 cursor-pointer">
              Appointment <span>→</span>
            </div>
          </div>

          <div className="animated rounded-xl p-6 bg-cyan-900 text-white transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105">
            <FaStethoscope size={40} className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Medical Checkup</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Comprehensive health assessments tailored for you. Prioritize your
              well-being with our thorough medical checkup services.
            </p>
            <div className="mt-4 text-sm font-semibold text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer">
              Appointment <span>→</span>
            </div>
          </div>

          <div
            className="animated rounded-xl p-6 bg-white transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            data-anim="moveleft"
          >
            <FaTeeth size={40} className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Dental Care</h3>
            <p className="text-sm leading-relaxed text-gray-700 font-semibold">
              Smile with confidence. Our dental care services focus on your oral
              health for a brighter and healthier smile.
            </p>
            <div className="mt-4 text-sm font-semibold text-cyan-500 hover:underline flex items-center gap-1 cursor-pointer">
              Appointment <span>→</span>
            </div>
          </div>

          <div
            className="animated rounded-xl p-6 bg-white transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            data-anim="moveright"
          >
            <FaHeartbeat size={40} className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Cardiology</h3>
            <p className="text-sm leading-relaxed text-gray-700 font-semibold">
              Heart health at its best. Our cardiology services provide expert
              care to keep your heart in optimal condition.
            </p>
            <div className="mt-4 text-sm font-semibold text-cyan-500 hover:underline flex items-center gap-1 cursor-pointer">
              Appointment <span>→</span>
            </div>
          </div>

          <div
            className="animated rounded-xl p-6 bg-cyan-900 text-white transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            data-anim="movedown"
          >
            <FaBrain size={40} className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Neurology</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Advanced neurological care. Our experts treat disorders of the
              brain, spine, and nervous system with precision.
            </p>
            <div className="mt-4 text-sm font-semibold text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer">
              Appointment <span>→</span>
            </div>
          </div>

          <div
            className="animated rounded-xl p-6 bg-white transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            data-anim="moveleft"
          >
            <FaBone size={40} className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Orthopedic</h3>
            <p className="text-sm leading-relaxed text-gray-700 font-semibold">
              Restore movement and strength. Our orthopedic specialists handle
              joint, bone, and muscle conditions with care.
            </p>
            <div className="mt-4 text-sm font-semibold text-cyan-500 hover:underline flex items-center gap-1 cursor-pointer">
              Appointment <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
