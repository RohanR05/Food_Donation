import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const RequestDonation = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/donation-requests", {
        ...data,
        status: "Requested",
        requestedAt: new Date().toISOString(),
      });

      if (response.data.insertedId) {
        Swal.fire("✅ Success", "Donation request submitted!", "success");
        reset();
      }
    } catch (error) {
      console.error("Failed to request donation:", error);
      Swal.fire("❌ Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] shadow-xl p-8 rounded-2xl mt-10 border border-[#f2ebe9]">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-[#0d1321] tracking-wide">
        🍽️ Request a Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Donation Title */}
        <div className="form-control">
          <label className="label font-semibold text-[#36213e]">
            Donation Title
          </label>
          <br />
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="e.g. Leftover Biryani"
            className="input input-bordered bg-[#fff9f5] text-[#2a1e2e] border-[#d4a5a5]"
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">Title is required</span>
          )}
        </div>

        {/* Restaurant Name */}
        <div className="form-control">
          <label className="label font-semibold text-[#423144]">
            Restaurant Name
          </label>
          <br />
          <input
            type="text"
            {...register("restaurant", { required: true })}
            placeholder="e.g. Foodies Heaven"
            className="input input-bordered bg-[#fff4e6] text-[#2a1e2e] border-[#ddb892]"
          />
          {errors.restaurant && (
            <span className="text-red-500 text-sm mt-1">
              Restaurant name is required
            </span>
          )}
        </div>

        {/* Food Type */}
        <div className="form-control">
          <label className="label font-semibold text-[#503047]">
            Food Type
          </label>
          <br />
          <input
            type="text"
            {...register("foodType", { required: true })}
            placeholder="e.g. Rice, Bread, Curry"
            className="input input-bordered bg-[#fcefee] text-[#3e2c41] border-[#d1a1bc]"
          />
          {errors.foodType && (
            <span className="text-red-500 text-sm mt-1">
              Food type is required
            </span>
          )}
        </div>

        {/* Quantity */}
        <div className="form-control">
          <label className="label font-semibold text-[#2d1e2f]">Quantity</label>
          <br />
          <input
            type="number"
            {...register("quantity", { required: true, min: 1 })}
            placeholder="e.g. 10 packs"
            className="input input-bordered bg-[#e4d6f1] text-[#261c2c] border-[#bfa2db]"
          />
          {errors.quantity && (
            <span className="text-red-500 text-sm mt-1">
              Enter a valid quantity
            </span>
          )}
        </div>
        <label className="block mb-1 font-semibold">Request Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="textarea textarea-bordered w-full mb-3"
          rows={4}
          placeholder="Add details about your request"
        />
        {errors.description && (
          <p className="text-red-600 mb-3">{errors.description.message}</p>
        )}

        <button
          type="submit"
          className="btn w-full mt-4 bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] text-white hover:from-[#5f3dc4] hover:to-[#229e71] shadow-md"
        >
          🚚 Submit Donation Request
        </button>
      </form>
    </div>
  );
};

export default RequestDonation;
