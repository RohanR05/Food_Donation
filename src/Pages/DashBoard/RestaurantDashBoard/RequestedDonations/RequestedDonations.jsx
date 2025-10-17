import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiXCircle,
  FiClipboard,
  FiUser,
  FiClock,
  FiMessageSquare,
  FiBox,
} from "react-icons/fi";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading2 from "../../../../Shared/Loading/Loading2";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // ✅ Fetch requests
  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donationRequests", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?restaurantEmail=${encodeURIComponent(userEmail)}`
      );
      return res.data;
    },
    enabled: !!userEmail,
  });

  // ✅ Accept request
  const acceptMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/donation-requests/accept/${id}`),
    onSuccess: () => {
      Swal.fire("Accepted", "Request accepted and others rejected.", "success");
      queryClient.invalidateQueries(["donationRequests", userEmail]);
    },
    onError: () => Swal.fire("Error", "Failed to accept request.", "error"),
  });

  // ✅ Reject request
  const rejectMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/donation-requests/reject/${id}`),
    onSuccess: () => {
      Swal.fire("Rejected", "Request rejected.", "success");
      queryClient.invalidateQueries(["donationRequests", userEmail]);
    },
    onError: () => Swal.fire("Error", "Failed to reject request.", "error"),
  });

  if (!userEmail || isLoading) return <Loading2 />;

  if (error)
    return (
      <p className="text-red-600 text-center mt-10">
        Error loading requests. Try again later.
      </p>
    );

  if (requests.length === 0)
    return (
      <p className="text-center mt-10 text-info text-lg">
        No donation requests available for your restaurant.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-2 md:py-8">
      <h2 className="text-3xl text-center font-bold mb-8 text-primary flex items-center justify-center gap-3">
        <FiClipboard className="text-secondary" /> Donation Requests
      </h2>

      {/* ✅ Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-accent border border-accent">
        <table className="table w-full">
          <thead className="bg-primary text-neutral">
            <tr>
              <th>#</th>
              <th>
                <div className="flex items-center gap-1">
                  <FiClipboard /> Donation
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <FiUser /> Charity
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <FiClock /> Pickup Time
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <FiMessageSquare /> Description
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <FiBox /> Status
                </div>
              </th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <motion.tr
                key={req._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="hover:bg-secondary/20"
              >
                <td>{idx + 1}</td>
                <td className="font-medium text-info">{req.donationTitle}</td>
                <td>
                  {req.charityName}
                  <br />
                  <span className="text-sm text-gray-500">
                    {req.charityEmail}
                  </span>
                </td>
                <td>{req.pickupTime}</td>
                <td>{req.requestDescription}</td>
                <td>
                  <span
                    className={`font-semibold ${
                      req.status === "Pending"
                        ? "text-secondary"
                        : req.status === "Accepted"
                        ? "text-green-600"
                        : req.status === "Rejected"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="text-center">
                  {req.status === "Pending" && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => acceptMutation.mutate(req._id)}
                        className="btn btn-sm btn-secondary btn-outline flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                        disabled={acceptMutation.isLoading}
                      >
                        <FiCheckCircle />
                        {acceptMutation.isLoading ? "..." : "Accept"}
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(req._id)}
                        className="btn btn-sm btn-error text-neutral flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                        disabled={rejectMutation.isLoading}
                      >
                        <FiXCircle />
                        {rejectMutation.isLoading ? "..." : "Reject"}
                      </button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Card design for small screens */}
      <div className="md:hidden space-y-4">
        {requests.map((req, idx) => (
          <motion.div
            key={req._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-4 rounded-2xl shadow-md shadow-primary/50 hover:shadow-secondary/50 bg-accent border border-accent"
          >
            <p className="font-bold text-primary text-lg flex items-center gap-2">
              <FiClipboard className="text-secondary" /> {req.donationTitle}
            </p>
            <p className="flex items-center gap-2 mt-1">
              <FiUser className="text-secondary" />
              <span>
                <strong>Charity:</strong> {req.charityName} (
                <span className="text-sm">{req.charityEmail}</span>)
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FiClock className="text-secondary" />
              <span>
                <strong>Pickup Time:</strong> {req.pickupTime}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FiMessageSquare className="text-secondary" />
              <span>
                <strong>Description:</strong> {req.requestDescription}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FiBox className="text-secondary" />
              <span>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    req.status === "Pending"
                      ? "text-secondary"
                      : req.status === "Accepted"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {req.status}
                </span>
              </span>
            </p>

            {req.status === "Pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => acceptMutation.mutate(req._id)}
                  className="btn btn-sm btn-secondary flex-1 flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200"
                  disabled={acceptMutation.isLoading}
                >
                  <FiCheckCircle />
                  {acceptMutation.isLoading ? "..." : "Accept"}
                </button>
                <button
                  onClick={() => rejectMutation.mutate(req._id)}
                  className="btn btn-sm btn-error text-neutral flex-1 flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200"
                  disabled={rejectMutation.isLoading}
                >
                  <FiXCircle />
                  {rejectMutation.isLoading ? "..." : "Reject"}
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RequestedDonations;
