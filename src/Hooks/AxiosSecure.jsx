import axios from "axios";

const axiosInstanse = axios.create({
  baseURL: `https://assignment-12-server-ten-umber.vercel.app`,
});

const AxiosInctanse = () => {
  return axiosInstanse;
};

export default AxiosInctanse;
