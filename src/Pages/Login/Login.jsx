import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import loginImg from '../../assets/login.png';

const Login = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="hero login-bg">
                <div className="hero-content mt-36 shadow-2xl bg- w-3/4 mx-auto my-14 px-20 py-8 flex-col lg:flex-row-reverse login-box">
                    <div className="text-center lg:text-left">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm">
                        <h1 className="text-5xl text-center font-bold">Login</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required*</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    /* pattern: /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-_+.]){1,}).$/ */
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                                {/* {errors.password?.type === 'pattern' && <p className='text-red-600'>Validate password using Uppercase, Lowercase, numbers & special characters</p>} */}
                                <label className="label">
                                    <span className="label-text"></span>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn bg-[#c25934] text-white login-btn" value="Login" />
                            </div>
                            <p className="text-center text-[#D1A054]">New here? <Link to='/register'>Create a New Account</Link></p>
                            {/* <SocialLogin></SocialLogin> */}
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Login;