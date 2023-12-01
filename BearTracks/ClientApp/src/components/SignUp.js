import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/LoginFront.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
//import bcrypt from 'bcryptjs';

const SignUp = () => {
    const _firstNameScn = useRef(null);
    const _lastNameScn = useRef(null);
    const _emailScn = useRef(null);
    const _userNameScn = useRef(null);
    const _passwordScn = useRef(null);

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const [success, setSuccessMessage] = useState(null);
    const [error, ShowError] = useState(null);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSignUp = async (event) => {
        event.preventDefault();

        const _firstNm = _firstNameScn.current.value;
        const _lastNm = _lastNameScn.current.value;
        const _email = _emailScn.current.value;
        const _userNm = _userNameScn.current.value;
        const _password = _passwordScn.current.value;

        try {
            const response = await fetch("account/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: _firstNm,
                    lastName: _lastNm,
                    email: _email,
                    userName: _userNm,
                    password: _password,
                }),
            });
            // Check if aacount creation was successful, then redirect if not
            if (response.ok) {
                const successNoti = response.ok;
                setSuccessMessage(successNoti);

                // window.location.href = "/"; // replace with your actual landing page URL
            } else {
                console.error("Login Failed");
                // Handle your error here
            }
        } catch (error) {
            console.error(error);
            // Handle your error here
        }
    };



    const emailRegex = () => {
        const email = _emailScn.current.value;
        if (email === "") {
            ShowError();
        } else if (!emailValidator.test(email)) {
            alert("invalid password");
        }

        // else {
        //     alert('valid')
        // }
    };

    const passwordRegex = () => {
        const password = _passwordScn.current.value;

        if (password === "") {
            alert("Password is required");
        } else if (!passwordValidator.test(password)) {
            alert("invalid password");
        }

        // else {
        //     alert('valid')
        // }
    };

    return (
        <div className="container">
            <div className="contWrap">
                <form className="input-wrapper" onSubmit={handleSignUp}>
                    <h2 className="my-text">Sign Up</h2>

                    <TextField id="filled-basic" label="First Name" variant="filled" inputRef={_firstNameScn} margin="normal" />
                    <TextField id="filled-basic" label="Last Name" variant="filled" inputRef={_lastNameScn} margin="normal" />
                    <TextField id="filled-basic" label="User Name" variant="filled" inputRef={_userNameScn} margin="normal" />
                    <TextField id="filled-basic" label="Email" variant="filled" inputRef={_emailScn} margin="normal" />
                    <FormControl margin="normal" variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            inputRef={_passwordScn}
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
                        SignUp
                    </button>
                    {
                        success && <div className="alert">
                            <Alert variant="outlined" severity="success">
                                Account successfully created ,log in!
                            </Alert>
                        </div>
                    }


                    {error && <div className="alert">   <Alert variant="outlined" severity="error">
                        Email required
                    </Alert></div>}
                    <div className="links-wrap">
                        <NavLink to={"/"} className="navcolor">
                            Already have an account? Login
                        </NavLink>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SignUp;
//export { hashedPassword }