import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import Logo from "../../../Shared/Logo/Logo";
import Lottie from "lottie-react";
import animation from "../../../assets/LoginSuccess.json";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        setIsSuccess(true); // show animation

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate(from);
        }, 1600); // navigate after animation
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card w-full max-w-sm shrink-0">
        <div className="card-body">
          <div className="w-36 mb-4">
            <Logo />
          </div>

          {/* Success Animation */}
          {isSuccess && (
            <div className="flex justify-center mb-4">
              <Lottie
                animationData={animation}
                loop={false}
                autoplay
                className="w-48 h-48"
              />
            </div>
          )}

          {/* Login Form */}
          {!isSuccess && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="space-y-4">
                <h1 className="text-4xl font-bold text-primary">Login now!</h1>

                <div className="form-control">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-600">Email is required</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input input-bordered"
                    {...register("password", { required: true, minLength: 6 })}
                    placeholder="Password"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500">
                      Password must be at least 6 characters
                    </p>
                  )}
                </div>

                <button className="btn btn-primary w-full mt-4">
                  Login
                </button>

                <p className="mt-2 text-center text-base-content">
                  Don't have an account?
                  <Link
                    to="/registration"
                    className="btn-link text-secondary ml-2"
                  >
                    Register
                  </Link>
                </p>

                <SocialLogin />
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
