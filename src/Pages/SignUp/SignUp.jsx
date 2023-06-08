import { useForm } from "react-hook-form";
import signUpImg from '../../assets/signUp.jpg';
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { Link } from "react-router-dom";

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => console.log(data);

    const password = watch("password");

    return (
        <div className="hero login-bg">
            <div className="hero-content mt-36 shadow-2xl bg- w-3/4 mx-auto my-14 px-20 py-8 flex-col lg:flex-row login-box">
                <div className="text-center lg:text-left">
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
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className='text-red-600'>Photo URL is required*</span>}
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
                        <p className="text-center text-[#0c4b65]">Already have an account? <Link to='/login'>Login</Link></p>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;