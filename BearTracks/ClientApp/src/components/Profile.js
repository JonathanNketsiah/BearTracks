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
    const [accountPhoto, setAccountPhoto] = useState(""); // Updated to store the account photo

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const getUser = async () => {
            try {
                // Use the getCookie function to get the cookie value
                const userEmail = getCookie("email");
                const response = await fetch("account/retrieve", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body: userEmail,
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData);
                    setData(userData);
                    setAccountPhoto(userData.accountPhoto); // Set accountPhoto from the retrieved data
                    setFirstName(userData.user.firstName);
                    setLastName(userData.user.lastName);
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

    async function updateUser(_email, _userName, profilePic) {
        try {
            const response = await fetch("account/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: _email,
                    firstName: firstName,
                    lastName: lastName,
                    userName: _userName,
                    profilePic: profilePic,
                }),
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

            reader.onload = () => {
                const base64Data = reader.result;
                setAccountPhoto(base64Data); // Set accountPhoto with the selected image
                setImage(base64Data); // Set the image state with the selected image
            };

            reader.readAsDataURL(file);

            reader.onerror = (error) => {
                console.log("Error: ", error);
            };
        }
    };

    const handleClick = () => {
        imageRef.current.click();
    };

    const handleSaveClick = () => {
        const button = document.getElementById("saveButton");

        try {
            button.classList.add("pressedButton");

            setTimeout(() => {
                button.classList.remove("pressedButton");
            }, 300);
        } catch { }

        const emailValue = document.getElementById("email").innerText.toLowerCase;
        const userNameValue = document.getElementById("userName").innerText;

        if (emailValue && userNameValue) {
            updateUser(
                emailValue,
                userNameValue,
                accountPhoto // Use the selected image from the file input
            );
        }
    };

    return (
        <div style={{ marginTop: "60px" }}>
            <h2 className="profileTitle">My Account</h2>
            <div className="profilePic">
                {image || accountPhoto ? ( // Display the accountPhoto if available
                    <Avatar onClick={handleClick} sx={{ width: 128, height: 128 }} src={image || accountPhoto} />
                ) : (
                    <Avatar onClick={handleClick} sx={{ width: 128, height: 128 }} src={defaultAvatar} />
                )}
            </div>
            <div className="profilePic">
                <input
                    type="file"
                    ref={imageRef}
                    accept="image/*"
                    onChange={handleBase64}
                    style={{ display: "none" }}
                />
                <button onClick={handleClick} className="buttonDefaultStyle2">Set Profile Photo</button>
            </div>
            <br></br>

            <div className="profileContainer">
                <div className="nameField">
                    <p className="label">Name:</p>
                    <p className="value" id="userName">
                        {loading
                            ? "Loading data..."
                            : data
                                ? `${data.user.firstName} ${data.user.lastName}`
                                : "No data available"}
                    </p>
                </div>

                <div className="nameField">
                    <p className="label">Email:</p>
                    <p className="value" id="email">
                        {loading
                            ? "Loading data..."
                            : data
                                ? data.user.email
                                : "No data available"}
                    </p>
                </div>

                <div className="nameField">
                    <p className="label">User Name:</p>
                    <p className="value" id="userName">
                        {loading
                            ? "Loading data..."
                            : data
                                ? data.user.userName
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
