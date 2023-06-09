import { FaBookMedical, FaBookOpen, FaBookReader, FaCheckCircle, FaHome, FaMoneyCheckAlt, FaUsers } from 'react-icons/fa';
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';
import saxo from '../assets/saxo.png'
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const {loading} = useAuth();

    if(loading){
        return <p className="p-36 flex">Loading <span className="loading loading-dots loading-lg"></span></p>
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#0c4b65] text-[#efcf4f]">
                <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                <ul className="menu p-4 w-80">
                    {/* Sidebar content here */}
                    <a className="flex mb-10">
                        <img className='lg:w-16 w-14' src={logo} alt="" />
                        <div>
                            <h3 className="logo-title lg:text-3xl font-bold text-xl text-[#efcf4f]">Music <span className='text-[#c25934] lg:text-4xl'>Studio</span></h3>
                            <p className="uppercase text-white">Elevate Your Musical Talent</p>
                        </div>
                    </a>
                    <li className='text-xl'><NavLink to='/'><FaHome />Go to Home</NavLink></li>
                    {
                        isAdmin ?
                            <>
                                <li className='text-xl'><NavLink to='/dashboard/manageClass'><FaBookOpen /> Manage Classes</NavLink></li>
                                <li className='text-xl'><NavLink to='/dashboard/manageUsers'><FaUsers /> Manage Users</NavLink></li>
                            </> :
                        isInstructor ?
                            <>
                                <li className='text-xl'><NavLink to='/dashboard/addClass'><FaBookMedical /> Add a Class</NavLink></li>
                                <li className='text-xl'><NavLink to='/dashboard/myClasses'><FaBookReader /> My Classes</NavLink></li>           
                            </> :
                            <>
                                <li className='text-xl'><NavLink to='/dashboard/selectedClasses'><FaCheckCircle /> My Selected Classes</NavLink></li>
                                <li className='text-xl'><NavLink to='/dashboard/enrolledClasses'><FaMoneyCheckAlt /> My Enrolled Classes</NavLink></li> 
                            </>
                    }
                    <img className='animate__animated animate__swing mt-20' src={saxo} alt="" />
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;