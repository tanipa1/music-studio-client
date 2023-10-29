import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from '../../assets/login.png';
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                icon: 'success',
                title: "you're successfully logged in",
                showConfirmButton: false,
                timer: 1500
            })
            navigate(from, { replace: true });
        })
        .catch(error => {
            console.log(error);
        })
    };

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