import about from '../../../assets/inner.jpg';
import bg from '../../../assets/About-bg.jpg';
import mishu from '../../../assets/Mishu.jpg';

const AboutSchool = () => {
    return (
        <div className='lg:mx-24 lg:py-8'>
            <div className="hero bg-fixed mt-20" style={{ backgroundImage: `url(${bg})` }}>
                <div className="hero-overlay bg-opacity-80 "></div>
                <div className="hero-content gap-32 px-12 grid lg:grid-cols-2 py-20 text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">About Us</h1>
                        <p className='font-bold text-3xl text-[#efcf4f]'>Kamruzzaman Mishu</p>
                        <p className='mb-5'>Chief Executive, Music Studio</p>
                        <p className="mb-5  font-bold">"Music is a moral law. It gives soul to the universe, wings to the mind, flight to the imagination, and charm and gaiety to life and to everything." - Plato</p>
                        <p className='text-lg'>We oath to satisfy you and let your dream come in life.</p>
                        
                    </div>
                    <div>
                        <img className='w-96 shadow-2xl rounded-2xl' src={mishu} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSchool;