import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './LoginFront.css'
//import bcrypt from 'bcryptjs';


let hashedPassword = null;

const SignUp = () => {
    const _firstNameScn = useRef(null);
    const _lastNameScn = useRef(null);
    const _emailScn = useRef(null);
    const _userNameScn = useRef(null);
    const _passwordScn = useRef(null);

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
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

    const emailRegex = () => {
        const email = _emailScn.current.value;
        if (email === "") {
            alert("Please enter an email")
        }

        else if (!emailValidator.test(email)) {
            alert("invalid password")

        }


        // else {
        //     alert('valid')
        // }
    }

    const passwordRegex = () => {
        const password = _passwordScn.current.value;

        if (password === "") {
            alert("Password is required")
        }

        else if (!passwordValidator.test(password)) {
            alert("invalid password")

        }


        // else {
        //     alert('valid')
        // }
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
                <button onClick={() => {
                    emailRegex()
                    passwordRegex()
                }}>SignUp</button>
            </form>

            <div className='links-wrap'>
                <NavLink to={'/'} className='navcolor'>Already have an account? Login</NavLink>
            </div>
        </div>
    )
}

export default SignUp
//export { hashedPassword }
