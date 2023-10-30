import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import { useForm } from 'react-hook-form';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const UpdateClass = () => {
    const classes = useLoaderData();
    const { user } = useAuth();
    console.log(classes._id);

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);

        const formData = new FormData();
        formData.append('image', data.photo[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { class_Name, instructorName, email, price, available_seats, enroll, status } = data;

                    const updateClass = { class_Name, photo: imgURL, price, available_seats, status }

                    console.log(updateClass);

                    fetch(`http://localhost:5000/classes/${classes._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateClass)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Recipe has been updated',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                            }
                        })
                }
            })
    }

    /* const handleUpdateClass = event =>{
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
    } */
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className=" my-12 shadow-2xl px-24 py-12 rounded-xl ">
                <h2 className="text-center mb-10 font-bold text-3xl">Update the <span className="text-[#0c4b65] text-4xl">Class</span></h2>
                <div className="grid mb-5">
                    <div>
                        <p className="font-mono font-bold text-lg">Class Name</p>
                        <input className="input input-bordered w-full mb-5" type="text" defaultValue={classes.class_Name} {...register("class_Name", { required: true })} placeholder="Enter Class Name" />
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
                        <input className="input input-bordered" type="text" {...register("status", { required: true })} defaultValue="Pending" />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Enrolled Student</p>
                        <input className="input input-bordered" type="number" {...register("enroll", { required: true })} />
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