import { useQuery } from "@tanstack/react-query";

const Instructors = () => {
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await fetch('http://localhost:5000/instructors')
        return res.json();
    });

    return (
        <div className="grid lg:grid-cols-2 lg:mx-24 pt-24 lg:pt-32">
            {
                instructors.map(instructor => <div key={instructor._id} className="card w-96 w-full mb-5 mx-auto bg-base-100 shadow-2xl">
                <figure className="px-5 pt-5">
                    <img src={instructor.img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title font-bold lg:text-2xl">{instructor.instructor_name}</h2>
                    <p>{instructor.email}</p>
                </div>
            </div>)
            }
            
        </div>
    );
};

export default Instructors;