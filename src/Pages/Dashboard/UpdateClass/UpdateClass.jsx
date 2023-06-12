import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";

const UpdateClass = () => {
    const classes = useLoaderData();
    const { user } = useAuth();
    console.log(classes._id);

    const handleUpdateClass = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const seats = form.seats.value;
        const price = form.price.value;

        const updateClass = {price, name, photo, seats}

        fetch(`http://localhost:5000/classes/${classes._id}`, {
            method:'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(updateClass)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'Success!',
                    text: 'Class updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })

                  form.reset();
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleUpdateClass} className=" my-12 shadow-2xl px-24 py-12 rounded-xl ">
                <h2 className="text-center mb-10 font-bold text-3xl">Update the <span className="text-[#0c4b65] text-4xl">Class</span></h2>
                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="font-mono">Class Name</p>
                        <input className="input input-bordered" type="text" name="name" placeholder="Enter Class Name" />
                    </div>
                    <div>
                        <p className="font-mono">Photo URL</p>
                        <input className="input input-bordered" type="text" name="photo" placeholder="Class Photo" />
                    </div>
                </div>
                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="font-mono">Instructor Name</p>
                        <input className="input input-bordered" type="text" name="instructorName" disabled defaultValue={user?.displayName} />
                    </div>
                    <div>
                        <p className="font-mono">Instructor Email</p>
                        <input className="input input-bordered" type="email" name="email" disabled defaultValue={user?.email} />
                    </div>
                </div>
                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="font-mono">Available Seats</p>
                        <input className="input input-bordered" type="text" name="seats" placeholder="Available Seats" />
                    </div>
                    <div>
                        <p className="font-mono">Price</p>
                        <input className="input input-bordered" type="text" name="price" placeholder="Price of the course" />
                    </div>
                </div>

                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="font-mono">Status of the Class</p>
                        <input className="input input-bordered" type="text" name="status" disabled defaultValue="Pending" />
                    </div>
                    <div>
                        <p className="font-mono">Enrolled Student</p>
                        <input className="input input-bordered" type="number" name="enroll" defaultValue="0" />
                    </div>
                </div>

                <div className="form-control w-1/2 mt-6 mx-auto">
                    <input type="submit" className="btn text-white bg-[#c25934] font-serif text-lg rounded-3xl" value="Update Class" />
                </div>

            </form>
        </div>
    );
};

export default UpdateClass;