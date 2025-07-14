import doctor from "../images/doctorforAboutUs.jpg";

const AboutUs = () => {
  return (
    <section id="aboutus">
      <div className="grid md:grid-cols-2 gap-10 items-center ">
        <div className="flex justify-center">
          <img
            src={doctor}
            alt="Doctor meeting with patient"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
        <div className="space-y-6 ml-7 md:ml-0 py-10 ">
          <h1 className="text-4xl font-bold text-teal-900">About Us</h1>
          <h1 className="text-4xl font-bold text-teal-900">
            Best Digital Healthcare Solution
          </h1>
          <h2
            className="text-2xl font-semibold
          text-teal-700"
          >
            Book Appointments Easily, Connect with Doctors Instantly
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Your health matters. At{" "}
            <span className="font-semibold text-teal-800 ">MediConnect</span>,
            we bring care closer to you{" "}
            <span className="font-medium">fast</span>,{" "}
            <span className="font-medium">reliable</span>, and always there when
            you need it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
