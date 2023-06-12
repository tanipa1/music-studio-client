import { useQuery } from "@tanstack/react-query";
import InstructorSec from "./teacher/InstructorSec";
import { Zoom } from "react-awesome-reveal";

const PopularInstructor = () => {
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await fetch('https://music-studio-server.vercel.app/instructors')
        return res.json();
    })
    return (
        <div className="lg:mx-24 lg:pl-20 mx-10 mt-20 ">
            <div className="text-center font-bold mb-10">
                <p className="text-[#c25934] text-base lg:text-xl">Our Team</p>
                <h2 className="text-[#0c4b65] text-xl lg:text-3xl">Meet Our Popular Instructors</h2>
            </div>
            <Zoom>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        instructors.map(instructor => <InstructorSec
                            key={instructor._id}
                            instructor={instructor}
                        ></InstructorSec>)
                    }
                </div>
            </Zoom>

        </div>
    );
};

export default PopularInstructor;