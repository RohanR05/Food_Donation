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

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

// -------- Payment Form --------
const CharityPaymentForm = ({ userData }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } catch (err) {
        Swal.fire("Error", "Failed to save charity request", "error");
      }
    }
  };

  return isLoading ? (
    <p className="text-center text-gray-500">Preparing payment...</p>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
        className="p-4 border border-gray-300 rounded-lg shadow-sm"
      />
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-white bg-secondary hover:bg-secondary/90 transition"
        disabled={!stripe || !clientSecret}
      >
        Pay $25 & Submit Request
      </button>
    </form>
  );
};

// -------- Main Component --------
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

  useEffect(() => {
    const checkRequest = async () => {
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
        console.error("Check failed", err);
      } finally {
        setLoading(false);
      }
    };
    checkRequest();
  }, [user, axiosSecure]);

  const onSubmit = (data) => {
    setFormData(data);
    setFormSubmitted(true);
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Checking request status...
      </p>
    );
  }

  if (hasRequested) {
    return (
      <div className="max-w-xl mx-auto p-8 mt-10 text-center bg-white border border-gray-200 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Request Already Submitted
        </h2>
        <p className="text-gray-600">
          You have already requested a charity role. Please wait for admin
          approval.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white border border-gray-200 rounded-2xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
        Request Charity Role
      </h2>

      {!formSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="w-full input input-bordered bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="w-full input input-bordered bg-gray-100"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Organization
            </label>
            <input
              type="text"
              {...register("organization", { required: true })}
              placeholder="Organization name"
              className="w-full input input-bordered"
            />
            {errors.organization && (
              <p className="text-sm text-red-600 mt-1">
                Organization is required
              </p>
            )}
          </div>

          {/* Mission */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Mission Statement
            </label>
            <textarea
              {...register("mission", { required: true })}
              placeholder="Describe your mission"
              rows={4}
              className="w-full textarea textarea-bordered"
            />
            {errors.mission && (
              <p className="text-sm text-red-600 mt-1">
                Mission statement is required
              </p>
            )}
          </div>

          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              You need to pay{" "}
              <span className="font-bold text-red-600">$25</span> to request the
              Charity role.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-secondary hover:bg-secondary/90 transition"
          >
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
