import React, { useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Clock, Building2, CheckCircle, XCircle, Package } from "lucide-react";
import Loading2 from "../../../../Shared/Loading/Loading2";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?charityEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel request
  const cancelRequest = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myDonationRequests"]);
      Swal.fire("Cancelled", "Your request has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel the request.", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this request?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) cancelRequest.mutate(id);
    });
  };

  if (isLoading) return <Loading2 />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto rounded-2xl md:mt-8 px-2"
    >
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center text-primary mb-8">
        My Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-info py-10">
          No donation requests found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req, index) => (
            <motion.div
              key={req._id}
              className="bg-accent rounded-2xl p-5 shadow-xl shadow-primary/30 hover:shadow-secondary/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Package className="text-secondary w-6 h-6" />
                <h3 className="text-lg font-bold text-primary">
                  {req.donationTitle}
                </h3>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-info flex items-center gap-2">
                  <Building2 className="text-secondary w-5 h-5" />
                  <span>
                    <strong className="text-primary">Restaurant:</strong>{" "}
                    {req.restaurantName}
                  </span>
                </p>

                <p className="text-info flex items-center gap-2">
                  <Clock className="text-secondary w-5 h-5" />
                  <span>
                    <strong className="text-primary">Pickup Time:</strong>{" "}
                    {req.pickupTime}
                  </span>
                </p>

                <p className="text-info flex items-center gap-2">
                  {req.status === "Accepted" ? (
                    <CheckCircle className="text-secondary w-5 h-5" />
                  ) : req.status === "Pending" ? (
                    <Clock className="text-secondary w-5 h-5" />
                  ) : (
                    <XCircle className="text-secondary w-5 h-5" />
                  )}
                  <span>
                    <strong className="text-primary">Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </span>
                </p>
              </div>

              {req.status === "Pending" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCancel(req._id)}
                  className="mt-4 w-full btn btn-outline btn-secondary hover:bg-primary hover:text-info"
                >
                  Cancel Request
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyRequests;
