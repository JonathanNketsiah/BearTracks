import Login from './components/Login'
import SignUp from './components/SignUp'
import Reset from './components/Reset'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ProtectedRoutes from './ProtectedRoute'
import MapPage from './components/MapPage'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Social from './components/Social'
import About from './components/About'
import React from 'react'
import NavbarStatus from './components/NavbarStatus'

function App() {
   

    return (
        <>
            <NavbarStatus>
                <Navbar />
            </NavbarStatus>
            
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/Reset' element={<Reset />} />
                <Route path='/Home' element={<MapPage />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Social' element={<Social />} />
                <Route path='/About' element={<About />} />
                <Route path='/LandingPage' element={<LandingPage/>} />
                <Route element={<ProtectedRoutes/> } >
                </Route>
            </Routes>
         
           
        </>
    )
}

export default App

