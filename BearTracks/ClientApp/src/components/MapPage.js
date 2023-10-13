
import React, { useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';


const center = {
    lat: 0,
    lng: 0,
};

function MapPage() {
    const [address, setAddress] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const handleGeolocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    const containerStyle = {
        width: '100%',
        paddingBottom: '56.25%', // 16:9 aspect ratio
    };

    const pageStyle = {
        display: 'flex',
        flexDirection: 'row',
    };

    const listStyle = {
        width: '25%',
    };

    const mapStyle = {
        width: '75%',
    };

    return (
        <div style={pageStyle}>
            <div style={listStyle}>
                <input
                    type="text"
                    placeholder="Enter an address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button onClick={handleGeolocationClick}>Share My Location</button>
                {/* Display your list of locations here */}
            </div>
            <div style={mapStyle}>
                <LoadScript googleMapsApiKey="AIzaSyDyu1Rvu4vbvohcfXexBH1i9fVPcsA8-yA">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={userLocation || center}
                        zoom={10}
                    >
                        {userLocation && <Marker position={userLocation} />}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}
export default MapPage;