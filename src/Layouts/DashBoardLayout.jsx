import React from "react";
import { NavLink, Outlet } from "react-router";
import useUserRole from "../Hooks/useUserRole";
import {
  FiHome,
  FiUser,
  FiClipboard,
  FiCreditCard,
  FiPlusSquare,
  FiList,
  FiInbox,
  FiCheckCircle,
  FiUserCheck,
  FiUsers,
  FiSettings,
  FiSend,
  FiUserPlus,
  FiBox,
} from "react-icons/fi";

const DashBoardLayout = () => {
  const { role, isLoading } = useUserRole();
  console.log(role, isLoading);

  const links = (
    <>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/"}
        >
          <FiHome className="inline mr-2" /> Home
        </NavLink>
      </li>

      {/* user */}
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/myProfile"}
        >
          <FiUser className="inline mr-2" /> My Profile
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/requestCharityRole"}
        >
          <FiUserPlus className="inline mr-2" /> Request Charity Role
        </NavLink>
      </li>
      <li className="text-secondary font-medium text-lg">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard/transactionHistory"}
        >
          <FiCreditCard className="inline mr-2" /> Transaction History
        </NavLink>
      </li>

      <p>Restaurant</p>
      {role && (
        <>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/restaurantProfile"}
            >
              <FiUser className="inline mr-2" /> Restaurant Profile
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/addDonation"}
            >
              <FiPlusSquare className="inline mr-2" /> Add Donation
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/myDonations"}
            >
              <FiList className="inline mr-2" /> My Donations
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/requestedDonations"}
            >
              <FiInbox className="inline mr-2" /> Requested Donations
            </NavLink>
          </li>
        </>
      )}

      <p>Charity</p>
      {role && (
        <>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/charityProfile"}
            >
              <FiUser className="inline mr-2" /> Charity Profile
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/myRequests"}
            >
              <FiSend className="inline mr-2" /> My Requests
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/myPickups"}
            >
              <FiBox className="inline mr-2" /> My Pickups
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/receivedDonations"}
            >
              <FiCheckCircle className="inline mr-2" /> Received Donations
            </NavLink>
          </li>
        </>
      )}

      <p>Admin</p>
      {role && (
        <>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/adminProfile"}
            >
              <FiUserCheck className="inline mr-2" /> Admin Profile
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/manageDonations"}
            >
              <FiClipboard className="inline mr-2" /> Manage Donations
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/manageUsers"}
            >
              <FiUsers className="inline mr-2" /> Manage Users
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/manageRoleRequests"}
            >
              <FiSettings className="inline mr-2" /> Manage Role Requests
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/manageRequests"}
            >
              <FiClipboard className="inline mr-2" /> Manage Requests
            </NavLink>
          </li>
          <li className="text-secondary font-medium text-lg">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/dashBoard/requestDonation"}
            >
              <FiSend className="inline mr-2" /> My Request for Donation
            </NavLink>
          </li>
        </>
      )}
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
