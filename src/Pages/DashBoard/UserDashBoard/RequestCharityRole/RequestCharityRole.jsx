import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

// Payment form using Stripe Elements
const CharityPaymentForm = ({ userData }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  // Get client secret via TanStack Query
  const { data: clientSecret, isLoading } = useQuery({
    queryKey: ["payment-intent"],
    queryFn: async () => {
      const res = await axiosSecure.post("/create-payment-intent", { amount: 2500 });
      return res.data.clientSecret;
    },
    enabled: !!userData?.email,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentMethod, error: paymentMethodError } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      console.error(paymentMethodError);
      Swal.fire("Payment Error", paymentMethodError.message, "error");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error(confirmError);
      Swal.fire("Payment Failed", confirmError.message, "error");
    } else if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post("/charity-requests", {
          ...userData,
          paymentAmount: 25,
          paymentId: paymentIntent.id,
          status: "pending",
          requestedAt: new Date().toISOString(),
        });

        Swal.fire(
          "Success",
          "Charity request and payment successful!",
          "success"
        );
      } catch (err) {
        console.error("Save charity request failed:", err);
        Swal.fire("Error", "Failed to save request!", "error");
      }
    }
  };

  return isLoading ? (
    <p className="text-center text-sm text-gray-500">Preparing payment...</p>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
        className="border p-3 rounded"
      />
      <button
        type="submit"
        className="btn bg-primary w-full mt-4"
        disabled={!stripe || !clientSecret}
      >
        Pay $25 & Submit Request
      </button>
    </form>
  );
};

const RequestCharityRole = () => {
  const { user } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    setFormData(data);
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
        Request Charity Role
      </h2>

      {!formSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="form-control">
            <label className="label font-semibold">Your Name</label><br />
            <input
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="input input-bordered bg-base-200"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label font-semibold">Email</label><br />
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="input input-bordered bg-base-200"
            />
          </div>

          {/* Organization Name */}
          <div className="form-control">
            <label className="label font-semibold">Organization Name</label><br />
            <input
              type="text"
              {...register("organization", { required: true })}
              placeholder="Your organization name"
              className="input input-bordered"
            />
            {errors.organization && (
              <span className="text-error text-sm">
                Organization name is required
              </span>
            )}
          </div>

          {/* Mission Statement */}
          <div className="form-control">
            <label className="label font-semibold">Mission Statement</label><br />
            <textarea
              {...register("mission", { required: true })}
              placeholder="Describe your mission"
              className="textarea textarea-bordered"
              rows={4}
            />
            {errors.mission && (
              <span className="text-error text-sm">
                Mission statement is required
              </span>
            )}
          </div>

          <p className="text-lg font-semibold text-center text-secondary">
            You need to pay <span className="text-red-600">$25</span> to request
            the Charity role.
          </p>

          <button type="submit" className="btn bg-primary w-full">
            Proceed to Payment
          </button>
        </form>
      ) : (
        <Elements stripe={stripePromise}>
          <CharityPaymentForm
            userData={{
              name: user?.displayName,
              email: user?.email,
              ...formData,
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default RequestCharityRole;
