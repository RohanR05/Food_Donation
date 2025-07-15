import React, { useState, useEffect, useContext } from "react";
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

// Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

// -------------- Payment Form Component --------------
const CharityPaymentForm = ({ userData }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  // Get clientSecret from backend
  const { data: clientSecret, isLoading } = useQuery({
    queryKey: ["payment-intent"],
    queryFn: async () => {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: 2500,
      });
      return res.data.clientSecret;
    },
    enabled: !!userData?.email,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentMethod, error: methodError } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (methodError) {
      Swal.fire("Error", methodError.message, "error");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post("/charity-requests", {
          name: userData.name || "No Name",
          email: userData.email,
          organization: userData.organization,
          mission: userData.mission,
          paymentAmount: 25,
          paymentId: paymentIntent.id,
          status: "pending",
          requestedAt: new Date().toISOString(),
        });

        Swal.fire("Success", "Charity request submitted!", "success");
      } catch (error) {
        console.error("Request save failed:", error);
        Swal.fire("Error", "Failed to save charity request", "error");
      }
    }
  };

  return isLoading ? (
    <p className="text-center text-gray-500">Preparing payment...</p>
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

// -------------- Main Component --------------
const RequestCharityRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user already requested charity role
  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosSecure.get("/charity-requests");
        const match = res.data.find(
          (r) =>
            r.email === user.email &&
            (r.status === "pending" || r.status === "approved")
        );

        setHasRequested(!!match);
      } catch (err) {
        console.error("Failed to check existing request", err);
      } finally {
        setLoading(false);
      }
    };

    checkExistingRequest();
  }, [user, axiosSecure]);

  const onSubmit = (data) => {
    setFormData(data);
    setFormSubmitted(true);
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Checking request status...</p>;
  }

  if (hasRequested) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10 text-center bg-base-200 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-secondary mb-4">Request Already Submitted</h2>
        <p className="text-gray-700">
          You already submitted a charity role request. Please wait for admin approval.
        </p>
      </div>
    );
  }

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

          {/* Organization */}
          <div className="form-control">
            <label className="label font-semibold">Organization</label><br />
            <input
              type="text"
              {...register("organization", { required: true })}
              placeholder="Organization name"
              className="input input-bordered"
            />
            {errors.organization && (
              <span className="text-error text-sm">
                Organization is required
              </span>
            )}
          </div>

          {/* Mission */}
          <div className="form-control">
            <label className="label font-semibold">Mission Statement</label><br />
            <textarea
              {...register("mission", { required: true })}
              placeholder="Your mission statement"
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
