import React, { use } from "react";
import Swal from "sweetalert2";
import { Trash2, Shield, UtensilsCrossed, HeartHandshake } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../Contexts/AuthContext";

const ManageUsers = () => {
const { user } = use(AuthContext); // ✅ Add this
const axiosSecure = useAxiosSecure();

const {
  data: users = [],
  refetch,
  isLoading,
} = useQuery({
  queryKey: ["users"],
  enabled: !!user?.email, // ✅ Run only when user is ready
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-secondary">
        Manage Users
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-4 px-6">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 border-t border-gray-200"
              >
                <td className="py-3 px-6">{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span className="capitalize px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                    {user.role || "user"}
                  </span>
                </td>
                <td className="flex gap-2 flex-wrap justify-center items-center py-3">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="btn btn-xs bg-secondary text-white"
                    >
                      <Shield className="w-4 h-4 mr-1" /> Admin
                    </button>
                  )}
                  {user.role !== "restaurant" && (
                    <button
                      onClick={() => handleRoleChange(user._id, "restaurant")}
                      className="btn btn-xs bg-green-600 text-white"
                    >
                      <UtensilsCrossed className="w-4 h-4 mr-1" /> Restaurant
                    </button>
                  )}
                  {user.role !== "charity" && (
                    <button
                      onClick={() => handleRoleChange(user._id, "charity")}
                      className="btn btn-xs bg-primary text-black"
                    >
                      <HeartHandshake className="w-4 h-4 mr-1" /> Charity
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs bg-red-500 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!users.length && !isLoading && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
