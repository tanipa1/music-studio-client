// import Swal from "sweetalert2";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useForm } from 'react-hook-form';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
    const { user } = useAuth();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
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

                    const classes = { class_Name, photo: imgURL, instructorName, email, price: parseFloat(price), available_seats: parseFloat(available_seats), enroll: parseFloat(enroll), status }

                    fetch('http://localhost:5000/classes', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(classes)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Course has been shared',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                                reset();
                            }
                        })
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:my-12 shadow-2xl lg:px-24 px-8 py-12 rounded-xl ">
                <h2 className="text-center mb-10 font-bold text-3xl">Add a <span className="text-[#0c4b65] text-4xl">Course</span></h2>
                <div className="grid mb-5">
                    <div >
                        <p className="font-mono font-bold text-lg">Course Name</p>
                        <input className="input input-bordered w-full mb-5" type="text" {...register("class_Name", { required: true })} placeholder="Enter Class Name" />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Course Image</p>
                        <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full" />
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 w-full gap-6 mb-6 ">
                    <div className="">
                        <p className="font-mono font-bold text-lg">Instructor Name</p>
                        <input className="input w-full input-bordered" type="text" {...register("instructorName", { required: true })} defaultValue={user?.displayName} />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Instructor Email</p>
                        <input className="input w-full input-bordered" type="email" {...register("email", { required: true })} defaultValue={user?.email} />
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 w-full gap-6 mb-6">
                    <div>
                        <p className="font-mono font-bold text-lg">Available Seats</p>
                        <input className="input w-full input-bordered" type="text" {...register("available_seats", { required: true })} placeholder="Available Seats" />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Price</p>
                        <input className="input w-full input-bordered" type="text" {...register("price", { required: true })} placeholder="Price of the course" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 w-full gap-6 mb-6">
                    <div>
                        <p className="font-mono font-bold text-lg">Status of the Class</p>
                        <input className="input w-full input-bordered" type="text" {...register("status", { required: true })}defaultValue="Pending" />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-lg">Enrolled Student</p>
                        <input className="input w-full input-bordered" type="number" {...register("enroll", { required: true })}  />
                    </div>
                </div>

                <div className="form-control w-1/2 mt-6 mx-auto">
                    <input type="submit" className="btn text-white bg-[#c25934] font-serif text-lg rounded-3xl" value="Add Course" />
                </div>

            </form>
        </div>
    );
};

export default AddClass;