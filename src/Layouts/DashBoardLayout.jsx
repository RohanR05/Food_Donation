import React from "react";
import { NavLink, Outlet } from "react-router";
import useUserRole from "../Hooks/useUserRole";
import Logo from "../Shared/Logo/Logo";
import {
  FiHome,
  FiUserPlus,
  FiHeart,
  FiMessageSquare,
  FiCreditCard,
  FiPlusSquare,
  FiList,
  FiInbox,
  FiSend,
  FiBox,
  FiCheckCircle,
  FiClipboard,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

const DashBoardLayout = () => {
  const { role } = useUserRole();

  const linkStyle =
    "flex items-center gap-3 text-lg font-medium px-3 py-2 rounded-xl bg-neutral transition-all duration-200";
  const inactiveStyle = "text-info hover:bg-accent hover:translate-x-1";
  const activeStyle =
    "bg-accent text-info border-l-4 border-secondary font-semibold";

  const links = (
    <>
      {/* Home */}

      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FiHome className="text-secondary text-xl" /> <span>Home</span>
        </NavLink>
      </li>

      {/* User Role */}
      {role === "user" && (
        <li>
          <NavLink
            to="/dashBoard/requestCharityRole"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FiUserPlus className="text-secondary text-xl" />{" "}
            <span>Request Charity Role</span>
          </NavLink>
        </li>
      )}

      {/* Non-admin features */}
      {role !== "admin" && (
        <>
          <li>
            <NavLink
              to="/dashBoard/favorites"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiHeart className="text-secondary text-xl" />{" "}
              <span>Favorites</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/myReviews"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiMessageSquare className="text-secondary text-xl" />{" "}
              <span>My Reviews</span>
            </NavLink>
          </li>
        </>
      )}

      {/* Transaction History */}
      <li>
        <NavLink
          to="/dashBoard/transactionHistory"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FiCreditCard className="text-secondary text-xl" />{" "}
          <span>Transaction History</span>
        </NavLink>
      </li>

      {/* Restaurant Role */}
      {role === "restaurant" && (
        <>
          <li>
            <NavLink
              to="/dashBoard/addDonation"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiPlusSquare className="text-secondary text-xl" />{" "}
              <span>Add Donation</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/myDonations"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiList className="text-secondary text-xl" />{" "}
              <span>My Donations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/requestedDonations"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiInbox className="text-secondary text-xl" />{" "}
              <span>Requested Donations</span>
            </NavLink>
          </li>
        </>
      )}

      {/* Charity Role */}
      {role === "charity" && (
        <>
          <li>
            <NavLink
              to="/dashBoard/myRequests"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiSend className="text-secondary text-xl" />{" "}
              <span>My Requests</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/myPickups"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiBox className="text-secondary text-xl" />{" "}
              <span>My Pickups</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/receivedDonations"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiCheckCircle className="text-secondary text-xl" />{" "}
              <span>Received Donations</span>
            </NavLink>
          </li>
        </>
      )}

      {/* Admin Role */}
      {role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashBoard/manageDonations"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiClipboard className="text-secondary text-xl" />{" "}
              <span>Manage Donations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/manageUsers"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiUsers className="text-secondary text-xl" />{" "}
              <span>Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/manageRoleRequests"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiSettings className="text-secondary text-xl" />{" "}
              <span>Manage Role Requests</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/manageRequests"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiClipboard className="text-secondary text-xl" />{" "}
              <span>Manage Requests</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/featureDonations"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiClipboard className="text-secondary text-xl" />{" "}
              <span>Feature Donations</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open max-w-screen-xl mx-auto bg-neutral transition-all duration-300">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Drawer content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for small screens */}
        <div className="navbar bg-secondary/40 backdrop-blur-md shadow-md lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-current"
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
     
            <Logo></Logo>
         
          <h2 className="text-xl font-semibold text-info ml-2">Dashboard</h2>
        </div>

        {/* Main content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-6 w-80 min-h-full bg-secondary/40  backdrop-blur-lg shadow-lg border-r border-accent">
          <h2 className="text-2xl font-bold mb-6 text-info text-center">
            Dashboard Menu
          </h2>
          <div className="space-y-2">{links}</div>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
