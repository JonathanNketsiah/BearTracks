import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './LoginFront.css'


const SignUp = () => {
    const emailScn = useRef(null);
    const passwordScn = useRef(null);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate('/')
    }


    return (
        <div className='container'>
            <h1>Create Account</h1>

            <form className='input-wrapper' onSubmit = {handleSignUp} >
                <label>Enter Email</label>
                <input type='text' ref={emailScn} placeholder='email' />
                <label>Enter Password</label>
                <input type='password' ref={passwordScn} placeholder='password' autoComplete="off" />
                <button>SignUp</button>

            </form>

            <div className='links-wrap'>
                <NavLink to={'/'} >Already have an account? Login</NavLink>
            </div>
        </div>
    )
}

export default SignUp
