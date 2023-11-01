import "./NavBarStyle.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";

function Navbar() {
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/");
  };

  return (
    <>
      <nav>
        <NavLink to="/Home" className="title">
          {" "}
          <HomeIcon fontSize="large" /> BearTracks
        </NavLink>

        <div>
          <ul id="navbar">
            <li>
              <NavLink to="/Social" className="link">
                {" "}
                <Diversity1Icon fontSize="large" /> Social
              </NavLink>
            </li>
            <li>
              <NavLink to="/Profile" className="link">
                {" "}
                <AccountCircleIcon fontSize="large" /> Account
              </NavLink>
            </li>
            <li>
              <NavLink to="/About" className="link">
                <InfoIcon fontSize="large" /> About us
              </NavLink>
            </li>
            <button className="logOutbutton" onClick={LogOut}>
              LogOut{" "}
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
