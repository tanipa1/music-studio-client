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
        <div className="overflow-x-auto w-full mt-5">
    <h2 className="text-center mb-6 font-bold text-xl lg:text-3xl">My Added Courses</h2>
    <div className="mb-4 overflow-x-auto">
        <table className="w-full table">
            {/* head */}
            <thead className="bg-[#c25934] text-white">
                <tr>
                    <th className="hidden lg:table-cell"></th>
                    <th>Class Name</th>
                    <th>Status</th>
                    <th className="hidden lg:table-cell">Enrolled Student</th>
                    <th>Feedback</th>
                    <th>Activity</th>
                </tr>
            </thead>
            <tbody>
                {classes.map((course, index) => (
                    <tr key={course._id} className="hover">
                        <td className="hidden lg:table-cell">{index + 1}</td>
                        <td>{course.class_Name}</td>
                        <td>{course.status}</td>
                        <td className="lg:text-center hidden lg:table-cell">{course.enroll}</td>
                        <td className="lg:text-justify">{course.feedback}</td>
                        <td className="lg:flex lg:items-center">
                            <Link _id={course._id} to={`/dashboard/update/${course._id}`} className="btn text-white btn-xs bg-[#0c4b65]">
                                Update
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default MyClasses;