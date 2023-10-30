// import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useForm } from 'react-hook-form';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
    const { user } = useAuth();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => { 
        console.log(data);
    }
    console.log(errors);

    /* const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const instructorName = form.instructorName.value;
        const email = form.email.value;
        const seats = form.seats.value;
        const price = form.price.value;
        const status = form.status.value;
        const enroll = form.enroll.value;

        const classes = {
            class_Name: name,
            photo,
            instructorName,
            email,
            available_seats: seats,
            price,
            status,
            enroll
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
    } */

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className=" my-12 shadow-2xl px-24 py-12 rounded-xl ">
                <h2 className="text-center mb-10 font-bold text-3xl">Add a <span className="text-[#0c4b65] text-4xl">Class</span></h2>
                <div className="grid mb-5">
                    <div>
                        <p className="font-mono font-bold text-lg">Class Name</p>
                        <input className="input input-bordered w-full mb-5" type="text" {...register("class_Name", { required: true })} placeholder="Enter Class Name" />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Class Image</p>
                        <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full" />
                    </div>
                </div>
                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="font-mono font-bold text-lg">Instructor Name</p>
                        <input className="input input-bordered" type="text" {...register("instructorName", { required: true })} defaultValue={user?.displayName} />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Instructor Email</p>
                        <input className="input input-bordered" type="email" {...register("email", { required: true })} defaultValue={user?.email} />
                    </div>
                </div>
                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="font-mono font-bold text-lg">Available Seats</p>
                        <input className="input input-bordered" type="text" {...register("available_seats", { required: true })} placeholder="Available Seats" />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Price</p>
                        <input className="input input-bordered" type="text" {...register("price", { required: true })} placeholder="Price of the course" />
                    </div>
                </div>

                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="font-mono font-bold text-lg">Status of the Class</p>
                        <input className="input input-bordered" type="text" {...register("status", { required: true })}defaultValue="Pending" />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Enrolled Student</p>
                        <input className="input input-bordered" type="number" {...register("enroll", { required: true })}  />
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