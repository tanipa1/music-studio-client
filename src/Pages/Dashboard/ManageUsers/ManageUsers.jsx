import { useQuery } from "@tanstack/react-query";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import 'animate.css';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleMakeInstructor = user => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure want delete the account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                `User account has been removed.`,
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full px-4">
            <div className="overflow-x-auto">
                <h3 className="animate__animated animate__bounce text-2xl text-center mb-6 font-semibold">Total Users: {users.length}</h3>
                <table className="w-full table">
                    <thead>
                        <tr>
                            <th className="hidden lg:flex">Name</th>
                            <th>Email</th>
                            <th className="flex justify-end">Role</th>
                            <th ></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover">
                                
                                <td className="hidden lg:flex">{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <button className="btn w-1/2 mx-auto lg:mx-0 text-white border-0 bg-[#c25934] btn-xs">
                                            <FaUserShield />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleMakeAdmin(user)} className="btn text-white border-0 bg-[#c25934] btn-xs">
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td >
                                    {user.role === 'instructor' ? (
                                        <button className="btn w-1/2 mx-auto lg:mx-0 text-white border-0 bg-[#0c4b65] btn-xs">
                                            <FaChalkboardTeacher />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleMakeInstructor(user)} className="btn text-white border-0 bg-[#0c4b65] btn-xs">
                                            Make Instructor
                                        </button>
                                    )}
                                    
                                </td>
                                <td>
                                {user.role !== 'admin' && (
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-xs ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" /></svg>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;