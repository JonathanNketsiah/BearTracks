
import React, { useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


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

    const handleSearch = () => {
        const apiKey = 'AIzaSyDyu1Rvu4vbvohcfXexBH1i9fVPcsA8-yA';
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${apiKey}`;

        fetch(geocodeUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'OK' && data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    setUserLocation({ lat: location.lat, lng: location.lng });
                } else {
                    alert('Address not found. Please enter a valid address.');
                }
            })
            .catch((error) => {
                console.error('Error', error);
                alert('There was an error while fetching data. Please try again.');
            });
    };

    const containerStyle = {
        width: '100%',
        paddingBottom: '56.25%',
    };

    const pageStyle = {
        display: 'flex',
        flexDirection: 'row',
    };

    const listStyle = {
        width: '25%',
        background: 'lightpurple', 
        borderRadius: '10px', 
        padding: '10px', 
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        margin: '10px', 
        background: 'white',
    };

    const mapStyle = {
        width: '75%',
        background: 'lightpurple',      
        borderRadius: '10px', 
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', 
        margin: '10px', 
        background: 'white',
    };
    const mapInnerContainerStyle = {
        borderRadius: '20px',
        overflow: 'hidden', 
    };

    const buttonContainerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const searchInputStyle = {
        flex: '1',
        borderRadius: '10px',
        padding: '10px 20px',
        margin: '5px',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',

    };

    const buttonStyle = {
        background: '#772ce8',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '10px 20px',
        margin: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={pageStyle}>

            <div style={listStyle}>
                <div style={buttonContainerStyle}>
                    <input
                        type="text"
                        placeholder="Enter an address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={searchInputStyle}
                    />

                    <button
                        onClick={handleSearch}
                        style={{ ...buttonStyle}}
                    >
                        Search
                    </button>
                    <button
                        onClick={handleGeolocationClick}
                        style={{ ...buttonStyle }}
                    >AutoLocate
                    </button>
                </div>
            </div>
            <div style={{...mapStyle, ...mapInnerContainerStyle}}>
                <LoadScript googleMapsApiKey="AIzaSyDyu1Rvu4vbvohcfXexBH1i9fVPcsA8-yA">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={userLocation || center}
                        zoom={15}
                    >
                        {userLocation && <Marker position={userLocation} />}
                    </GoogleMap>
                </LoadScript>

            </div>
        </div>
    );
}
export default MapPage;
