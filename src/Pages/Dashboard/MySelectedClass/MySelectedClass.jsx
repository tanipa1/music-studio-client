import { FaMoneyCheckAlt, FaTrashAlt } from "react-icons/fa";
import useSelectedClasses from "../../../hooks/useSelectedClasses";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MySelectedClass = () => {
    const [selectedClass, refetch] = useSelectedClasses();

    const handleDelete = classes => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selectedClasses/${classes._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }


    return (
        <div className="mx-4">
            <h2 className="text-center my-6 font-bold text-xl lg:text-3xl">Total Selected Class: {selectedClass.length}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    {/* head */}
                    <thead className="bg-[#c25934] text-white">
                        <tr>
                            <th className="hidden lg:table-cell"></th>
                            <th className="lg:pl-2 lg:pr-4">Course</th>
                            <th className="hidden lg:table-cell">Instructor</th>
                            <th className="lg:pl-4 lg:pr-2">Price</th>
                            <th className="text-center lg:pl-2 lg:pr-4">Action</th>
                            <th className="hidden lg:table-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClass.map((classes, index) => (
                            <tr key={classes._id} className="border-t lg:border-t-0">
                                <td className="hidden lg:table-cell">{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-2 lg:space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8 lg:w-12 lg:h-12">
                                                <img src={classes.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm lg:text-base">{classes.selectClassName}</div>
                                            <div className="text-xs lg:text-sm opacity-50">Seats: {classes.available_seats}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden lg:table-cell">
                                    {classes.instructorName}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{classes.instructorEmail}</span>
                                </td>
                                <td className="lg:pl-4 lg:pr-2">${classes.price}</td>
                                <td className="text-center lg:pl-2 lg:pr-4">
                                    <button onClick={() => handleDelete(classes)} className="btn text-[red] btn-ghost btn-sm lg:btn-lg"><FaTrashAlt /></button>
                                </td>
                                <td className="hidden lg:table-cell">
                                    {classes.type ? <p className="text-[#c25934] font-bold uppercase">Already Paid</p> :
                                        <Link to={`/dashboard/payment/${classes._id}`}>
                                            <button className="btn text-[#0c4b65] btn-ghost btn-sm lg:btn-lg"><FaMoneyCheckAlt /> Pay</button>
                                        </Link>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MySelectedClass;