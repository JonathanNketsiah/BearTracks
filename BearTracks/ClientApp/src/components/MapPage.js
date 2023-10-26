
import React, { useState, useEffect } from 'react';
//import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import eventsData from './Assets/events.json';
import SeatGeekEvents from './SeatGeekEvents';
import seatgeekIcon from './Assets/seatgeek-marker.png'
import logo from './Assets/logo.png'; 

const center = {
    lat: 0,
    lng: 0,
};

function MapPage() {
    const [address, setAddress] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedListEvent, setSelectedListEvent] = useState(null);
    const [eventsOnMap, setEventsOnMap] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [mapLogoVisible, setMapLogoVisible] = useState(true);
    const [locationInputted, setLocationInputted] = useState(false);

    const handleEventMarkerClickSG = (event) => {
        setSelectedMarker(event);
    };
    const handleGeolocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocationInputted(true)
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };
    useEffect(() => {
        if (userLocation) {
            setMapLogoVisible(false); 
            setEvents(eventsData);
        }
    }, [userLocation]);

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
                    setLocationInputted(true); 
                } else {
                    alert('Address not found. Please enter a valid address.');
                }
            })
            .catch((error) => {
                console.error('Error', error);
                alert('There was an error while fetching data. Please try again.');
            });
    };
    const handleEventMarkerClick = (event) => {
        setSelectedEvent(event);
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        paddingBottom: '56.25%',
    };

    const pageStyle = {
        display: 'flex',
        flexDirection: 'row',
    };

    const listStyle = {
        width: '25%',
        height: '75%',
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
        padding: '1%',
    };
    const mapInnerContainerStyle = {
        height: '75%',
        borderRadius: '20px',
        overflow: 'hidden', 
    };
    const customMapStyle = [
        {
            featureType: 'poi',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
    ];

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
                <div style={{ marginTop: '20px' }} style={{ display: locationInputted ? 'block' : 'none' }} >
                    <h2>Events</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {events.map((event, index) => (
                            <li key={index}
                                style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
                                onClick={() => setSelectedListEvent(event)}>
                                <h3>{event.name}</h3>
                                <p>{event.location}</p>
                            </li>
                        ))}
                    </ul>
                    <hr style={{ border: '3px solid black', margin: '20px 0' }} />
                    <SeatGeekEvents userLocation={userLocation} setEventsOnMap={setEventsOnMap} />

                </div>
            </div>

            <div style={{...mapStyle, ...mapInnerContainerStyle}}>
                <LoadScript googleMapsApiKey="AIzaSyDyu1Rvu4vbvohcfXexBH1i9fVPcsA8-yA">
                    {mapLogoVisible ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',padding:'10%' }}>
                            <img
                                src={logo}
                                alt="Map Logo"
                                style={{
                                    width: '25%', height: '25%', animation: 'bounce 2s infinite', }}

                            />
                            <p style={{ marginTop: '10px', fontSize: '18px', textAlign: 'center' }}>Input or share location to get started!</p>
                        </div>

                    ) : (
                    <GoogleMap
                                mapContainerStyle={{
                                    ...containerStyle,
                                }}
                        center={userLocation || center}
                        zoom={15}
                        options={{ styles: customMapStyle }}
                    >
                        {userLocation && <Marker
                            position={userLocation} />}

                        {events.map((event, index) => (
                            <Marker
                                key={index}
                                position={{ lat: event.latitude, lng: event.longitude }}
                                onClick={() => handleEventMarkerClick(event)}
                            />
                        ))}
                        {eventsOnMap.map((event, index) => (
                            <Marker
                                key={index}
                                position={{
                                    lat: event.venue.location.lat,
                                    lng: event.venue.location.lon,
                                }}
                                icon={seatgeekIcon}
                                onClick={() => handleEventMarkerClickSG(event)}

                            />
                        ))}
                        {selectedEvent && (
                            <InfoWindow
                                position={{ lat: selectedEvent.latitude, lng: selectedEvent.longitude }}
                                onCloseClick={() => setSelectedEvent(null)}
                            >
                                <div>
                                    <h3>{selectedEvent.name}</h3>
                                    <p>{selectedEvent.description}</p>
                                </div>
                            </InfoWindow>
                        )}
                        {selectedListEvent && (
                            <InfoWindow
                                position={{ lat: selectedListEvent.latitude, lng: selectedListEvent.longitude }}
                                onCloseClick={() => setSelectedListEvent(null)}
                            >
                                <div>
                                    <h3>{selectedListEvent.name}</h3>
                                    <p>{selectedListEvent.description}</p>
                                </div>
                            </InfoWindow>
                        )}
                        {selectedMarker && (
                            <InfoWindow
                                position={{
                                    lat: selectedMarker.venue.location.lat,
                                    lng: selectedMarker.venue.location.lon,
                                }}
                                onCloseClick={() => setSelectedMarker(null)}
                            >
                                <div>
                                    <h3>{selectedMarker.title}</h3>
                                    <p>{selectedMarker.venue.address}</p>
                                    <p>Date and Time: {new Date(selectedMarker.datetime_local).toLocaleString()}</p>
                                    {selectedMarker.performers && selectedMarker.performers.length > 0 && (
                                        <div>
                                            <h4>Performers</h4>
                                            <ul style={{ listStyleType: 'none', display: 'flex', flexWrap: 'wrap' }}>
                                                {selectedMarker.performers.map((performer, performerIndex) => (
                                                    <li key={performerIndex} style={{ marginRight: '10px' }}>
                                                        <img src={performer.image} alt={performer.name} width="100" height="100" />
                                                        <p>{performer.name}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                        </GoogleMap>
                    )}
                </LoadScript>

            </div>
        </div>
    );
}
export default MapPage;
