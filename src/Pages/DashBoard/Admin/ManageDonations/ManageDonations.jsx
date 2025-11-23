import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaUtensils, FaEnvelope, FaUser, FaBox, FaCheck, FaTimes } from "react-icons/fa";
import Loading2 from '../../../../Shared/Loading/Loading2'

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const handleVerify = async (id, title) => {
    const confirm = await Swal.fire({
      title: "Verify Donation?",
      text: `Do you want to mark "${title}" as verified?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Verify",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/donations/verify/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Verified!", `"${title}" is now verified.`, "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to verify donation.", "error");
      }
    }
  };

  const handleReject = async (id, title) => {
    const confirm = await Swal.fire({
      title: "Reject Donation?",
      text: `Do you want to mark "${title}" as rejected?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/donations/reject/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Rejected!", `"${title}" has been rejected.`, "pritext-primary");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to reject donation.", "error");
      }
    }
  };

   if (isLoading) {
  return <Loading2></Loading2>
}


  return (
    <div className="mx-auto px-2 md:my-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-secondary">
        Manage Donations
      </h2>

      {/* Table for md+ devices */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg bg-accent">
        <table className="table w-full text-sm">
          <thead className="bg-primary/20 uppercase text-xs text-secondary">
            <tr>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Email</th>
              <th>Quantity</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr
                key={donation._id}
                className="hover:opacity-80 border-t border-secondary"
              >
                <td className="py-3 px-4">{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName || "N/A"}</td>
                <td>{donation.restaurantEmail}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      donation.status === "Verified"
                        ? "text-secondary"
                        : donation.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-accent"
                    }`}
                  >
                    {donation.status || "Pending"}
                  </span>
                </td>
                <td className="text-center flex gap-2 justify-center items-center py-3 flex-wrap">
                  {donation.status === "Pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleVerify(donation._id, donation.title)
                        }
                        className="btn btn-xs bg-secondary text-primary"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() =>
                          handleReject(donation._id, donation.title)
                        }
                        className="btn btn-xs bg-primary text-secondary"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-primary text-xs">
                      No action needed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!donations.length && !isLoading && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No donations found.
          </div>
        )}
      </div>

      {/* Card layout for small devices */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {donations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-primary/10 border border-secondary/30 rounded-2xl p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center gap-2">
              <FaUtensils className="text-secondary" /> {donation.title}
            </h3>
            <p className="text-sm flex items-center gap-2 text-primary">
              <FaUser className="text-secondary" />{" "}
              {donation.restaurantName || "N/A"}
            </p>
            <p className="text-sm flex items-center gap-2 text-primary">
              <FaEnvelope className="text-secondary" /> {donation.restaurantEmail}
            </p>
            <p className="text-sm flex items-center gap-2 text-primary">
              <FaBox className="text-secondary" /> Quantity: {donation.quantity}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  donation.status === "Verified"
                    ? "text-secondary bg-accent"
                    : donation.status === "Rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-accent text-primary"
                }`}
              >
                {donation.status || "Pending"}
              </span>

              {donation.status === "Pending" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerify(donation._id, donation.title)}
                    className="btn btn-xs bg-secondary text-primary flex items-center gap-1"
                  >
                    <FaCheck /> Verify
                  </button>
                  <button
                    onClick={() => handleReject(donation._id, donation.title)}
                    className="btn btn-xs bg-primary text-secondary flex items-center gap-1"
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              ) : (
                <span className="text-primary text-xs">No action needed</span>
              )}
            </div>
          </motion.div>
        ))}

        {!donations.length && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-gray-500 text-sm"
          >
            No donations found.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageDonations;
