import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayut from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";
import UnAuthorized from "../Pages/UnAuthorized/UnAuthorized";
import ComingSoon from "../Pages/ComingSoon/ComingSoon";
import AllDonations from "../Pages/AllDonations/AllDonations";
import DashBoard from "../Pages/DashBoard/DashBoard";
import PrivetRoutes from "../Pages/Authentication/PrivetRoute/PrivetRoute";

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
    path: "dashBoard",
    Component: DashBoard,
  },
]);
