import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayut from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";
import UnAuthorized from "../Pages/UnAuthorized/UnAuthorized";
import ComingSoon from "../Pages/ComingSoon/ComingSoon";

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
]);
