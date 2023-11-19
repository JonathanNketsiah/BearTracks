import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ProtectedRoutes from './ProtectedRoute'
import MapPage from './components/MapPage'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Social from './components/Social'
import About from './components/About'
import React, { useEffect, useState } from 'react'
import NavbarStatus from './components/NavbarStatus'
import ClipLoader from "react-spinners/ClipLoader"

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "red",
};
function App() {
   
    const [loading, setLoading] = useState(false)
        useEffect(() => {
            setLoading(true)
            setTimeout(() => { setLoading(false) }, 3000)
         }, [])
    return (
        <>
            <NavbarStatus>
                <Navbar />
            </NavbarStatus>

            loading? <ClipLoader color={'#D0021B'} loading={loading} size={100} /> :
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/Home' element={<MapPage />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Social' element={<Social />} />
                <Route path='/About' element={<About />} />
                <Route path='/LandingPage' element={<LandingPage/>} />
                <Route element={<ProtectedRoutes/> } >
                </Route>
            </Routes>
         
           
>>>>>>> 7087262010b003c1a17d32a627e50c7dff6384df
        </>
    )
}

export default App

