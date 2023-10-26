import './NavBarStyle.css'
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import React from 'react';



function Navbar() {
    const navigate = useNavigate();

    const LogOut = () => {
        navigate('/')
    }

    return (
        <>
            <nav>
                <NavLink to="/Home" className="title" > BearTracks</NavLink>
               
                <div>
                    <ul id="navbar">                           
                        <li><NavLink to="/Social" className="link" >Social</NavLink></li>
                        <li><NavLink to="/Profile" className="link" >Account</NavLink></li>
                        <li><NavLink to="/About" className="link" >About us</NavLink></li>
                        <button className ="logOutbutton"onClick={LogOut}>LogOut </button>
                        
                       
                    </ul>
                </div>
               
            </nav>
        </>
    )
}

export default Navbar;