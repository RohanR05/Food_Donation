import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router";

const Favorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: (favoriteId) => axiosSecure.delete(`/favorites/${favoriteId}`),
    onSuccess: () => {
      Swal.fire("Removed!", "Favorite has been removed.", "success");
      queryClient.invalidateQueries(["favorites", user.email]);
    },
    onError: () => Swal.fire("Error", "Failed to remove favorite", "error"),
  });

  if (isLoading) return <p className="text-center py-5">Loading favorites...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You have no favorites saved.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((fav) => (
            <div key={fav.favoriteId} className="card bg-white shadow p-4 rounded">
              <img
                src={fav.image}
                alt={fav.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">{fav.title}</h3>
              <p>
                <strong>Restaurant:</strong> {fav.restaurant} ({fav.location})
              </p>
              <p>
                <strong>Status:</strong> {fav.status}
              </p>
              <p>
                <strong>Quantity:</strong> {fav.quantity}
              </p>
              <div className="mt-3 flex gap-3">
                <Link
                  to={`/donations/${fav.donationId}`}
                  className="btn btn-secondary"
                >
                  Details
                </Link>
                <button
                  className="btn btn-error"
                  onClick={() => mutation.mutate(fav.favoriteId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
