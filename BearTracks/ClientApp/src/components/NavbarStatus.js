import React,{useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

const NavbarStatus =({ children })=>{
    const location = useLocation();
    const [showNavbar, setShowNav] = useState(false);

    useEffect(() =>{
        console.log(location)
        if(location.pathname ==='/'){
            setShowNav(false)

        }

      else if (location.pathname ==='/signUp'){
            setShowNav(false)

        }


        else{
            setShowNav(true)
        }
    },[location])

    return(
        <div>
        {showNavbar && children}
        </div>

    )
}

export default NavbarStatus;