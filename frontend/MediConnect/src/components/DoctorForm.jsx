import { useRef, useState } from "react";
import doctorphoto from "../images/doctor.jpg";

const API = import.meta.env.VITE_REACT_APP_API_URL;

const DoctorForm = () => {
  const userName = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const contact = useRef();
  const gender = useRef();
  const age = useRef();
  const qualification = useRef();
  const specialization = useRef();
  const previousExperience = useRef();
  const availaibility = useRef();

  const [showSuccess, setShowSuccess] = useState(false);

  async function Submit(event) {
    event.preventDefault();
    const Username = userName.current.value;
    const Password = password.current.value;
    const Confirmpassword = confirmPassword.current.value;
    const Firstname = firstname.current.value;
    const Lastname = lastname.current.value;
    const Email = email.current.value;
    const Contact = contact.current.value;
    const Gender = gender.current.value;
    const Age = age.current.value;
    const Qualification = qualification.current.value;
    const Specialization = specialization.current.value;
    const Previousexperience = previousExperience.current.value;
    const Avaialability = availaibility.current.value;

    let userid = null;

    try {
      if (Password !== Confirmpassword) {
        alert("Confirm Password does not match the Password");
        return;
      }

      // Create User
      const userresponse = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Username,
          passwordhash: Password,
          role: "Doctor",
        }),
      });

      if (!userresponse.ok) {
        const errortext = await userresponse.text();
        console.error("User creation failed ", userresponse.status, errortext);
        alert("Username already exists");
        return;
      }

      // Get User Data
      const userData = await fetch(`${API}/users/name/${Username}`);
      if (!userData.ok) {
        console.log("Failed to load user data");
        return;
      }

      const userJson = await userData.json();
      userid = userJson.userid;

      // Create Doctor
      const doctorresponse = await fetch(`${API}/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userid,
          firstname: Firstname,
          lastname: Lastname,
          specialization: Specialization,
          contactnumber: Contact,
          email: Email,
          availaibility: Avaialability,
          age: parseInt(Age),
          qualification: Qualification,
          previousexperience: Previousexperience,
          gender: Gender,
        }),
      });

      if (!doctorresponse.ok) {
        // Rollback user creation if doctor creation fails.
        await fetch(`${API}/users/${userid}`, {
          method: "DELETE",
        });
        alert("Some doctor details already exist");
        return;
      }

      // Reset form values
      [
        userName,
        password,
        confirmPassword,
        firstname,
        lastname,
        email,
        contact,
        gender,
        age,
        qualification,
        specialization,
        previousExperience,
        availaibility,
      ].forEach((ref) => (ref.current.value = ""));

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    } catch (err) {
      console.log(err);
      if (userid) {
        await fetch(`${API}/users/${userid}`, {
          method: "DELETE",
        });
      }
      alert("Error during registration");
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {showSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white border-1 border-cyan-800 rounded-xl p-6 flex flex-col items-center shadow-lg animate-fade-in">
            <svg
              className="w-16 h-16 text-green-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-xl font-semibold text-green-600">
              Registration Successful
            </p>
          </div>
        </div>
      )}

      <div className="md:w-1/2 hidden md:block">
        <img
          src={doctorphoto}
          alt="Doctor SignUp"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <form
          onSubmit={Submit}
          className="bg-white border-2 border-cyan-800 p-8 rounded-2xl w-full max-w-lg shadow-xl"
        >
          <h2 className="text-3xl font-bold text-cyan-600 mb-6 text-center">
            Doctor SignUp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              ref={userName}
              type="text"
              required
              placeholder="Username"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={password}
              type="password"
              required
              placeholder="Password"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={confirmPassword}
              type="password"
              required
              placeholder="Confirm Password"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={firstname}
              type="text"
              required
              placeholder="First Name"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={lastname}
              type="text"
              required
              placeholder="Last Name"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={email}
              type="email"
              required
              placeholder="Email"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={contact}
              type="text"
              required
              placeholder="Contact Number"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <select
              ref={gender}
              required
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              ref={age}
              type="number"
              required
              placeholder="Age"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={qualification}
              type="text"
              required
              placeholder="Qualification"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <select
              ref={specialization}
              required
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
              name="specialization"
            >
              <option value="">Select Specialization</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroentrologist">Gastroentrologist</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pulmonologist">Pulmonologist</option>
              <option value="Eye Specialist">Eye Specialist</option>
              <option value="ENT Specialist">ENT Specialist</option>
              <option value="Psychiatrist">Psychiatrist</option>
            </select>
            <input
              ref={previousExperience}
              type="text"
              required
              placeholder="Previous Experience"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
            <input
              ref={availaibility}
              type="text"
              required
              placeholder="Availability Slots"
              className="p-3 border rounded-lg w-full focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-cyan-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-cyan-800 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
