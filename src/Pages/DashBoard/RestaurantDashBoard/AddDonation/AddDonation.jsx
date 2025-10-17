import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import axios from "axios";
import {
  FaUtensils,
  FaClock,
  FaMapMarkerAlt,
  FaImage,
  FaStore,
  FaEnvelope,
  FaWeightHanging,
  FaTag,
} from "react-icons/fa";

const AddDonation = () => {
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "Evening Meal Pack",
      foodType: "Cooked Meal",
      quantity: 12,
      pickupTime: "2:00 PM - 6:00 PM",
      location: "56 Green Street, Dhaka",
    },
  });

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    setImageUploading(true);
    try {
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_KEY
      }`;
      const res = await axios.post(uploadUrl, formData);
      setProfileImage(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed", err);
      Swal.fire("Upload failed", "Failed to upload image.", "error");
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!profileImage) {
      Swal.fire("Image missing", "Please upload an image first.", "warning");
      return;
    }

    const donation = {
      ...data,
      restaurantName: user?.displayName || "Demo Restaurant",
      restaurantEmail: user?.email || "demo@example.com",
      image: profileImage,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/donations", donation);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Donation added successfully!", "success");
        reset();
        setProfileImage("");
      } else {
        Swal.fire("Oops!", "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Donation error:", error);
      Swal.fire("Error", error.message || "Failed to submit", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto md:mt-8 px-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-accent p-8 md:p-10 rounded-2xl shadow-lg shadow-primary/50"
      >
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-8"
        >
          Add Surplus Food Donation
        </motion.h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {/* Title + Food Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="form-control"
            >
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaTag className="text-secondary" /> Donation Title
              </label>
              <input
                type="text"
                placeholder="e.g. Fresh Bread Donation"
                className="input input-bordered bg-neutral text-info"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-error text-sm">Title is required</span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="form-control"
            >
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaUtensils className="text-secondary" /> Food Type
              </label>
              <select
                className="select select-bordered bg-neutral text-info"
                {...register("foodType", { required: true })}
              >
                <option value="">Select type</option>
                <option value="Bakery">Bakery</option>
                <option value="Produce">Produce</option>
                <option value="Cooked Meal">Cooked Meal</option>
                <option value="Packaged Goods">Packaged Goods</option>
              </select>
              {errors.foodType && (
                <span className="text-error text-sm">
                  Food type is required
                </span>
              )}
            </motion.div>
          </div>

          {/* Quantity + Pickup Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="form-control"
            >
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaWeightHanging className="text-secondary" /> Quantity
              </label>
              <input
                type="number"
                placeholder="e.g. 5"
                className="input input-bordered bg-neutral text-info"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="text-error text-sm">Quantity is required</span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="form-control"
            >
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaClock className="text-secondary" /> Pickup Time
              </label>
              <input
                type="text"
                placeholder="e.g. 2pm - 6pm"
                className="input input-bordered bg-neutral text-info"
                {...register("pickupTime", { required: true })}
              />
              {errors.pickupTime && (
                <span className="text-error text-sm">
                  Pickup time is required
                </span>
              )}
            </motion.div>
          </div>

          {/* Location + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="form-control"
            >
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-secondary" /> Location
              </label>
              <input
                type="text"
                placeholder="e.g. 123 Food Street, Dhaka"
                className="input input-bordered bg-neutral text-info"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-error text-sm">Location is required</span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="form-control"
            >
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaImage className="text-secondary" /> Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered bg-neutral text-info"
                onChange={handleImageUpload}
                disabled={imageUploading}
              />
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-lg border-2 border-secondary"
                />
              )}
            </motion.div>
          </div>

          {/* Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaStore className="text-secondary" /> Restaurant Name
              </label>
              <input
                type="text"
                value={user?.displayName || "Demo Restaurant"}
                readOnly
                className="input input-bordered bg-neutral text-info"
              />
            </div>
            <div>
              <label className="label text-info font-semibold flex items-center gap-2">
                <FaEnvelope className="text-secondary" /> Restaurant Email
              </label>
              <input
                type="email"
                value={user?.email || "demo@example.com"}
                readOnly
                className="input input-bordered bg-neutral text-info"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={imageUploading}
            className="btn w-full bg-secondary font-semibold mt-6"
          >
            {imageUploading ? "Uploading..." : "Add Donation"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddDonation;
