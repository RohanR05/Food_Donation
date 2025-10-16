import { useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";
import AxiosInctanse from "../../../Hooks/AxiosSecure";
import Logo from "../../../Shared/Logo/Logo";
import Lottie from "lottie-react";
import animation from "../../../assets/LoginSuccess.json";

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosInstance = AxiosInctanse();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [profileImage, setProfileImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    setImageUploading(true);

    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_KEY
      }`;
      const res = await axios.post(imageUploadUrl, formData);
      setProfileImage(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed", err);
      Swal.fire("Image Upload Failed", "Try again", "error");
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = (data) => {
    if (imageUploading) {
      return Swal.fire(
        "Please wait",
        "Profile image is uploading...",
        "info"
      );
    }

    if (!profileImage) {
      return Swal.fire(
        "Image Missing",
        "Please upload a profile picture.",
        "warning"
      );
    }

    createUser(data.email, data.password)
      .then(async () => {
        const userProfile = {
          displayName: data.name,
          photoURL: profileImage,
        };

        await updateUserProfile(userProfile);

        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        await axiosInstance.post("/users", userInfo);

        setIsSuccess(true); // show success animation

        Swal.fire({
          title: "Registration Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate(from);
        }, 1600);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Registration Failed", error.message, "error");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card w-full max-w-sm shrink-0">
        <div className="w-36 mx-auto mt-4">
          <Logo />
        </div>

        {/* Success Animation */}
        {isSuccess && (
          <div className="flex justify-center my-4">
            <Lottie
              animationData={animation}
              loop={false}
              autoplay
              className="w-48 h-48"
            />
          </div>
        )}

        {/* Registration Form */}
        {!isSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <fieldset className="space-y-4">
              <h1 className="text-4xl font-bold text-primary">
                Registration now!
              </h1>

              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500">Name is required</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">Profile Picture</label>
                <input
                  type="file"
                  className="input input-bordered"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered"
                  placeholder="Password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <button className="btn btn-primary w-full mt-4 text-black">
                Register
              </button>

              <p className="mt-2 text-center text-base-content">
                Already have an account?
                <Link
                  to="/logIn"
                  className="btn-link text-secondary ml-2"
                >
                  Login
                </Link>
              </p>

              <SocialLogin />
            </fieldset>
          </form>
        )}
      </div>
    </div>
  );
};

export default Registration;
