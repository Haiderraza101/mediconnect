import loginphoto from "../images/loginphoto.jpg";
import backgroundPhoto from "../images/backgroundPhoto.jpg";
import { AppContext } from "../store";
import { useRef, useContext } from "react";

const API = import.meta.env.VITE_REACT_APP_API_URL;
console.log("API Base URL:", API);

function LoginPage({ setselected, setsignup, curruser, setcurruser }) {
  const userName = useRef();
  const password = useRef();
  const { setcurruserdata, setdoctordata, setpatientdata } =
    useContext(AppContext);

  async function Submit(event) {
    event.preventDefault();

    const Username = userName.current.value;
    const Password = password.current.value;

    try {
      const userRes = await fetch(`${API}/users/name/${Username}`);
      if (!userRes.ok) {
        alert("Username does not exist");
        return;
      }

      const { username, passwordhash, userid, role } = await userRes.json();

      if (Username !== username || Password !== passwordhash) {
        alert("Incorrect username or password");
        return;
      }

      sessionStorage.setItem("loginInfo", JSON.stringify({ userid, role }));
      let userdata = {};

      if (role === "Patient") {
        const res = await fetch(`${API}/patients/user/${userid}`);
        userdata = await res.json();
        setcurruser("Patient");
      } else if (role === "Doctor") {
        const res = await fetch(`${API}/doctors/user/${userid}`);
        userdata = await res.json();
        setcurruser("Doctor");
      }

      setcurruserdata(userdata);

      const patientRes = await fetch(`${API}/patients`);
      if (patientRes.ok) {
        const patientData = await patientRes.json();
        setpatientdata(patientData);
      }

      const doctorRes = await fetch(`${API}/doctors`);
      if (doctorRes.ok) {
        const doctorData = await doctorRes.json();
        setdoctordata(doctorData);
      }

      setselected("logged");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login error occurred. Try again.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-opacity-30"></div>
      <form
        onSubmit={Submit}
        className="relative z-10 mx-4 sm:max-w-xl overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl lg:w-3xl h-auto p-4 sm:p-0"
      >
        <div className="sm:flex">
          <div className="hidden sm:block md:shrink-0 bg-blue-100 h-auto">
            <img
              className="h-40 w-40 sm:w-full md:w-48 sm:object-cover md:h-full sm:h-full"
              src={loginphoto}
              alt="Login"
            />
          </div>
          <div className="sm:p-8 w-full">
            <div className="text-2xl sm:text-3xl tracking-wide text-cyan-500 font-bold mt-2 sm:mt-0">
              MediConnect
            </div>
            <input
              ref={userName}
              type="text"
              placeholder="Username"
              className="mt-4 sm:mt-8 rounded-4xl p-2 border border-cyan-500 w-full focus:outline-none focus:border-orange-500"
              required
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="mt-8 rounded-4xl p-2 border border-cyan-400 w-full focus:outline-none focus:border-orange-500"
              required
            />
            <button
              type="submit"
              className="p-3 mt-8 bg-cyan-500 rounded-2xl w-full text-white font-bold hover:bg-cyan-600 transition"
            >
              Login
            </button>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="text-cyan-700 underline hover:text-cyan-900 transition"
                onClick={() => setselected("signup")}
              >
                Don’t have an account? Create a new one
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
