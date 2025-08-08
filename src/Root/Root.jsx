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
import ManageUser from "../Pages/DashBoard/Admin/ManageUser/ManageUser";
import AdminProfile from "../Pages/DashBoard/Admin/AdminProfile/AdminProfile";
import ManageRoleRequests from "../Pages/DashBoard/Admin/ManageRoleRequests/ManageRoleRequests";
import ManageDonations from "../Pages/DashBoard/Admin/ManageDonations/ManageDonations";
import CharityProfile from "../Pages/DashBoard/Charity/CharityProfile/CharityProfile";
import TransactionHistory from "../Pages/DashBoard/Charity/TransactionHistory/TransactionHistory";
import MyPickups from "../Pages/DashBoard/Charity/MyPickups/MyPickups";
import ReceivedDonations from "../Pages/DashBoard/Charity/ReceivedDonations/ReceivedDonations";
import MyRequests from "../Pages/DashBoard/Charity/MyRequests/MyRequests";
import ManageRequests from "../Pages/DashBoard/Admin/ManageRequests/ManageRequests";
import DonationDetails from "../Pages/AllDonations/DonationDetails";
import Favorites from "../Pages/DashBoard/UserDashBoard/Favorites/Favorites";
import MyReviews from "../Pages/DashBoard/UserDashBoard/MyReviews/MyReviews";
import FeatureDonations from "../Pages/DashBoard/Admin/FeatureDonations/FeatureDonations";

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
        path: "donations/:id",
        Component: DonationDetails,
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
        path: "favorites",
        Component: Favorites,
      },
      {
        path: "myReviews",
        Component: MyReviews,
      },
      {
        path: "charityProfile",
        Component: CharityProfile,
      },
      {
        path: "manageUsers",
        Component: ManageUser,
      },
      {
        path: "TransactionHistory",
        Component: TransactionHistory,
      },
      {
        path: "receivedDonations",
        Component: ReceivedDonations,
      },
      {
        path: "myRequests",
        Component: MyRequests,
      },
      {
        path: "myPickups",
        Component: MyPickups,
      },
      {
        path: "manageRequests",
        Component: ManageRequests,
      },
      {
        path: "FeatureDonations",
        Component: FeatureDonations,
      },
      {
        path: "adminProfile",
        Component: AdminProfile,
      },
      {
        path: "manageRoleRequests",
        Component: ManageRoleRequests,
      },
      {
        path: "manageDonations",
        Component: ManageDonations,
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
