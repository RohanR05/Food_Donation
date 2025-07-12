import React from "react";
import { NavLink, Outlet } from "react-router";

const DashBoardLayout = () => {
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
      {/* User */}
     <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/myProfile"}
        >
         My Profile
        </NavLink>
      </li>
      {/* Restaurant */}

      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/restaurantProfile"}
        >
          Restaurant Profile
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/addDonation"}
        >
          Add Donation
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/myDonations"}
        >
          My Donations
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/requestedDonations"}
        >
          Requested Donations
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open max-w-screen-xl mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="navbar bg-primary w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">DashBoard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu text-base-content min-h-full w-80 p-4 bg-primary">
          {/* Sidebar content here */}
          {links}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
