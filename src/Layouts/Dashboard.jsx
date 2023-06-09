import { FaBookOpen, FaUsers } from 'react-icons/fa';
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const isAdmin = true;
    const isInstructor = false;

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
                <ul className="menu p-4 w-80 h-full">
                    {/* Sidebar content here */}
                    <a className=" grid grid-rows-2 ml-3 mb-10">
                        <h3 className="uppercase text-2xl">Music <span>Studio</span></h3>
                        <p className="uppercase">Elevate Your Musical Talent</p>
                    </a>
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/manageItems'><FaBookOpen /> Manage Items</NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'><FaUsers /> All Users</NavLink></li>
                            </> : isInstructor ?
                                <>

                                </> :
                                <>

                                </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;