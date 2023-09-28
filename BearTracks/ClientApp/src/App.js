import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ProtectedRoutes from './ProtectedRoute'

function App() {


    return (
        <>
            <Routes>
                <Route path='/' element={<Login/>} />  
                <Route path='/signUp' element={<SignUp />} />
                <Route element={<ProtectedRoutes/> } >
                <Route path='/LandingPage' element={<LandingPage/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App

