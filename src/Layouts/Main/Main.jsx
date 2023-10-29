import { Outlet } from "react-router-dom";
import NavBar from "../../Shared/NavBar/NavBar";
import Footer from "../../Shared/Footer/Footer";
import './Main.css';
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Main = () => {

    const {loading} = useContext(AuthContext);
    if(loading){
        return <p className="p-36 flex"><span className="text-xl font-bold">Loading </span><span className="loading loading-dots loading-lg"></span></p>
    }
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
