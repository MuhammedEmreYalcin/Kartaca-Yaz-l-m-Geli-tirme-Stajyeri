import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { loginUser, wait, loggedInCheck } = useContext(UserContext);
  const [message, setMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [fData, setFData] = useState
  ({
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(fData).every((val) => val.trim() !== "")) 
    {
      message("You have empty Fields");
      return;
    }

    const data = await loginUser(fData);
    if (data.success) 
    {
      e.target.reset();
      setRedirect("Redirecting");
      await loggedInCheck();
      return;
    }
    setMessage(data.message);
  };

  const onChangeInput = (e) => {
    setFData
    ({
      ...fData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginForm">
      <h2>Login</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="email">E-mail:</label>
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
          placeholder="Please Enter your password"
          required
        />
        {message && <div className="massage">{message}</div>}
        {redirect ? (
          redirect
        ) : (
          <button type="submit" disabled={wait}>
            Login
          </button>
        )}
        <div className="bottom-link">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
