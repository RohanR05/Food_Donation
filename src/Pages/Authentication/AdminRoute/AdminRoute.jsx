import React, { use } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../../Shared/Loading/Loadign";
import { Navigate } from "react-router";

const AdminRoute = () => {
  const { user, loading } = use(AuthContext);
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  if (!user || role !== "admin") {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return <div></div>;
};

export default AdminRoute;