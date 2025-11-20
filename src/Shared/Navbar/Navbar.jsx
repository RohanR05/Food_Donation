import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaHome, FaHandsHelping, FaUserShield, FaInfoCircle } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import Theme from "../Theme/Theme";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    setDropdownOpen(false); // Close dropdown after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 text-lg font-medium transition-all duration-300 ${
      isActive ? "underline" : ""
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          <FaHome className="text-secondary text-xl" />
          <span className="text-primary">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/allDonations" className={linkClass}>
          <FaHandsHelping className="text-secondary text-xl" />
          <span className="text-primary">All Donations</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashBoard" className={linkClass}>
          <FaUserShield className="text-secondary text-xl" />
          <span className="text-primary">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/comingSoon" className={linkClass}>
          <FaInfoCircle className="text-secondary text-xl" />
          <span className="text-primary">About Us</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md shadow-md bg-neutral/30 shadow-secondary/20">
        <div className="navbar mx-auto px-4">
          {/* Left */}
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm btn-ghost btn-secondary lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-56 absolute z-50"
              >
                {links}
              </ul>
            </div>
            <Logo />
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex items-center gap-2">{links}</ul>
          </div>

          {/* Right */}
          <div className="navbar-end flex items-center gap-3 relative">
            <Theme />

            {user ? (
              <div className="relative border-l pl-3 border-secondary">
                {/* Profile Picture */}
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
                  onClick={toggleDropdown}
                />

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-base-100 shadow-md rounded-md p-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                className="btn bg-primary btn-sm md:btn-lg text-white hover:bg-secondary hover:text-white"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Offset for fixed navbar */}
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
