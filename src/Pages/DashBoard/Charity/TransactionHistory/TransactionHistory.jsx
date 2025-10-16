import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaDollarSign,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading2 from "../../../../Shared/Loading/Loading2";

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["charity-transactions", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/charity-requests?email=${user.email}`
      );
      return res.data || [];
    },
  });

  if (loading || isLoading)
    return (
      <div className="flex justify-center py-12">
        <Loading2 size={120} />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-6 md:mt-8 bg-accent rounded-2xl shadow-xl shadow-primary/50 space-y-6 ">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-primary"
      >
        Charity Role Request Transactions
      </motion.h2>

      {transactions.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-info text-lg"
        >
          You have no transactions found.
        </motion.p>
      ) : (
        <>
          {/* Table for md/lg */}
          <motion.div
            className="hidden md:block overflow-x-auto"
            initial="hidden"
            animate="visible"
          >
            <table className="table-auto w-full text-sm md:text-base border border-secondary">
              <thead className="bg-primary/20 text-info uppercase text-xs md:text-sm">
                <tr>
                  <th className="py-2 px-3">Txn ID</th>
                  <th className="flex items-center gap-1 py-2 px-3">
                    <FaDollarSign className="text-secondary" /> Amount
                  </th>
                  <th className="flex items-center gap-1 py-2 px-3">
                    <FaBuilding className="text-secondary" /> Organization
                  </th>
                  <th className="flex items-center gap-1 py-2 px-3">
                    <FaCalendarAlt className="text-secondary" /> Request Date
                  </th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <motion.tr
                    key={txn._id}
                    className="hover:bg-primary/30 border-b"
                  >
                    <td className="py-2 px-3 text-info truncate font-semibold">
                      {txn.paymentId || "N/A"}
                    </td>
                    <td className="py-2 px-3 text-info flex items-center gap-1">
                      <FaDollarSign className="text-secondary" />{" "}
                      <span className="font-bold text-primary">
                        ${txn.paymentAmount || 0}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-info flex items-center gap-1">
                      <FaBuilding className="text-secondary" />{" "}
                      {txn.organization || "N/A"}
                    </td>
                    <td className="py-2 px-3 text-info flex items-center gap-1">
                      <FaCalendarAlt className="text-secondary" />{" "}
                      {new Date(txn.requestedAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 ${
                          txn.status === "approved"
                            ? "border text-secondary"
                            : txn.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {txn.status === "approved" && (
                          <FaCheckCircle className="text-secondary" />
                        )}
                        {txn.status === "pending" && (
                          <FaHourglassHalf className="text-secondary" />
                        )}
                        {txn.status === "rejected" && (
                          <FaTimesCircle className="text-secondary" />
                        )}
                        {txn.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Cards for sm */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {transactions.map((txn) => (
              <motion.div
                key={txn._id}
                className="bg-primary/20 p-4 rounded-2xl shadow-md space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="flex items-center gap-2 text-info font-semibold">
                  <span className="text-secondary">
                    <FaDollarSign />
                  </span>
                  <span className="text-primary">
                    ${txn.paymentAmount || 0}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-info">
                  <span className="text-secondary">
                    <FaBuilding />
                  </span>
                  {txn.organization || "N/A"}
                </p>
                <p className="flex items-center gap-2 text-info">
                  <span className="text-secondary">
                    <FaCalendarAlt />
                  </span>
                  {new Date(txn.requestedAt).toLocaleDateString("en-GB")}
                </p>
                <p className="flex items-center gap-2 text-info">
                  <span className="text-secondary">
                    {txn.status === "approved" && <FaCheckCircle />}
                    {txn.status === "pending" && <FaHourglassHalf />}
                    {txn.status === "rejected" && <FaTimesCircle />}
                  </span>
                  <span
                    className={`${
                      txn.status === "approved"
                        ? "font-bold text-primary"
                        : "text-info"
                    }`}
                  >
                    {txn.status}
                  </span>
                </p>
                <p className="text-info truncate font-semibold">
                  Txn ID: {txn.paymentId || "N/A"}
                </p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
