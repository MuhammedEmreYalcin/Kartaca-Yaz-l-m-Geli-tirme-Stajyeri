import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const { registerUser, wait } = useContext(UserContext);
  const [message, setMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [fData, setFData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setFData({
      ...fData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(fData).every((val) => val.trim() !== "")) {
      setSuccessMessage(false);
      setMessage("You have empty Fields");
      return;
    }

    const data = await registerUser(fData);
    if (data.success) {
      e.target.reset();
      setSuccessMessage("Successfully registered.");
      setMessage(false);
    } else if (!data.success && data.message) {
      setSuccessMessage(false);
      setMessage(data.message);
    }
  };

  return (
    <div className="loginForm">
      <h2>Sign Up</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={onChangeInput}
          value={fData.name}
          placeholder="Please Enter your Name"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={onChangeInput}
          value={fData.email}
          placeholder="Please Enter your E-Mail"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChangeInput}
          value={fData.password}
          placeholder="Please Enter a password"
          required
        />
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
        {message && <div className="massage">{message}</div>}
        <button type="submit" disabled={wait}>
          Sign Up
        </button>
        <div className="bottom-link">
          <Link to="/login">Already have an account? Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
