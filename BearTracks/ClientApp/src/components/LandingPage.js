import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();

    const LogOut = () => {
        navigate('/')
    }

    return (
        <>
            <h1>Welcome to BearTracks</h1>
            <button onClick={LogOut}>LogOut </button>
        </>
    )


}

export default LandingPage;
