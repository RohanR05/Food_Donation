import { ClipLoader } from "react-spinners";

const Loading = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px]">
    <ClipLoader color="#00458b" size={80} />
    <p className="mt-4 text-[#00458b] text-lg font-medium">{message}</p>
  </div>
);

export default Loading;
