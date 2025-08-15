import React from "react";
import img from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      {" "}
      <div className="flex items-end bg-secondary px-2 py-1 rounded-2xl">
        <img className="mb-2 w-8" src={img} alt="" />
        <div className="text-2xl -ml-3 font-medium text-yellow-400">
          ICE<span className="text-sky-200">GOLD</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
