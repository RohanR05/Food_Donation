import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading2 from "../../../../Shared/Loading/Loading2";
import {
  MapPin,
  Clock,
  CheckCircle,
  Package,
  UtensilsCrossed,
  Building2,
} from "lucide-react";

const MyPickups = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch pickups assigned to this charity
  const {
    data: pickups = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pickups", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-pickups?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Confirm pickup
  const { mutate: confirmPickup, isLoading: confirming } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donations/pickup/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Pickup confirmed!", "success");
      queryClient.invalidateQueries(["pickups", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to confirm pickup.", "error");
    },
  });

  if (isLoading) return <Loading2 />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load pickups.</p>
    );

  return (
    <motion.div
      className="max-w-6xl mx-auto px-2 md:mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        My Pickups
      </h2>

      {pickups.length === 0 ? (
        <p className="text-center text-info">No pickups found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map((pickup, index) => (
            <motion.div
              key={pickup._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-accent border border-info/10 rounded-2xl overflow-hidden shadow-md shadow-primary/30 hover:shadow-secondary/40 transition-all duration-300"
            >
              <img
                src={pickup.image || "https://via.placeholder.com/400x200"}
                alt={pickup.donationTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2 text-info">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Package className="text-secondary w-5 h-5" />
                  {pickup.donationTitle}
                </h3>

                <p className="flex items-center gap-2">
                  <Building2 className="text-secondary w-4 h-4" />
                  <strong className="text-primary">Restaurant:</strong>{" "}
                  {pickup.restaurantName}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin className="text-secondary w-4 h-4" />
                  <strong className="text-primary">Location:</strong>{" "}
                  {pickup.location}
                </p>

                <p className="flex items-center gap-2">
                  <UtensilsCrossed className="text-secondary w-4 h-4" />
                  <strong className="text-primary">Food Type:</strong>{" "}
                  {pickup.foodType}
                </p>

                <p className="flex items-center gap-2">
                  <Package className="text-secondary w-4 h-4" />
                  <strong className="text-primary">Quantity:</strong>{" "}
                  {pickup.quantity}
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="text-secondary w-4 h-4" />
                  <strong className="text-primary">Pickup Time:</strong>{" "}
                  {pickup.pickupTime}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle
                    className={`w-5 h-5 ${
                      pickup.status === "Picked"
                        ? "text-green-500"
                        : "text-secondary"
                    }`}
                  />
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      pickup.status === "Picked"
                        ? "bg-green-100 text-green-700"
                        : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {pickup.status}
                  </span>
                </div>

                {pickup.status === "Accepted" ||
                pickup.status === "Assigned" ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => confirmPickup(pickup._id)}
                    disabled={confirming}
                    className="btn btn-outline btn-secondary w-full mt-4 hover:bg-primary hover:text-info"
                  >
                    {confirming ? "Confirming..." : "Confirm Pickup"}
                  </motion.button>
                ) : (
                  <p className="mt-4 text-center font-semibold text-green-500 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary" /> Pickup
                    Confirmed
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyPickups;
