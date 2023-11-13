import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import BearLogo from "./Assets/BearLogo.png";
import "./LoginFront.css";

const Reset = () => {
  const _txtField01 = useRef(null);
  const _txtField02 = useRef(null);
  let txtFieldPlcHolder01 = "email";
  let txtFieldPlcHolder02 = "user name";
  let initialScreen = true;

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    if (initialScreen) {
      const _email = _txtField01.current.value;
      const _userNm = _txtField02.current.value;
      try {
        const response = await fetch("account/reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: _email,
            userName: _userNm,
          }),
        });
        // Check if aacount creation was successful, then redirect if not
        if (response.ok) {
          //window.location.href = '/LandingPage'; // replace with your actual landing page URL
        } else {
          console.error("Login Failed");
          // Handle your error here
        }
      } catch (error) {
        console.error(error);
        // Handle your error here
      }
    }
  };

  return (
    <div className="container">
      <div className="img">
        <div className="container-img">
          <img src={BearLogo} alt="BearLogo" className="BearLogo" />
        </div>
      </div>
      <h1> BEARTRACKS </h1>
      <h2 className="my-text">Reset Password</h2>

      <form className="input-wrapper" onSubmit={handlePasswordReset}>
        <label className="my-text">Enter Email</label>
        <input
          type="text"
          ref={_txtField01}
          placeholder={txtFieldPlcHolder01}
        />
        <label className="my-text">Enter User Name</label>
        <input
          type="text"
          ref={_txtField02}
          placeholder={txtFieldPlcHolder02}
        />
        <button
          onClick={() => {
            if (initialScreen) {
              initialScreen = false;
            } else {
              initialScreen = true;
            }
          }}
        >
          Reset
        </button>
      </form>

      <div className="links-wrap">
        <NavLink to={"/signUp"} className="navcolor">
          Create an account
        </NavLink>
        <NavLink to={"/"} className="navcolor">
          Or already have an account? Login
        </NavLink>
      </div>
    </div>
  );
};

export default Reset;
