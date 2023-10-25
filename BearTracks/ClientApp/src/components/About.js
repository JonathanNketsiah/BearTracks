import React from 'react';
import BearLogo from './Assets/BearLogo.png'
import './AboutUs.css'
const About = () => {
 
    return (
        <>
        <div className="container2">
                <div className="heading">
                 <h1>About us</h1>
                </div>
                <div className="subCont">
                    <div className="content">
                        <h2>Welcome to BearTracks</h2>
                        <p>
                            Beartracks was conceived out of a shared passion for entertainment and technology, and we're dedicated to making your leisure time unforgettable.
                            Our web-based application is designed to be your personalized entertainment compass, suggesting the best options based on your location.
                            Whether you're looking for a cozy cafe, a lively concert, or a hidden gem in your city, Beartracks has you covered.
                            We're excited to embark on this journey with you, bringing the best of entertainment recommendations right to your fingertips.
                            Join us and let Beartracks be your guide to unforgettable experiences, wherever you are.
                        </p>
                    </div>
                    <div className="logo-bear">
                        <img src={BearLogo} alt="BearLogo" className='BearLogo' />
                    </div>
                </div>
            </div>
        </>
    )


}

export default About;