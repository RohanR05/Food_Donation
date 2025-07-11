import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../Contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/"}
        >
          Home
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary shadow-sm m-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <img
              className="w-12 h-12 rounded-2xl hover:opacity-100 cursor-pointer peer"
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <div className="absolute right-0 top-14 bg-white dark:bg-cyan-700 text-black dark:text-white shadow-lg rounded-lg p-2 opacity-0 peer-hover:opacity-100 hover:opacity-100 transition-opacity z-10 min-w-[200px] pointer-events-none peer-hover:pointer-events-auto hover:pointer-events-auto">
              <p className="text-md font-semibold mb-2">
                Name: {user?.displayName || "User"}
              </p>
              <p className="text-md font-semibold mb-2">
                Email: {user?.email || "user"}
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-md hover:bg-[#f3f3e0] hover:text-red-500 w-full"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
