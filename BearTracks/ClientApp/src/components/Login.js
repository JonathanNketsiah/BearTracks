import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './LoginFront.css'


const Login = () => {
    const emailScn2 = useRef(null);
    const passwordScn2 = useRef(null);
    const navigate = useNavigate

    const handleIn = (e) => {
        e.preventDefault();
        navigate('/LandingPage');
    }
   

    return (
        <>

            <div className='container'>
                <h1> BEARTRACKS </h1>
                <h2>Login</h2>
                <form className='input-wrapper' onSubmit={handleIn}>
                    <label>Enter Email</label>
                    <input type='text' ref={emailScn2} placeholder='email' />
                    <label>Enter Password</label>
                    <input type='password' ref={passwordScn2} placeholder='password' autoComplete='off'/>
                    <button>Login</button>
                </form>
                <div className='links-wrap'>
                    <NavLink to={'/signUp'} >Create an account</NavLink>
                </div>
            </div>
        </>
    )
}

export default Login