import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LatestCharityRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests");
      return res.data.slice(-3).reverse(); // latest 3
    },
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-6">
        Loading charity requests...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-6">Failed to load requests.</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        🌟 Latest Charity Requests
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {requests.map((req, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
          >
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold text-indigo-600">{req.name}</h3>
              <p className="text-sm text-gray-700">
                <strong>Description:</strong>{" "}
                {req.mission || "No description available"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Organization:</strong>{" "}
                {req.organization || "Not specified"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
