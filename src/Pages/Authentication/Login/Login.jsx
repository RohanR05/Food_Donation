// import React, { use } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router";
// import SocialLogin from "../SocialLogin/SocialLogin";
// import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

import { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              {...register("email")}
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              {...register("password", {
                required: true,
                minLength: 5,
              })}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password id required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be atleast 6 Charecters
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn btn-primary text-black mt-4">Login</button>
            <p>
              Don't have an acoount?
              <Link to="/registration" className="btn-link text-secondary ml-3">
                Register
              </Link>
            </p>
          </fieldset>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Login;
