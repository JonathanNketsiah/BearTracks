import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import BearLogo from './Assets/BearLogo.png'
import './LoginFront.css'

const Reset = () => {
    const _emailScn = useRef(null);
    const _userNameScn = useRef(null);
    const handlePasswordReset = async (event) => {
        event.preventDefault();

        const _email = _emailScn.current.value;
        const _userNm = _userNameScn.current.value;
        try {
            const response = await fetch('account/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: _email,
                    userName: _userNm,
                })
            });
            // Check if aacount creation was successful, then redirect if not
            if (response.ok) {
                window.location.href = '/LandingPage'; // replace with your actual landing page URL
            }
            else {
                console.error("Login Failed");
                // Handle your error here
            }
        } catch (error) {
            console.error(error);
            // Handle your error here
        }
    }

    return (
        <div className='container'>
            <div className='img'>
                <div className='container-img'> 
                    <img src={BearLogo} alt="BearLogo" className='BearLogo'/>
                    </div>
                </div>
                <h1> BEARTRACKS </h1>
            <h2 className='my-text'>Reset Password</h2>

            <form className='input-wrapper' onSubmit = {handlePasswordReset} >
            <label className='my-text'>Enter Email</label>
                <input type='text' ref={_emailScn} placeholder='email' />
                <label className='my-text'>Enter User Name</label>
                <input type='text' ref={_userNameScn} placeholder='user name' />
                <button onClick={() => {}}>Reset</button>
            </form>

            <div className='links-wrap'>
                <NavLink to={'/'} className='navcolor'>Already have an account? Login</NavLink>
                <NavLink to={'/signUp'} className ='navcolor'>Create an account</NavLink>
            </div>
        </div>
    )
}

export default Reset
