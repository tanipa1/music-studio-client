import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
const Footer = () => {
    return (
        <div >
            {/* upper */}
            <div className='relative top-16 grid lg:grid-cols-2 gap-3 justify-evenly bg-[#efcf4f] mx-10 lg:mx-48 px-4 rounded-lg py-5'>
                <div className='text-white font-extrabold text-center lg:text-left'>
                    <p className='text-xs lg:text-lg'>Want to know last news?</p>
                    <h2 className='lg:text-3xl text-xl text-[#0c4b65]'>Subscribe</h2>
                </div>
                <div className="relative h-1/3 ">
                    <input type="text" placeholder="Your Email Address" className="input input-bordered lg:w-full lg:pr-36" />
                    <button className="btn bg-[#c25934] text-white login-btn absolute top-0 right-0 rounded-l-none">Subscribe</button>
                </div>
            </div>
            <div className='bg-[#0c4b65] py-14'>
                <footer className="footer p-10 text-white ">
                    <Link to='/' className="flex items-center">
                        <img className='lg:w-24 w-14' src={logo} alt="" />
                        <div>
                            <h2 className='logo-title lg:text-3xl font-bold text-xl text-[#efcf4f]'>Music <span className='text-[#c25934]'>Studio</span></h2>
                            <p className='font-serif'>Elevate Your Musical Talent</p>
                        </div>
                    </Link>
                    <div>
                        <span className="text-lg font-bold mb-2 text-[#efcf4f]">Contact Us</span>
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#efcf4f" d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" /></svg>
                            <p>04360, NewYork, 33 Matehouse str., 12/4</p>
                        </div>
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#efcf4f" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z" /></svg>
                            <p>support@music-studio.com</p>
                        </div>
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#efcf4f" fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42a18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /></svg>
                            <p>803-33-5644-99</p>
                        </div>
                    </div>
                    <div >
                        <span className="text-lg font-bold mb-2 text-[#efcf4f]">Social Links</span>
                        <div className='flex gap-8 mt-5'>
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="#efcf4f"><path fill="#efcf4f" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="#efcf4f"><path fill="#efcf4f" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="#efcf4f"><path fill="#efcf4f" d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>

                        </div>
                    </div>
                </footer>
                <p className='text-white text-center'>Copyright © 2023 - All right reserved by Music Studio</p>
            </div>
        </div>
    );
};

export default Footer;