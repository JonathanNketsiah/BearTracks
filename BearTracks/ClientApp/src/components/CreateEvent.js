import React, { useState } from 'react';

const EventFormModal = ({ show, handleClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        address: '',
        description: '',
        image: '',
        eventURL: '',
        eventDateTime: '',
        eventPricing: '',
        eventPrivacy: '',
        eventType: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({
            name: '',
            location: '',
            address: '',
            description: '',
            image: '',
            eventURL: '',
            eventDateTime: '',
            eventPricing: '',
            eventPrivacy: '',
            eventType: '',
        });
        handleClose();
    };

    const modalStyle = {
        display: show ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        background: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        zIndex: '999',
    };

    const overlayStyle = {
        display: show ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for the desired level of transparency
        zIndex: '998', // Make sure the overlay appears behind the modal but above the rest of the content
    };

    const inputStyle = {
        marginBottom: '10px',
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        background: '#772ce8',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
    };

    const closeButtonStyle = {
        background: '#ccc',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div>
            <div style={overlayStyle}></div>
            <div style={modalStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
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
                        name="location"
                        value={formData.location}
                        placeholder="Location"
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        placeholder="Address"
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                    {/* Add other form fields similarly */}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
