import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext) || {};

  const axiosSecure = axios.create({
    baseURL: "https://assignment-12-server-ten-umber.vercel.app",
  });

  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
