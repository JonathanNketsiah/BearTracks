import React, { useRef } from 'react'
import { NavLink} from 'react-router-dom'
import './LoginFront.css'


const Login = () => {
    const _emailScn2 = useRef();
    const _passwordScn2 = useRef();
    
    const handleIn = async (event) => {
        event.preventDefault();
        const _email = _emailScn2.current.value;
        const _password = _passwordScn2.current.value;

        try {
            const response = await fetch('account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: _email, 
                    password: _password  
                })
            });
            
            // Check if login was successful, then redirect
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
        <>
            <div className='container'>
                <h1> BEARTRACKS </h1>
                <h2>Login</h2>
                <form className='input-wrapper' onSubmit={handleIn}>
                    <label>Enter Email</label>
                    <input type='text' ref={_emailScn2} placeholder='email' />
                    <label>Enter Password</label>
                    <input type='password' ref={_passwordScn2} placeholder='password' autoComplete='off' />
                    <button>Login</button>
                </form>
                <div className='links-wrap'>
                    <NavLink to={'/signUp'} >Create an account</NavLink>
                </div>
            </div>
        </>
    )
}

export default Login;