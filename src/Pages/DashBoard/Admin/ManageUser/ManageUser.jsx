import React, { useContext } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading2 from "../../../../Shared/Loading/Loading2";

// Font Awesome Icons
import {
  FaUserShield,
  FaUtensils,
  FaHandsHelping,
  FaTrash,
  FaEnvelope,
  FaUser,
  FaIdBadge,
  FaSpinner,
} from "react-icons/fa";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `User role updated to ${newRole}`, "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the user permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been removed", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  if (isLoading) {
    return <Loading2></Loading2>;
  }

  return (
    <div className="mx-auto px-2 md:mt-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-secondary">
        Manage Users
      </h2>

      {/* Table for md+ devices */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg bg-primary/10 border border-secondary/20">
        <table className="table w-full text-sm">
          <thead className="bg-accent text-primary uppercase text-xs">
            <tr>
              <th className="py-4 px-6">Name</th>
              {/* <th>Email</th> */}
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <motion.tr
                key={u._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-primary/20 border-t border-secondary/20"
              >
                <td className="py-3 px-6 flex items-center gap-2">
                  <FaUser className="text-secondary" /> {u.name || "N/A"}
                </td>
                <td className="flex items-center gap-2">
                  <FaEnvelope className="text-secondary" /> {u.email}
                </td>
                <td>
                  <span className="capitalize px-3 py-1 rounded-full text-xs font-medium bg-secondary text-black">
                    {u.role || "user"}
                  </span>
                </td>
                <td className="flex gap-2 flex-wrap justify-center items-center py-3">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "admin")}
                      className="btn btn-xs bg-secondary/20 text-primary flex items-center gap-1"
                    >
                      <FaUserShield /> Admin
                    </button>
                  )}
                  {u.role !== "restaurant" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "restaurant")}
                      className="btn btn-xs bg-green-600 text-white flex items-center gap-1"
                    >
                      <FaUtensils /> Restaurant
                    </button>
                  )}
                  {u.role !== "charity" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "charity")}
                      className="btn btn-xs bg-primary/20 text-secondary flex items-center gap-1"
                    >
                      <FaHandsHelping /> Charity
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="btn btn-xs bg-red-500 text-white flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {!users.length && !isLoading && (
          <div className="text-center py-10 text-primary text-sm">
            No users found.
          </div>
        )}
      </div>

      {/* Card layout for small devices */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((u, i) => (
          <motion.div
            key={u._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-primary/10 border border-secondary/30 rounded-2xl p-4 shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaIdBadge className="text-secondary w-6 h-6" />
              <h3 className="text-lg font-semibold text-primary">
                {u.name || "N/A"}
              </h3>
            </div>

            <p className="text-sm flex items-center gap-2 text-primary mb-1">
              <FaEnvelope className="text-secondary" /> {u.email}
            </p>
            <p className="text-sm flex items-center gap-2 text-primary mb-1">
              <FaUser className="text-secondary" /> Role:{" "}
              <span className="capitalize">{u.role || "user"}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {u.role !== "admin" && (
                <button
                  onClick={() => handleRoleChange(u._id, "admin")}
                  className="btn btn-xs bg-secondary/20 text-primary flex items-center gap-1"
                >
                  <FaUserShield /> Admin
                </button>
              )}
              {u.role !== "restaurant" && (
                <button
                  onClick={() => handleRoleChange(u._id, "restaurant")}
                  className="btn btn-xs bg-green-600 text-white flex items-center gap-1"
                >
                  <FaUtensils /> Restaurant
                </button>
              )}
              {u.role !== "charity" && (
                <button
                  onClick={() => handleRoleChange(u._id, "charity")}
                  className="btn btn-xs bg-primary/20 text-secondary flex items-center gap-1"
                >
                  <FaHandsHelping /> Charity
                </button>
              )}
              <button
                onClick={() => handleDelete(u._id)}
                className="btn btn-xs bg-red-500 text-white flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}

        {!users.length && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-primary text-sm"
          >
            No users found.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
