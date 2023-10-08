import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './LoginFront.css'


const SignUp = () => {
    const _firstNameScn = useRef(null);
    const _lastNameScn = useRef(null);
    const _emailScn = useRef(null);
    const _userNameScn = useRef(null);
    const _passwordScn = useRef(null);
    
    const handleSignUp = async (event) => {
        event.preventDefault();

        const _firstNm = _firstNameScn.current.value;
        const _lastNm = _lastNameScn.current.value;
        const _email = _emailScn.current.value;
        const _userNm = _userNameScn.current.value;
        const _password = _passwordScn.current.value;

        try {
            const response = await fetch('account/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: _firstNm,
                    lastName: _lastNm,
                    email: _email,
                    userName: _userNm,
                    password: _password  
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
            <h1>Create Account</h1>

            <form className='input-wrapper' onSubmit = {handleSignUp} >
                <label>Enter First Name</label>
                <input type='text' ref={_firstNameScn} placeholder='first name' />
                <label>Enter Last Name</label>
                <input type='text' ref={_lastNameScn} placeholder='last name' />
                <label>Enter Email</label>
                <input type='text' ref={_emailScn} placeholder='email' />
                <label>Enter User Name</label>
                <input type='text' ref={_userNameScn} placeholder='user name' />
                <label>Enter Password</label>
                <input type='password' ref={_passwordScn} placeholder='password' autoComplete="off" />
                <button>Sign Up</button>
            </form>

            <div className='links-wrap'>
                <NavLink to={'/'} >Already have an account? Login</NavLink>
            </div>
        </div>
    )
}

export default SignUp
