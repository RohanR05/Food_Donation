import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading from "../../../../Shared/Loading/Loadign";

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
    queryKey: ["donation-requests"], // ✅ simplified for consistency
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
          queryClient.invalidateQueries(["donation-requests"]); // ✅ match the queryKey
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete the request.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;
  if (error)
    return <p>Error loading requests: {error.message || "Unknown error"}</p>;
  if (requests.length === 0) return <p>No donation requests available.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Manage All Donation Requests
      </h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Donation Title</th>
            <th className="border px-4 py-2">Charity Name</th>
            <th className="border px-4 py-2">Charity Email</th>
            <th className="border px-4 py-2">Request Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td className="border px-4 py-2">{request.donationTitle}</td>
              <td className="border px-4 py-2">{request.charityName}</td>
              <td className="border px-4 py-2">{request.charityEmail}</td>
              <td className="border px-4 py-2">{request.requestDescription}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(request._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
