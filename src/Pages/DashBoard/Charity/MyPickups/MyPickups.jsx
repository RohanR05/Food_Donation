import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyPickups = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pickups assigned to this charity
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

  // Mutation to confirm pickup
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

  if (isLoading)
    return <div className="text-center mt-10">Loading pickups...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center">Failed to load pickups</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-primary rounded-2xl mt-16 text-secondary">
      <h2 className="font-bold text-center mb-6 text-secondary text-4xl">
        My Pickups
      </h2>
      {pickups.length === 0 ? (
        <p className="text-center">No pickups found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map((pickup) => (
            <div key={pickup._id} className="card bg-base-100 shadow-xl border">
              <figure>
                <img
                  src={pickup.image}
                  alt={pickup.donationTitle}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-bold">{pickup.donationTitle}</h3>
                <p>
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {pickup.restaurantName}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {pickup.location}
                </p>
                <p>
                  <span className="font-semibold">Food Type:</span>{" "}
                  {pickup.foodType}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {pickup.quantity}
                </p>
                <p>
                  <span className="font-semibold">Pickup Time:</span>{" "}
                  {pickup.pickupTime}
                </p>
                <div className="mt-2">
                  <span
                    className={`badge ${
                      pickup.status === "Picked"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {pickup.status}
                  </span>
                </div>

                {pickup.status === "Accepted" ||
                pickup.status === "Assigned" ? (
                  <button
                    className="btn btn-secondary btn-outline btn-sm mt-4"
                    onClick={() => confirmPickup(pickup._id)}
                    disabled={confirming}
                  >
                    {confirming ? "Confirming..." : "Confirm Pickup"}
                  </button>
                ) : (
                  <p className="btn btn-secondary text-primary btn-outline mt-3">
                    Pickup confirmed
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
