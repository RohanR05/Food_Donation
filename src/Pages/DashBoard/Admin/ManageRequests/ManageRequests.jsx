import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading2 from "../../../../Shared/Loading/Loading2";
import { motion } from "framer-motion";

// React Icons
import {
  FaBox,
  FaUser,
  FaEnvelope,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const isUserReady = !!user?.email;

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donation-requests"],
    enabled: isUserReady,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/donation-requests/${id}`);
          Swal.fire("Deleted!", "The request has been deleted.", "success");
          queryClient.invalidateQueries(["donation-requests"]);
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete the request.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading2 />;
  if (error)
    return <p>Error loading requests: {error.message || "Unknown error"}</p>;
  if (requests.length === 0) return <p>No donation requests available.</p>;

  return (
    <div className="mx-auto md:mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-secondary">
        Manage All Donation Requests
      </h2>

      {/* Table for md+ */}
      <div className="hidden md:block overflow-x-auto bg-primary/10">
        <table className="table-auto w-full border-collapse border border-secondary">
          <thead className="bg-primary text-info">
            <tr>
              <th className="border px-4 py-2">Donation Title</th>
              <th className="border px-4 py-2">Charity Name</th>
              <th className="border px-4 py-2">Charity Email</th>
              <th className="border px-4 py-2">Request Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, i) => (
              <motion.tr
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-secondary hover:bg-primary/10"
              >
                <td className="border px-4 py-2">{request.donationTitle}</td>
                <td className="border px-4 py-2">{request.charityName}</td>
                <td className="border px-4 py-2">{request.charityEmail}</td>
                <td className="border px-4 py-2">
                  {request.requestDescription}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn btn-sm bg-red-500 text-white flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for sm */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {requests.map((request, i) => (
          <motion.div
            key={request._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-primary/10 border border-secondary/30 rounded-2xl p-4 shadow-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <FaBox className="text-secondary w-5 h-5" />
              <h3 className="text-lg font-semibold text-primary">
                {request.donationTitle}
              </h3>
            </div>
            <p className="flex items-center gap-2 text-info mb-1">
              <FaUser className="text-secondary" /> {request.charityName}
            </p>
            <p className="flex items-center gap-2 text-info mb-1">
              <FaEnvelope className="text-secondary" /> {request.charityEmail}
            </p>
            <p className="flex items-center gap-2 text-info mb-2">
              <FaInfoCircle className="text-secondary" />{" "}
              {request.requestDescription}
            </p>
            <button
              onClick={() => handleDelete(request._id)}
              className="btn btn-sm bg-red-500 text-white flex items-center gap-1 w-full"
            >
              <FaTrash /> Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageRequests;
