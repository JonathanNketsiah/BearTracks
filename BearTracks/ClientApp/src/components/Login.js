import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./LoginFront.css";
import BearLogo from "./Assets/BearLogo.png";

//import { hashedPassword } from './SignUp.js'

const Login = () => {
  const _emailScn2 = useRef();
  const _passwordScn2 = useRef();
  // eslint-disable-next-line
  const emailValidator =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // eslint-disable-next-line
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const handleIn = async (event) => {
    event.preventDefault();
    const _email = _emailScn2.current.value;
    const _password = _passwordScn2.current.value;

    // const getHashedpassword = hashedPassword;

    try {
      const response = await fetch("account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: _email,
          password: _password,
        }),
      });

      // Check if login was successful, then redirect
      if (response.ok) {
        window.location.href = "/Home"; // replace with your actual landing page URL
      } else {
        console.error("Login Failed");
        // Handle your error here
      }
    } catch (error) {
      console.error(error);
      // Handle your error here
    }

    //  console.log(getHashedpassword)
  };

  const emailRegex = () => {
    const email = _emailScn2.current.value;
    if (email === "") {
      alert("Please enter an email");
    } else if (!emailValidator.test(email)) {
      alert("invalid password");
    }

    // else {
    //     alert('valid')
    // }
  };

  const passwordRegex = () => {
    const password = _passwordScn2.current.value;

    if (password === "") {
      alert("Password is required");
    } else if (!passwordValidator.test(password)) {
      alert("invalid password");
    }

    // else {
    //     alert('valid')
    // }
  };

  return (
    <>
      <div className="container">
        <div className="img">
          <div className="container-img">
            <img src={BearLogo} alt="BearLogo" className="BearLogo" />
          </div>
        </div>
        <h1> BEARTRACKS </h1>
        <h2 className="my-text">Login</h2>
        <form className="input-wrapper" onSubmit={handleIn}>
          <label className="my-text">Enter Email</label>
          <input type="text" ref={_emailScn2} placeholder="email" />
          <label className="my-text">Enter Password</label>
          <input
            type="password"
            ref={_passwordScn2}
            placeholder="password"
            autoComplete="off"
          />
          <button
            onClick={() => {
              emailRegex();
              passwordRegex();
            }}
          >
            Login
          </button>
        </form>
        <div className="links-wrap">
          <NavLink to={"/signUp"} className="navcolor">
            Create an account
          </NavLink>
          <NavLink to={"/Reset"} className="navcolor">
            Forgot your password?
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Login;
