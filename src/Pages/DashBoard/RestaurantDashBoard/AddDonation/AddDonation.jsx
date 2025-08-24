import React, { useContext, useState } from "react"; // fix useContext
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import axios from "axios"; // import axios here

const AddDonation = () => {
  const { user } = useContext(AuthContext); // fixed
  const [profileImage, setProfileImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    setImageUploading(true);
    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`;
      const res = await axios.post(imageUploadUrl, formData);
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
      image: profileImage, // use profileImage here
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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl shadow-secondary p-8">
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
          Add Surplus Food Donation
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl mx-auto">
          {/* Title */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Donation Title</label><br />
            <input
              type="text"
              placeholder="e.g. Fresh Bread Donation"
              className="input input-bordered"
              {...register("title", { required: true })}
            />
            {errors.title && <span className="text-error text-sm">Title is required</span>}
          </div>

          {/* Food Type */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Food Type</label><br />
            <select className="select select-bordered" {...register("foodType", { required: true })}>
              <option value="">Select type</option>
              <option value="Bakery">Bakery</option>
              <option value="Produce">Produce</option>
              <option value="Cooked Meal">Cooked Meal</option>
              <option value="Packaged Goods">Packaged Goods</option>
            </select>
            {errors.foodType && <span className="text-error text-sm">Food type is required</span>}
          </div>

          {/* Quantity */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Quantity (kg or portions)</label><br />
            <input
              type="number"
              placeholder="e.g. 5"
              className="input input-bordered"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && <span className="text-error text-sm">Quantity is required</span>}
          </div>

          {/* Pickup Time */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Pickup Time Window</label><br />
            <input
              type="text"
              placeholder="e.g. 2pm - 6pm"
              className="input input-bordered"
              {...register("pickupTime", { required: true })}
            />
            {errors.pickupTime && <span className="text-error text-sm">Pickup time is required</span>}
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Location</label><br />
            <input
              type="text"
              placeholder="e.g. 123 Food Street, Dhaka"
              className="input input-bordered"
              {...register("location", { required: true })}
            />
            {errors.location && <span className="text-error text-sm">Location is required</span>}
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Upload Image</label><br />
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={handleImageUpload}
              disabled={imageUploading}
            />
            {profileImage && (
              <img
                src={profileImage}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Restaurant Name */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Restaurant Name</label><br />
            <input
              type="text"
              value={user?.displayName || "Demo Restaurant"}
              readOnly
              className="input input-bordered bg-base-200"
            />
          </div>

          {/* Restaurant Email */}
          <div className="form-control">
            <label className="label text-secondary font-semibold">Restaurant Email</label><br />
            <input
              type="email"
              value={user?.email || "demo@example.com"}
              readOnly
              className="input input-bordered bg-base-200"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn bg-primary w-full mt-4" disabled={imageUploading}>
            {imageUploading ? "Uploading Image..." : "Add Donation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;
