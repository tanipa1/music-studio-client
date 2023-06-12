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
        <div>
            <h2 className="text-center mb-10 font-bold text-3xl">Total Selected Class: {selectedClass.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#c25934] text-white">
                        <tr>
                            <th></th>
                            <th>Course</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th className="text-center">Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClass.map((classes, index) => <tr key={classes._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={classes.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{classes.selectClassName}</div>
                                            <div className="text-sm opacity-50">Seats: {classes.available_seats}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {classes.instructorName}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{classes.instructorEmail}</span>
                                </td>
                                <td>${classes.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(classes)} className="btn text-[red] btn-ghost btn-lg"><FaTrashAlt /></button>
                                </th>
                                <th>
                                    <Link to="/dashboard/payment"><button className="btn text-[#0c4b65] btn-ghost btn-lg"><FaMoneyCheckAlt /> Pay</button></Link>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClass;