import { useContext } from "react";
import AboutSchool from "../AboutSchool/AboutSchool";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import { AuthContext } from "../../../Provider/AuthProvider";

const Home = () => {
    const {loading} = useContext(AuthContext);
    if(loading){
        return <p className="p-36">Loading <span className="loading loading-dots loading-lg"></span></p>
    }
    return (
        <div>
            <Banner></Banner>
            <PopularInstructor></PopularInstructor>
            <AboutSchool></AboutSchool>
        </div>
    );
};

export default Home;