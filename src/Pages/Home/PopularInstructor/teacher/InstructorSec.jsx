import './InstructorSec.css';
const InstructorSec = ({ instructor }) => {
    const { instructor_name, img } = instructor;
    return (
        <div>
            <div className="popular-ins avatar rounded-full p-2 border-2 border-[#efcf4f] ">
                <div className="lg:w-48 w-32  rounded-full">
                    <img src={img} />
                </div>
            </div>
            <h2 className="lg:ml-10 ml-6 font-bold lg:text-2xl">{instructor_name}</h2>
        </div>
    );
};

export default InstructorSec;