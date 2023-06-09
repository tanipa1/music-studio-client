import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
    const { data: users = [], /* refetch */ } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })

    return (
        <div>
            <div className="overflow-x-auto shadow-2xl p-12 mx-14 w-full">
                <h3 className="text-3xl text-center mb-12 font-semibold">Total Users:{users.length}</h3>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
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
                                <td>{user.role === 'admin' ? 'admin' :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn text-white border-0 bg-[#c25934] btn-xs">Make Admin</button>}</td>
                                <td><button onClick={() => handleMakeInstructor (user)} className="btn text-white border-0 bg-[#0c4b65] btn-xs">Make Instructor</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;