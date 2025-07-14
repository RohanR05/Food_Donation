import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});

const useAxiosSecure = () => {
//   const { user } = useContext(AuthContext);

// axiosSecure.interceptors.request.use(
//   (config) => {
//     if (user?.accessToken) {
//       config.headers.Authorization = `Bearer ${user.accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

  return axiosSecure;
};

export default useAxiosSecure;
