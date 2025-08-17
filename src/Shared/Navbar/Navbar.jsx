import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        })
      )
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
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/allDonations"}
        >
          All Donations
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard"}
        >
          Dashboard
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/aboutDeveloper"}
        >
          About Developer
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/comingSoon"}
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg w-full ">
        <div className="navbar mx-auto">
          <div className="navbar-start">
            {/* Mobile menu */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 absolute z-50"
              >
                {links}
              </ul>
            </div>
            <Logo />
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>

          <div className="navbar-end">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline text-secondary"
                >
                  Log Out
                </button>
                <img
                  className="w-12 h-12 rounded-2xl hidden md:block"
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
              </div>
            ) : (
              <Link className="btn btn-primary text-white" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Add top padding to prevent content from being hidden behind navbar */}
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
