import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyClasses = () => {
    const { user } = useAuth();

    const [axiosSecure] = useAxiosSecure();

    const { data: classes = [], } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get(`/classes?email=${user.email}`)
        return res.data;
    })

    return (
        <div className="overflow-x-auto w-3/4">
            <h2 className="text-center mb-10 font-bold text-3xl">My Classes Details</h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Class Name</th>
                        <th>Status</th>
                        <th>Enrolled Student</th>
                        <th>Feedback</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map((course, index) => <tr
                            key={course._id}
                            className="hover">
                            <th>{index + 1}</th>
                            <td>{course.class_Name}</td>
                            <td>{course.status}</td> 
                            <td className="text-end">{course.enroll}</td>
                            <td className="text-justify">{course.feedback}</td> 
                            <Link _id={course._id} to={`/dashboard/update/${course._id}`}><button className="grid items-center justify-center btn text-white btn-xs bg-[#0c4b65]">Update</button> </Link>
                            
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyClasses;