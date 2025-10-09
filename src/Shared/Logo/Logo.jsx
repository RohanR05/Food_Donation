import React from "react";
import img from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      {" "}
      <div className="flex items-end px-2 py-1 rounded-2xl">
        <img className="mb-2 w-8" src={img} alt="" />
        <div className="text-2xl -ml-3 font-medium text-primary">
          ICE<span className="text-secondary">GOLD</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
