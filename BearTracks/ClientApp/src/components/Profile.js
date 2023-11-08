import React, { useRef, useState, useEffect } from "react";
import "./css/LoginFront.css";
import "./css/Profile.css";
import Avatar from "@mui/material/Avatar";
import defaultAvatar from "./Assets/defaultAvatar.png";
import getCookie from "./CookieUtility"; // Import the getCookie function


function Profile() {
  const imageRef = useRef(null);
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file
  let _profilePic = null;

  
  useEffect(() => {
    const getUser = async () => {
      try {
        // Use the getCookie function to get the cookie value
        const em2 = getCookie("email");
        const response = await fetch("account/retrieve", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: em2,
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setData(userData);
          setLoading(false);
        } else {
          console.error("Account retrieval failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleSaveClick = () => {
    const button = document.getElementById("saveButton");

    try {
      button.classList.add("pressedButton");

      setTimeout(() => {
        button.classList.remove("pressedButton");
      }, 300); // Adjust the duration as needed for the animation
    } catch {}

    const firstNameValue = document.getElementById("firstName").innerText;
    const lastNameValue = document.getElementById("lastName").innerText;
    const emailValue = document.getElementById("email").innerText;
    const userNameValue = document.getElementById("userName").innerText;

    if (firstNameValue && lastNameValue && emailValue && userNameValue) {
      updateUser(firstNameValue, lastNameValue, emailValue, userNameValue);
    }
  };

  async function updateUser(_firstName, _lastName, _userName, _email) {
    try {
      const formData = new FormData();
      formData.append("firstName", _firstName);
      formData.append("lastName", _lastName);
      formData.append("userName", _userName);
      formData.append("email", _email);
      if (selectedFile) {
        formData.append("profilePic", selectedFile); // Add the selected file to the form data
      }

      const response = await fetch("account/update", {
        method: "POST",
        body: formData, // Send the form data
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        setSelectedFile(file); // Store the selected file
      };

      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  return (
    <div>
      <h2 className="profileTitle">My Account</h2>
      <div className="profilePic">
        {image ? (
          <Avatar sx={{ width: 96, height: 96 }} src={image} />
        ) : (
          <Avatar sx={{ width: 96, height: 96 }} src={defaultAvatar} />
        )}
      </div>
      <div onClick={handleClick} className="profilePic">
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          onChange={handleBase64}
          style={{ display: "none" }}
        />
        <button className="buttonDefaultStyle2">Set Profile Photo</button>
      </div>
      <br></br>
      <div className="profileContainer">
        <div className="cards">
          <p id="firstName">
            {loading
              ? "Loading data..."
              : data
              ? data.firstName
              : "No data available"}
          </p>
        </div>

        <div className="cards">
          <p id="lastName">
            {loading
              ? "Loading data..."
              : data
              ? data.lastName
              : "No data available"}
          </p>
        </div>

        <div className="cards">
          <p id="email">
            {loading
              ? "Loading data..."
              : data
              ? data.email
              : "No data available"}
          </p>
        </div>

        <div className="cards">
          <p id="userName">
            {loading
              ? "Loading data..."
              : data
              ? data.userName
              : "No data available"}
          </p>
        </div>
        <button className="buttonDefaultStyle" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;
