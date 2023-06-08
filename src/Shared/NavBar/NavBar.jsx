import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png';

const NavBar = () => {

    const navItems = <>
        <li className='font-bold text-base'><Link>Home</Link></li>
        <li className='font-bold text-base'><Link>Instructors</Link></li>
        <li className='font-bold text-base'><Link>Classes</Link></li>
        <li className='font-bold text-base'><Link>Dashboard</Link></li>
    </>

    return (
        <div className=''>
            <div className="navbar lg:px-20 fixed z-10 bg-white bg-opacity-70">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link className="flex items-center">
                    <img className='lg:w-20 w-14' src={logo} alt="" />
                    <div>
                    <h2 className='flex logo-title lg:text-3xl font-bold text-xl text-[#efcf4f]'>Music <span className='text-[#c25934] lg:text-4xl'>Studio</span></h2>
                    <p className='font-serif text-xs lg:text-base '>Elevate Your Musical Talent</p>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/login' className="btn bg-[#c25934] text-white login-btn">Login</Link>
            </div>
        </div>
        </div>
    );
};

export default NavBar;