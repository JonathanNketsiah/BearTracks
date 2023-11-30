import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/LoginFront.css";
import BearLogo from "./Assets/BearLogo.png";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

//import { hashedPassword } from './SignUp.js'

const Login = () => {
    const _emailScn2 = useRef();
    const _passwordScn2 = useRef();
    // eslint-disable-next-line
    const emailValidator =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // eslint-disable-next-line
    const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    const [showPassword, setShowPassword] = React.useState(false);
    const [error, ShowError] = useState(null);
    const [PassError, ShowErrorPass] = useState(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleIn = async (event) => {
        event.preventDefault();
        const _email = _emailScn2.current.value;
        const _password = _passwordScn2.current.value;

        // const getHashedpassword = hashedPassword;

        try {
            const response = await fetch("account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: _email,
                    password: _password,
                }),
            });

            // Check if login was successful, then redirect
            if (response.ok) {
                document.cookie = `email=${_email}`;
                window.location.href = "/Home"; // replace with your actual landing page URL
            } else {
                console.error("Login Failed");
                // Handle your error here
            }
        } catch (error) {
            console.error(error);
            // Handle your error here
        }

        //  console.log(getHashedpassword)
    };

    const emailRegex = () => {
        const email = _emailScn2.current.value;
        if (email === "") {
            ShowError(true);

        } else if (!emailValidator.test(email)) {
            alert("invalid email");
        }

        // else {
        //     alert('valid')
        // }
    };

    const passwordRegex = () => {
        const password = _passwordScn2.current.value;

        if (password === "") {
            ShowErrorPass(true)
        } else if (!passwordValidator.test(password)) {
            alert("invalid password");
        }

        // else {
        //     alert('valid')
        // }
    };

    return (
        <>
            <div className="container">
                <div className="contWrap">
                    <div className="img">
                        <div className="container-img">
                            <img src={BearLogo} alt="BearLogo" className="BearLogo" />
                        </div>
                    </div>
                    <h1 className="bearTitle"> BEARTRACKS </h1>

                    <form className="input-wrapper" onSubmit={handleIn}>
                        <h2 className="my-text">Login</h2>
                        <TextField id="filled-basic" label="Email" variant="filled" inputRef={_emailScn2} margin="normal" />
                        <FormControl margin="normal" variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                inputRef={_passwordScn2}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>

                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <button
                            onClick={() => {
                                emailRegex();
                                passwordRegex();
                            }}
                        >
                            Login
                        </button>


                        {error && <div className="alert">
                            <Alert variant="outlined" severity="error">
                                Email required
                            </Alert></div>}


                        {PassError && <div className="alert">
                            <Alert variant="outlined" severity="error">
                                Password required
                            </Alert></div>}

                        <div className="links-wrap">
                            <NavLink to={"/signUp"} className="navcolor">
                                Create an account
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
