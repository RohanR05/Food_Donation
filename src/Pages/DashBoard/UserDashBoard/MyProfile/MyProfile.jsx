import React, { use,} from "react";// Adjust if your context path differs
import { AuthContext } from "../../../../Contexts/AuthContext";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure"; // Your custom axios hook

const MyProfile = () => {
  const { user } = use(AuthContext);
//   const [axiosSecure] = useAxiosSecure();

//   const { data: dbUser = {} } = useQuery({
//     queryKey: ["dbUser", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user.email}`);
//       return res.data;
//     },
//   });

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="card bg-base-100 shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/j3Rdtmm/default-user.png"}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary">{user?.displayName || "Unknown User"}</h2>

            {/* Only show role if NOT a normal user */}
            {/* {dbUser?.role && dbUser.role !== "user" && (
              <p className="text-base-content mt-2">
                <span className="font-semibold">Role:</span> {dbUser.role.charAt(0).toUpperCase() + dbUser.role.slice(1)}
              </p>
            )} */}

            {/* Optional fields */}
            {/* <p className="text-base-content mt-2">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            {dbUser?.phone && (
              <p className="text-base-content mt-2">
                <span className="font-semibold">Phone:</span> {dbUser.phone}
              </p>
            )}
            {dbUser?.joinedAt && (
              <p className="text-base-content mt-2">
                <span className="font-semibold">Joined:</span> {new Date(dbUser.joinedAt).toLocaleDateString()}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
