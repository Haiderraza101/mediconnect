import welcomedoctor from "../images/welcomedoctor.jpg";
const WelcomeDoctor = () => {
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12 "
    >
      <img
        src={welcomedoctor}
        alt="Doctor Greeting"
        className="w-full md:w-1/2 rounded-lg shadow-md h-100"
      />
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold text-[#004D40] mb-4">
          Welcome, Doctor!
        </h1>
        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          Your Virtual Clinic is Ready
        </h2>
        <p className="text-gray-700">
          Manage your appointments, consult with patients, and provide quality
          care with <strong>MediConnect</strong>. Our platform is built to help
          you deliver treatment efficiently anytime, anywhere.
        </p>
      </div>
    </section>
  );
};

export default WelcomeDoctor;
