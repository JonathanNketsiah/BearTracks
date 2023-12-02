import React, { useState } from "react";

const EventFormModal = ({ show, handleClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    description: "",
    image: "",
    eventURL: "",
    eventDateTime: "",
    eventPricing: "",
    eventPrivacy: "",
    eventType: "",
  });
  const [returnedLocation, setReturnedLocation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const location = await getCoords(formData.address);
      if (location) {
        createEvent(formData, location);
        setFormData({
          name: "",
          location: "",
          address: "",
          description: "",
          image: "",
          eventURL: "",
          eventDateTime: "",
          eventPricing: "",
          eventPrivacy: "",
          eventType: "",
        });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function createEvent(formData, location) {
    var x = location.lat;
    var y = location.lng;

    try {
      const response = await fetch("event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.address,
          latitude: x,
          longitude: y,
          description: formData.description,
          // image: formData.image,
          // eventUrl: formData.eventUrl,
          // eventDateTime: formData.eventDateTime,
          // eventPricing: formData.eventPricing,
          // eventPrivacy: formData.eventPrivacy,
          // eventType: formData.eventType
        }),
      });

      if (response.ok) {
        console.log("Event Created Successfully");
      } else {
        console.error("Event Creation Failed.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getCoords = async (address) => {
    const apiKey = "AIzaSyDyu1Rvu4vbvohcfXexBH1i9fVPcsA8-yA";
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
  
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
  
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].geometry.location;
      } else {
        alert("Address not found. Please enter a valid address.");
        return null;
      }
    } catch (error) {
      console.error("Error", error);
      alert("There was an error while fetching data. Please try again.");
      return null;
    }
  };

  //Css Styling
  const modalStyle = {
    display: show ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    background: "#fff",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
    zIndex: "999",
  };

  const overlayStyle = {
    display: show ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for the desired level of transparency
    zIndex: "998", // Make sure the overlay appears behind the modal but above the rest of the content
  };

  const inputStyle = {
    marginBottom: "10px",
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    background: "#772ce8",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const closeButtonStyle = {
    background: "#ccc",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div>
      <div style={overlayStyle}></div>
      <div style={modalStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h2>Create Event</h2>
          <button type="button" onClick={handleClose} style={closeButtonStyle}>
            Close
          </button>
        </div>
        <form>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Event Name"
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="Event Description"
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Event Address"
            onChange={handleInputChange}
            style={inputStyle}
          />
          {/* Add other form fields similarly */}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" onClick={handleSave} style={buttonStyle}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
