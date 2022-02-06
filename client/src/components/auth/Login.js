import React, { useState, useEffect } from "react";
import md5 from "md5";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const userTDM = "TDM";
  const pwdTDMEncrypt = md5("TestTDM");

  const [values, setValues] = useState({
    username: "TDM",
    password: "TestTDM",
  });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userTDM == values.username && pwdTDMEncrypt == md5(values.password)) {
      localStorage.setItem("login", md5(values.password));
      navigate("/map");
    } else {
      alert("not ok");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={values.username}
            name="username"
            className="form-control"
            placeholder="Username"
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            value={values.password}
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>
        <button className="btn btn-success">Login</button>
      </form>
    </>
  );
};

export default Login;
