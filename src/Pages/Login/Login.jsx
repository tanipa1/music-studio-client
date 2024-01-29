import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from '../../assets/login.png';
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    if (loading) {
        return <p className="p-36 flex"><span className="text-xl font-bold">Loading </span><span className="loading loading-dots loading-lg"></span></p>
    }

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="hero login-bg">
            <div className="hero-content grid grid-cols-1 lg:grid-cols-2 lg:mt-36 mt-20 shadow-2xl lg:w-3/4 w-full mx-auto lg:my-14 lg:px-20 lg:py-8 flex-col lg:flex-row-reverse login-box">
                <div className="text-center hidden lg:flex lg:text-left">
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
                            })} name="password" placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn bg-[#c25934] text-white login-btn" value="Login" />
                        </div>
                        <p className="text-center text-[#0c4b65]">New here? <Link to='/signUp' className="text-[#c25934] underline">Create a New Account</Link></p>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;