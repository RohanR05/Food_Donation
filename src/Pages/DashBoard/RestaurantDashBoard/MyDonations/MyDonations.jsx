import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyDonation = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donations on mount
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
  }, [user?.email, axiosSecure]);

  // Delete donation handler
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
          setDonations(donations.filter((don) => don._id !== id));
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

  // Update donation handler (redirect to edit page)
  const handleUpdate = (id) => {
    navigate(`/edit-donation/${id}`);
  };

  if (loading) return <p className="text-center py-10">Loading donations...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  if (donations.length === 0)
    return <p className="text-center py-10">No donations found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">My Donations</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="card bg-base-100 shadow-lg border rounded-lg overflow-hidden"
          >
            {donation.image && (
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{donation.title}</h3>
              <p>
                <strong>Food Type:</strong> {donation.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <p>
                <strong>Restaurant:</strong> {donation.restaurantName}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    donation.status === "Verified"
                      ? "text-green-600 font-semibold"
                      : donation.status === "Rejected"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {donation.status}
                </span>
              </p>

              <div className="flex gap-4 mt-4">
                {donation.status !== "Rejected" && (
                  <button
                    onClick={() => handleUpdate(donation._id)}
                    className="btn btn-sm btn-primary text-secondary"
                  >
                    Update
                  </button>
                )}

                <button
                  onClick={() => handleDelete(donation._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonation;
