import axios from "axios";

const axiosInstanse = axios.create({
  baseURL: `http://localhost:5000`,
});

const AxiosInctanse = () => {
  return axiosInstanse;
};

export default AxiosInctanse;
