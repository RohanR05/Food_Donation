import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donation requests
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  // Handle delete request
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/donation-requests/${id}`);
        Swal.fire("Deleted!", "The request has been deleted.", "success");
        queryClient.invalidateQueries(["donationRequests"]);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete the request.", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center py-4">Loading requests...</p>;
  if (error) return <p className="text-center py-4 text-red-600">Failed to load requests.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-indigo-700">
        Manage Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 italic">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="p-3 border border-gray-300 text-left">Donation Title</th>
                <th className="p-3 border border-gray-300 text-left">Restaurant</th>
                <th className="p-3 border border-gray-300 text-left">Food Type</th>
                <th className="p-3 border border-gray-300 text-left">Quantity</th>
                <th className="p-3 border border-gray-300 text-left">Description</th>
                <th className="p-3 border border-gray-300 text-left">Status</th>
                <th className="p-3 border border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="even:bg-gray-50 odd:bg-white">
                  <td className="p-3 border border-gray-300">{req.title}</td>
                  <td className="p-3 border border-gray-300">{req.restaurant}</td>
                  <td className="p-3 border border-gray-300">{req.foodType}</td>
                  <td className="p-3 border border-gray-300">{req.quantity}</td>
                  <td className="p-3 border border-gray-300 max-w-xs truncate">{req.description || "-"}</td>
                  <td className="p-3 border border-gray-300 font-semibold text-center">
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
