import patient from "../images/patient.jpg";
import doctor from "../images/doctor.jpg";
import backgroundPhoto from "../images/backgroundPhoto.jpg";
const SignUpRole = ({ setsignup }) => {
  const Submit = (event) => {
    console.log("Prevent Default");
    event.preventDefault();
  };
  return (
    <form action="" onSubmit={Submit}>
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${backgroundPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="min-h-screen flex justify-center items-center ">
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-xl overflow-hidden w-64 md:h-100 md:w-80">
              <img
                src={patient}
                alt="patient photo"
                className="w-full h-full object-cover"
              />
              <button
                type="submit"
                className="bg-cyan-500 w-full text-white font-semibold p-3 hover:bg-cyan-800 transition duration-300"
                onClick={() => {
                  setsignup("patient");
                }}
              >
                Register as Patient
              </button>
            </div>

            <div
              className="flex flex-col items-center bg-white shadow-lg rounded-xl overflow-hidden w-64
            md:h-100 md:w-80"
            >
              <img
                src={doctor}
                alt="doctor photo"
                className="w-full h-full object-cover"
              />
              <button
                type="submit"
                className="bg-cyan-500 w-full text-white font-semibold p-3 hover:bg-cyan-800 transition duration-300"
                onClick={() => {
                  setsignup("doctor");
                }}
              >
                Register as Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpRole;
