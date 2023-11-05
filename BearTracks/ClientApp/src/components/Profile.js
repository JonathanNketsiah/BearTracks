import React, { useRef, useState, useEffect } from "react";
import "./LoginFront.css";
import Avatar from "@mui/material/Avatar";
import defaultAvatar from "./Assets/defaultAvatar.png";
import getCookie from "./CookieUtility"; // Import the getCookie function

function Profile() {
  const imageRef = useRef(null);
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Use the getCookie function to get the cookie value
        const em2 = getCookie('email');
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

  const handleBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <div className="primaryCont">
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
        <button className="editPicbtn">Update Profile Pic</button>
      </div>

      <div className="profileContainer">
        <div className="cards">
          <p>
            {loading
              ? "Loading data..."
              : data !== null 
              ? data.firstName + ' ' + data.lastName
              : "No data available"}
          </p>
        </div>

        <div className="cards">
          <p>
            {loading
              ? "Loading data..."
              : data !== null 
              ? data.email
              : "No data available"}
          </p>
        </div>

        <div className="cards">
          <p>
            {loading
              ? "Loading data..."
              : data !== null 
              ? data.userName
              : "No data available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
