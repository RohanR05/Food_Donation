import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { use } from "react";

const ManageCharityRequests = () => {
  const { user } = use(AuthContext); // ✅ Add this
  const axiosSecure = useAxiosSecure();

  const {
    data: charityRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["charityRequests"],
    enabled: !!user?.email, // ✅ Prevent 401 until user is ready
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests");
      return res.data;
    },
  });

  // Approve charity request
  const handleApprove = async (id, email) => {
    const result = await axiosSecure.patch(`/charity-requests/approve/${id}`, { email });
    if (result.data.modifiedCount > 0) {
      Swal.fire("Success", "Charity approved!", "success");
      refetch();
    }
  };

  // Reject charity request
  const handleReject = async (id) => {
    const result = await axiosSecure.patch(`/charity-requests/reject/${id}`);
    if (result.data.modifiedCount > 0) {
      Swal.fire("Rejected", "Charity request rejected", "info");
      refetch();
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="overflow-x-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Charity Role Requests</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Mission</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {charityRequests.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.organization}</td>
              <td>{req.mission}</td>
              <td>
                <span
                  className={`badge ${
                    req.status === "pending"
                      ? "badge-warning"
                      : req.status === "approved"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleApprove(req._id, req.email)}
                  disabled={req.status !== "pending"}
                >
                  Approve
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleReject(req._id)}
                  disabled={req.status !== "pending"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCharityRequests;
