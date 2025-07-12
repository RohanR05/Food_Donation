import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayut from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";
import UnAuthorized from "../Pages/UnAuthorized/UnAuthorized";
import ComingSoon from "../Pages/ComingSoon/ComingSoon";
import AllDonations from "../Pages/AllDonations/AllDonations";
import PrivetRoutes from "../Pages/Authentication/PrivetRoute/PrivetRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import DashBoard from "../Pages/DashBoard/DashBoard";
import RestaurantProfile from "../Pages/DashBoard/RestaurantDashBoard/RestaurantProfile/RestaurantProfile";
import AddDonation from "../Pages/DashBoard/RestaurantDashBoard/AddDonation/AddDonation";
import MyDonations from "../Pages/DashBoard/RestaurantDashBoard/MyDonations/MyDonations";
import RequestedDonations from "../Pages/DashBoard/RestaurantDashBoard/RequestedDonations/RequestedDonations";
import MyProfile from "../Pages/DashBoard/UserDashBoard/MyProfile/MyProfile";
import RequestCharityRole from "../Pages/DashBoard/UserDashBoard/RequestCharityRole/RequestCharityRole";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allDonations",
        element: (
          <PrivetRoutes>
            <AllDonations></AllDonations>
          </PrivetRoutes>
        ),
      },
      {
        path: "unAuthorized",
        Component: UnAuthorized,
      },
      {
        path: "comingSoon",
        Component: ComingSoon,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayut,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registration",
        Component: Registration,
      },
    ],
  },
  {
    path: "/dashBoard",
    Component: DashBoardLayout,
    children: [
      {
        index: true,
        Component: DashBoard,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "requestCharityRole",
        Component: RequestCharityRole,
      },
      {
        path: "restaurantProfile",
        Component: RestaurantProfile,
      },
      {
        path: "addDonation",
        Component: AddDonation,
      },
      {
        path: "myDonations",
        Component: MyDonations,
      },
      {
        path: "requestedDonations",
        Component: RequestedDonations,
      },
    ],
  },
]);
