import React, { useState, useEffect } from 'react';
import mapIcon from './Assets/google-maps.png'

function SeatGeekEvents({ userLocation, setEventsOnMap }) {
    const [seatGeekEvents, setSeatGeekEvents] = useState([]);

    useEffect(() => {
        if (userLocation) {
            // Fetch events from SeatGeek API here
            const apiKey = 'Mzc3OTM4NTV8MTY5ODI0OTAwOS40MTYyNzUz';
            const seatGeekUrl = `https://api.seatgeek.com/2/events?geoip=false&lat=${userLocation.lat}&lon=${userLocation.lng}&client_id=${apiKey}&per_page=10`;

            fetch(seatGeekUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log('SeatGeek API Response:', data);
                    const events = data.events;

                    // Filter events within a certain radius (e.g., 10 miles)
                    const filteredEvents = events.filter((event) => {
                        const eventLat = event.venue.location.lat;
                        const eventLng = event.venue.location.lon;

                        // Calculate distance between the event and user
                        const radius = 6371; // Earth's radius in kilometers
                        const dLat = (eventLat - userLocation.lat) * (Math.PI / 180);
                        const dLng = (eventLng - userLocation.lng) * (Math.PI / 180);
                        const a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(userLocation.lat * (Math.PI / 180)) *
                            Math.cos(eventLat * (Math.PI / 180)) *
                            Math.sin(dLng / 2) * Math.sin(dLng / 2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        const distance = radius * c;

                        const miles = distance * 0.621371; // Convert kilometers to miles
                        return miles <= 50;
                    });

                    setSeatGeekEvents(filteredEvents);
                    setEventsOnMap(filteredEvents);
                })
                .catch((error) => {
                    console.error('Error fetching SeatGeek events', error);
                });
        }
    }, [userLocation, setEventsOnMap]);

    return (
        <div>
            <h2>SeatGeek Events</h2>
            <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                {seatGeekEvents.map((event, index) => (
                    <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
                        <h3>{event.title}</h3>
                        <p>{event.venue.address}</p>
                        {/* Add a clickable icon that redirects to Google Maps for navigation */}
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venue.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginRight: '10px' }}
                        >
                            <img
                                src={mapIcon} // Replace with the path to your map icon image
                                alt="Navigate to Venue"
                                width="40"
                                height="40"
                            />
                        </a>
                    </li>
                ))}
            </ul>
            </div>
        </div>

    );
}

export default SeatGeekEvents;
