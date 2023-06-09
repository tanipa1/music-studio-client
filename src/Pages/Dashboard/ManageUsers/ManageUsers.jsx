import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
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

    return (
        <div>
            <div className="overflow-x-auto shadow-2xl p-12 mx-14 w-full">
                <h3 className="animate__animated animate__bounce text-3xl text-center mb-12 font-semibold">Total Users:{users.length}</h3>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="flex justify-center">Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr
                                key={user._id}
                                className="hover">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="flex justify-center">{user.role === 'admin' ? <><button className="btn w-1/2  mx-auto text-white border-0 bg-[#c25934] btn-xs"><FaUserShield /></button></> :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn text-white border-0 bg-[#c25934] btn-xs">Make Admin</button>}</td>
                                <td><button /* onClick={() => handleMakeInstructor(user)} */ className="btn text-white border-0 bg-[#0c4b65] btn-xs">Make Instructor</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;