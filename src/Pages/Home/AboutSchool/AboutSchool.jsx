import about from '../../../assets/inner.jpg';
import bg from '../../../assets/About-bg.jpg';
const AboutSchool = () => {
    return (
        <div className='lg:mx-24 lg:py-8'>
            <div className="hero bg-fixed mt-20" style={{ backgroundImage: `url(${bg})`}}>
            <div className="hero-overlay bg-opacity-80 "></div>
            <div className="hero-content px-12 grid lg:grid-cols-2 py-20 text-neutral-content">
                <div className="max-w-md">
                    <p className='text-[#efcf4f] font-bold'>Our Classes</p>
                    <h1 className="mb-5 text-5xl font-bold">About Our Camp</h1>
                    <p className="mb-5 text-[#efcf4f] font-bold">"Music is a moral law. It gives soul to the universe, wings to the mind, flight to the imagination, and charm and gaiety to life and to everything." - Plato</p>
                    <p>"Music expresses that which cannot be put into words and that which cannot remain silent." - Victor Hugo</p>
                    <button className="btn bg-[#c25934] text-white login-btn border-0">View More</button>
                </div>
                <div>
                    <img className=' shadow-2xl rounded-2xl' src={about} alt="" />
                </div>
            </div>
        </div>
        </div>
    );
};

export default AboutSchool;