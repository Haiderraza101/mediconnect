import mediconnectLogo from "../images/mediconnectlogo.png";

const ContactUs = () => {
  return (
    <section id="contactus">
      <div className="bg-white min-h-screen w-full py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <img
              src={mediconnectLogo}
              alt="MediConnect Logo"
              className="h-16 w-auto mb-4"
            />
            <h1 className="text-4xl sm:text-5xl font-bold text-cyan-900 text-center">
              Contact Us
            </h1>
            <p className="text-cyan-800 mt-3 text-center max-w-2xl text-lg">
              We're here to help. Reach out for any support, queries, or
              appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="bg-cyan-50 p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold text-cyan-800 mb-4">
                Head Office
              </h2>
              <p className="text-gray-700 mb-1">MediConnect Pvt. Ltd.</p>
              <p className="text-gray-600 mb-1">123 Health Avenue</p>
              <p className="text-gray-600 mb-1">Lahore, Punjab, Pakistan</p>
              <p className="text-gray-600">Postal Code: 54000</p>
            </div>

            <div className="bg-cyan-50 p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold text-cyan-800 mb-4">
                Contact Details
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Phone:</span> +92-336-7407516
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Email:</span>{" "}
                contact@mediconnect.com
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Support:</span>{" "}
                support@mediconnect.com
              </p>
            </div>
          </div>

          <div className="bg-cyan-50 p-10 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-cyan-800 mb-6 text-center">
              Send Us a Message
            </h2>
            <form
              action="https://formspree.io/f/manjpnln"
              method="POST"
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
                className="p-4 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="p-4 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                className="col-span-1 sm:col-span-2 p-4 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                required
                className="col-span-1 sm:col-span-2 p-4 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
              <button
                type="submit"
                className="col-span-1 sm:col-span-2 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-xl transition shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="text-center text-sm text-gray-600 mt-12 border-t pt-6">
            <p>© 2025 MediConnect. All rights reserved. Developed by Haider</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
