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
<<<<<<< HEAD
import React, { useEffect, useState, CSSProperties } from 'react'
=======
import React, { useEffect, useState } from 'react'
>>>>>>> 7087262010b003c1a17d32a627e50c7dff6384df
import NavbarStatus from './components/NavbarStatus'
import ClipLoader from "react-spinners/ClipLoader"

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "red",
};
function App() {
   
    const [loading, setLoading] = useState(false)
<<<<<<< HEAD
    useEffect(() => {
            // change to on execute for buttons
        setLoading(true)
=======
        useEffect(() => {
            setLoading(true)
>>>>>>> 7087262010b003c1a17d32a627e50c7dff6384df
            setTimeout(() => { setLoading(false) }, 3000)
         }, [])
    return (
        <>
            <NavbarStatus>
                <Navbar />
            </NavbarStatus>
<<<<<<< HEAD
            {
                loading ? <ClipLoader color={'#D0021B'} loading={loading} cssOverride={override} size={200} /> :
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/signUp' element={<SignUp />} />
                        <Route path='/Home' element={<MapPage />} />
                        <Route path='/Profile' element={<Profile />} />
                        <Route path='/Social' element={<Social />} />
                        <Route path='/About' element={<About />} />
                        <Route path='/LandingPage' element={<LandingPage />} />
                        <Route element={<ProtectedRoutes />} >
                        </Route>
                    </Routes>

            }
=======

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

