import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading from "../../../../Shared/Loading/Loadign";

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const {
    data: transactions = [],
    isLoading,
  } = useQuery({
    queryKey: ["charity-transactions", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-requests?email=${user.email}`);
      return res.data || [];
    },
  });

  if (loading || isLoading) {
    return <Loading/>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-primary shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
        Charity Role Request Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-secondary">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm border">
            <thead className="bg-base-200 text-secondary uppercase text-xs">
              <tr>
                <th className="py-2 px-4">Transaction ID</th>
                <th>Amount</th>
                <th>Organization</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id} className="hover:bg-primary hover:opacity-70 border-t">
                  <td className="py-2 px-4 text-xs">
                    {txn.paymentId || "N/A"}
                  </td>
                  <td>${txn.paymentAmount || 0}</td>
                  <td>{txn.organization || "N/A"}</td>
                  <td>
                    {new Date(txn.requestedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        txn.status === "approved"
                          ? "border text-secondary"
                          : txn.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {txn.status}
                    </span>
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

export default TransactionHistory;
