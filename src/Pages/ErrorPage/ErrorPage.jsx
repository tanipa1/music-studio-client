import { Link } from 'react-router-dom';
import error from '../../assets/error-page.jpg';
const ErrorPage = () => {
    return (
        <div className='flex items-center gap-16 justify-evenly'>
            <img className='w-1/2' src={error} alt="" />
            <div>
                <h3 className='text-4xl'>Oopsss Sorry!! <br /> Page Not Found</h3>
                <Link to='/'><button className='btn bg-[#c25934] text-white login-btn mt-10'>Go to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;