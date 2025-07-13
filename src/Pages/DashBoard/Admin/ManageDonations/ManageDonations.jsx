import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

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
          Swal.fire("Rejected!", `"${title}" has been rejected.`, "info");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to reject donation.", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-secondary">
        Manage Donations
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
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
                className="hover:bg-gray-50 border-t border-gray-200"
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
                        ? "bg-green-100 text-green-700"
                        : donation.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {donation.status || "Pending"}
                  </span>
                </td>
                <td className="text-center flex gap-2 justify-center items-center py-3 flex-wrap">
                  {donation.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleVerify(donation._id, donation.title)}
                        className="btn btn-xs bg-blue-600 text-white"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(donation._id, donation.title)}
                        className="btn btn-xs bg-red-600 text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {donation.status !== "Pending" && (
                    <span className="text-gray-400 text-xs">No action needed</span>
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
    </div>
  );
};

export default ManageDonations;
