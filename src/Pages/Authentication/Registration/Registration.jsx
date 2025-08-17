import { use, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";
import AxiosInctanse from "../../../Hooks/AxiosSecure";
import Logo from "../../../Shared/Logo/Logo";

const Registration = () => {
  const { createUser, updateUserProfile } = use(AuthContext);
  const axiosInstance = AxiosInctanse();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [profileImage, setProfileImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    setImageUploading(true); // start uploading
    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_KEY
      }`;
      const res = await axios.post(imageUploadUrl, formData);
      setProfileImage(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setImageUploading(false); // finished uploading
    }
  };

  const onSubmit = (data) => {
    if (imageUploading) {
      return Swal.fire("Please wait", "Profile image is uploading...", "info");
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

        // ✅ Show SweetAlert success message
        await Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to our platform.",
          icon: "success",
          confirmButtonText: "Go to Home",
        });

        navigate(from);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Registration Failed", error.message, "error");
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 mx-auto shadow-2xl">
       <div className="w-36">
          <Logo></Logo>
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <fieldset className="fieldset">
          <h1 className="text-5xl font-bold">Regisgration now!</h1>

          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          <label className="label">Profile</label>
          <input
            type="file"
            className="input"
            placeholder="Your Profile Picture"
            onChange={handleImageUpload}
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register("password", { required: true, minLength: 5 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be atleast 6 Charecters
            </p>
          )}
          <button className="btn bg-primary mt-4">Registration</button>
          <p>
            Already have an acoount?
            <Link to="/logIn" className="btn-link text-secondary ml-3">
              {" "}
              Login
            </Link>
          </p>
        </fieldset>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Registration;
