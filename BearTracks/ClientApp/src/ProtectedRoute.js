import { Outlet } from "react-router";
import Login from "./components/Login";
const useAuth = () => {
    //hardcoded for demo
    const user = { SignedIn: false };
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> :<Login/>
}

export default ProtectedRoutes;