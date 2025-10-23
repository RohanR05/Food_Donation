import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useContext } from "react";
import Loading2 from "../../../../Shared/Loading/Loading2";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Users } from "lucide-react";

const ManageCharityRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: charityRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["charityRequests"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests");
      return res.data;
    },
  });

  const handleApprove = async (id, email) => {
    const result = await axiosSecure.patch(`/charity-requests/approve/${id}`, {
      email,
    });
    if (result.data.modifiedCount > 0) {
      Swal.fire("Success", "Charity approved!", "success");
      refetch();
    }
  };

  const handleReject = async (id) => {
    const result = await axiosSecure.patch(`/charity-requests/reject/${id}`);
    if (result.data.modifiedCount > 0) {
      Swal.fire("Rejected", "Charity request rejected", "info");
      refetch();
    }
  };

  if (isLoading) return <Loading2 />;

  return (
    <div className="mx-auto md:mt-8 px-2 md:px-6">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary flex justify-center items-center gap-2">
          <Users className="text-primary w-7 h-7" />
          Manage Charity Role Requests
        </h2>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {charityRequests.map((req, index) => (
          <motion.div
            key={req._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="card bg-primary/10 border border-accent shadow-md rounded-2xl hover:shadow-xl shadow-primary/50 hover:shadow-secondary/50 transition-all duration-300"
          >
            <div className="card-body space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">
                  {req.name}
                </h3>
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
              </div>

              <p className="text-sm text-info">{req.email}</p>

              <div className="mt-2 space-y-1">
                <p>
                  <span className="font-semibold text-secondary">
                    Organization:
                  </span>{" "}
                  {req.organization}
                </p>
                <p className="text-sm italic text-info">{req.mission}</p>
              </div>

              <div className="divider my-2"></div>

              <div className="flex justify-between items-center mt-3">
                <button
                  className="btn btn-secondary btn-sm flex items-center gap-1"
                  onClick={() => handleApprove(req._id, req.email)}
                  disabled={req.status !== "pending"}
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button
                  className="btn btn-error btn-sm flex items-center gap-1"
                  onClick={() => handleReject(req._id)}
                  disabled={req.status !== "pending"}
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Requests */}
      {charityRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mt-10 text-info"
        >
          No charity role requests found.
        </motion.div>
      )}
    </div>
  );
};

export default ManageCharityRequests;
