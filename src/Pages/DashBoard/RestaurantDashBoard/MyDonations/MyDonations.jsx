import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading2 from "../../../../Shared/Loading/Loading2";
import { motion } from "framer-motion";
import {
  Utensils,
  Package,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Building2,
  HandHeart,
} from "lucide-react";

const MyDonation = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchDonations = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/donations");
        const myDonations = res.data.filter(
          (donation) => donation.restaurantEmail === user.email
        );
        setDonations(myDonations);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
        setError("Failed to load donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/donations/${id}`);
        if (res.data.deletedCount > 0) {
          setDonations((prev) => prev.filter((d) => d._id !== id));
          Swal.fire("Deleted!", "Your donation has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete donation.", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Something went wrong deleting donation.", "error");
      }
    }
  };

  const handleUpdate = (id) => navigate(`/edit-donation/${id}`);

  if (loading) return <Loading2 />;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (donations.length === 0)
    return (
      <p className="text-center py-10 text-primary">No donations found.</p>
    );

  return (
    <div className="mx-auto px-2 md:pt-8">
      {/* === Page Title === */}
      <div className="">
        <h2 className="text-3xl font-bold text-primary text-center flex flex-col">
          My Added Donations
        </h2>
      </div>

      {/* === Donation Cards === */}
      <div className="rounded-2xl shadow-lg p-1 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {donations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-accent border border-secondary shadow-xl shadow-primary/50 hover:shadow-secondary/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all"
          >
            {donation.image && (
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4 space-y-2 text-primary">
              <h3 className="text-xl font-semibold text-info flex items-center gap-2">
                <Utensils className="text-secondary w-5 h-5" />
                {donation.title}
              </h3>

              <p className="flex items-center gap-2">
                <Package className="text-secondary w-4 h-4" />
                <span className="font-bold text-info">Food Type:</span>{" "}
                {donation.foodType}
              </p>

              <p className="flex items-center gap-2">
                <CheckCircle className="text-secondary w-4 h-4" />
                <span className="font-bold text-info">Quantity:</span>{" "}
                {donation.quantity}
              </p>

              <p className="flex items-center gap-2">
                <Building2 className="text-secondary w-4 h-4" />
                <span className="font-bold text-info">Restaurant:</span>{" "}
                {donation.restaurantName}
              </p>

              <p className="flex items-center gap-2">
                {donation.status === "Verified" ? (
                  <CheckCircle className="text-secondary w-4 h-4" />
                ) : donation.status === "Rejected" ? (
                  <XCircle className="text-secondary w-4 h-4" />
                ) : (
                  <Package className="text-secondary w-4 h-4" />
                )}
                <span className="font-bold text-info">Status:</span>{" "}
                <span className="font-semibold text-secondary">
                  {donation.status}
                </span>
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {donation.status !== "Rejected" && (
                  <button
                    onClick={() => handleUpdate(donation._id)}
                    className="btn btn-sm bg-primary text-neutral hover:bg-secondary hover:text-neutral transition-all flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4 text-info" />
                    Update
                  </button>
                )}

                <button
                  onClick={() => handleDelete(donation._id)}
                  className="btn btn-sm bg-secondary text-neutral hover:bg-primary transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-info" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyDonation;
