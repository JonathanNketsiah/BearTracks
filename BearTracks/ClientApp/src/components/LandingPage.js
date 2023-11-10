import React from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/");
  };
  const LoadMap = () => {
    navigate("/MapPage");
  };

  const Procede = () => {
    navigate("/navbar");
  };

  return (
    <>
      <h1>Welcome to BearTracks</h1>
      <button onClick={Procede}>Procede </button>
      <button onClick={LogOut}>LogOut </button>
      <button onClick={LoadMap}>Map Page </button>
    </>
  );
};

export default LandingPage;
