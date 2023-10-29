import { useQuery } from "@tanstack/react-query";

const Instructors = () => {
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await fetch('http://localhost:5000/users/instructor')
        return res.json();
    });

    return (
        <div>
            <div className="text-center font-bold pt-24 lg:pt-32 mb-10">
                <p className="text-[#c25934] text-base lg:text-xl">Our Team</p>
                <h2 className="text-[#0c4b65] text-xl lg:text-3xl">Meet Our Instructors</h2>
            </div>
            
            <div className="animate__animated animate__jello grid lg:grid-cols-3 lg:mx-24 ">
                {
                    instructors.map(instructor => <div key={instructor._id} className="card border-t-2 border-[#c25934] w-72 mb-5 mx-auto bg-base-100 shadow-2xl">
                        <figure className="px-5 pt-5">
                            <img src={instructor.photo} alt="Shoes" className="rounded-xl w-48 h-48" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title font-bold lg:text-2xl">{instructor.name}</h2>
                            <p>{instructor.email}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;