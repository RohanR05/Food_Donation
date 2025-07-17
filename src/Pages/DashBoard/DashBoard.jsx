import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import Loading from "../../Shared/Loading/Loadign";
import UserHome from "./Home/UserHome/UserHome";
import AdminHome from "./Home/AdminHome/AdminHome";
import RestaurantHome from "./Home/RestaurantHome/RestaurantHome";
import CharityHome from "./Home/CharityHome/CharityHome";
import UnAuthorized from "../UnAuthorized/UnAuthorized";

const DashBoard = () => {
  const { role, isloading } = useUserRole();

  if (isloading) {
    return <Loading></Loading>;
  }

  if (role === "user") {
    return <UserHome></UserHome>;
  } else if (role === "admin") {
    return <AdminHome></AdminHome>;
  } else if (role === "restaurant") {
    return <RestaurantHome></RestaurantHome>;
  } else if (role === "charity") {
    return <CharityHome></CharityHome>;
  } else {
    return <UnAuthorized></UnAuthorized>;
  }
};

export default DashBoard;
