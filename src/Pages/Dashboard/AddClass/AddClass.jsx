import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AddClass = () => {

    const { user } = useAuth();

    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const instructorName = form.instructorName.value;
        const email = form.email.value;
        const seats = form.seats.value;
        const price = form.price.value;
        const status = form.status.value;

        const classes = {
            class_Name: name,
            photo,
            instructorName,
            email,
            available_seats: seats,
            price,
            status
        }

        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(classes)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Class has been added',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
                form.reset();
            })
    }

    return (
        <div>
            <form onSubmit={handleAddClass} className=" my-12 shadow-2xl px-24 py-12 rounded-xl ">
                <h2 className="text-center mb-10 font-bold text-3xl">Add a <span className="text-[#0c4b65] text-4xl">Class</span></h2>
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
                        <input className="input input-bordered" type="text" name="instructorName" defaultValue={user?.displayName} />
                    </div>
                    <div>
                        <p className="font-mono">Instructor Email</p>
                        <input className="input input-bordered" type="email" name="email" defaultValue={user?.email} />
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
                    <input type="submit" className="btn text-white bg-[#c25934] font-serif text-lg rounded-3xl" value="Add Class" />
                </div>

            </form>
        </div>
    );
};

export default AddClass;