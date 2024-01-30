import { FaBookMedical, FaBookOpen, FaBookReader, FaCheckCircle, FaHome, FaMoneyCheckAlt, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';
import saxo from '../assets/saxo.png'
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useAuth from '../hooks/useAuth';
import MouseParticles from 'react-mouse-particles'

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
            <div className="drawer-content lg:m-12">
                {/* Responsive SideBar */}
                <div className='mx-3 py-2 lg:hidden items-center flex gap-32 justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='rounded-full h-[50px] w-[50px]' src={logo} alt="" />
                        <div>
                            <h2 className='flex logo-title lg:text-3xl font-bold text-xl text-[#efcf4f]'>Music <span className='text-[#c25934] lg:text-4xl'>Studio</span></h2>
                            <p className='font-serif text-xs lg:text-base '><small>Elevate Your Musical Talent</small></p>
                        </div>
                    </div>
                    <label htmlFor="my-drawer-2" tabIndex={0} role="button" className="btn btn-ghost lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg></label>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side lg:bg-[#0c4b65] text-[#efcf4f]">
                <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                <ul className="menu p-4 h-full lg:w-80 w-60 bg-[#0c4b65]">
                    {/* Sidebar content here */}
                    <Link to='/' className="flex mb-10">
                        <img className='lg:w-16 w-14' src={logo} alt="" />
                        <div>
                            <h3 className="logo-title lg:text-3xl font-bold text-xl text-[#efcf4f]">Music <span className='text-[#c25934] lg:text-4xl'>Studio</span></h3>
                            <p className="uppercase text-xs text-white"><small>Elevate Your Musical Talent</small></p>
                        </div>
                    </Link>
                    <li className='lg:text-xl text-lg'><NavLink to='/'><FaHome />Go to Home</NavLink></li>
                    {
                        isAdmin ?
                            <>
                                <li className='lg:text-xl text-base'><NavLink to='/dashboard/manageClass'><FaBookOpen /> Manage Courses</NavLink></li>
                                <li className='lg:text-xl text-base'><NavLink to='/dashboard/manageUsers'><FaUsers /> Manage Users</NavLink></li>
                            </> :
                        isInstructor ?
                            <>
                                <li className='lg:text-xl text-base'><NavLink to='/dashboard/addClass'><FaBookMedical /> Add a Course</NavLink></li>
                                <li className='lg:text-xl text-base'><NavLink to='/dashboard/myClasses'><FaBookReader /> My Courses</NavLink></li>           
                            </> :
                            <>
                                <li className='lg:text-xl text-base'><NavLink to='/dashboard/selectedClasses'><FaCheckCircle /> My Selected Courses</NavLink></li>
                                <li className='lg:text-xl text-base'><NavLink to='/dashboard/enrolledClasses'><FaMoneyCheckAlt /> My Enrolled Courses</NavLink></li> 
                            </>
                    }
                    <img className='animate__animated animate__swing mt-20' src={saxo} alt="" />
                </ul>

            </div>
            <MouseParticles
                g={1}
                color="random"
                cull="MuiSvgIcon-root,MuiButton-root"
                level={6}
            />
        </div>
    );
};

export default Dashboard;