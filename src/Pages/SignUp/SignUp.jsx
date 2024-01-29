import { useForm } from "react-hook-form";
import signUpImg from '../../assets/signUp.jpg';
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const SignUp = () => {
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.photoURL[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    createUser(data.email, data.password)
                    .then(result =>{
                        const loggedUser = result.user;
                        console.log(loggedUser);
                        updateUserProfile(data.name, imgURL)
                        .then(() =>{
                            const saveUser = {name: data.name, email: data.email, photo: imgURL}
                            fetch('http://localhost:5000/users',{
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(saveUser)
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.insertedId){
                                    Swal.fire({
                                        icon: 'success',
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })               
                        })               
                    })
                    .catch(error =>{
                        console.log(error);
                    })
                }
            })
        
    }

    const password = watch("password");

    return (
        <div className="hero login-bg">
            <div className="hero-content lg:mt-36 mt-20 shadow-2xl lg:w-3/4 mx-auto my-14 lg:px-20 py-8 flex-col lg:flex-row login-box">
                <div className="text-center hidden lg:flex lg:text-left">
                    <img src={signUpImg} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm">
                    <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>Name is required*</span>}
                        </div>
                        {/* Photo */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload your photo</span>
                            </label>
                            <input type="file" {...register("photoURL", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                            {errors.photoURL && <span className='text-red-600'>Photo is required*</span>}
                        </div>
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className='text-red-600'>Email is required*</span>}
                        </div>
                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ // Password pattern with at least one capital letter and one special character
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-600'>Password length is less than 6</p>}
                            {errors.password && errors.password.type === "pattern" && (
                                <span className="text-red-600">Password must have at least one capital letter and one special character</span>
                            )}
                            <label className="label">
                                <span className="label-text"></span>
                            </label>
                        </div>
                        {/* confirm password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => value === password // Check if the value matches the password field
                                })} placeholder="confirm 
                                
                                password" className="input input-bordered"
                            />
                            {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                                <span>Confirm Password is required</span>
                            )}
                            {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                                <span>Passwords must match</span>
                            )}
                        </div>

                        <div className="form-control mt-6">
                            <input type="submit" className="btn bg-[#c25934] text-white login-btn" value="Sign Up" />
                        </div>
                        <p className="text-center text-[#0c4b65]">Already have an account? <Link to='/login' className="text-[#c25934] underline">Login</Link></p>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;