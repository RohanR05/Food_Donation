import { useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import AxiosInctanse from "../../../Hooks/AxiosSecure";
import Lottie from "lottie-react";
import animation from "../../../assets/LoginSuccess.json";

const SocialLogin = () => {
  const { googleUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = AxiosInctanse();

  const [isSuccess, setIsSuccess] = useState(false);

  const handleGoogleUser = () => {
    googleUser()
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        await axiosInstance.post("/users", userInfo);

        // Show success animation
        setIsSuccess(true);

        // Navigate after short delay
        setTimeout(() => {
          navigate(from);
        }, 1600);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-4">
      {isSuccess ? (
        <div className="flex justify-center my-4">
          <Lottie
            animationData={animation}
            loop={false}
            autoplay
            className="w-48 h-48"
          />
        </div>
      ) : (
        <>
          <p className="text-center text-base-content">Or</p>
          <button
            type="button"
            onClick={handleGoogleUser}
            className="btn w-full mt-3 bg-white text-black border-[#e5e5e5] flex items-center justify-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="M0 0h512v512H0" fill="#fff" />
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                />
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                />
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                />
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                />
              </g>
            </svg>
            Login with Google
          </button>
        </>
      )}
    </div>
  );
};

export default SocialLogin;
