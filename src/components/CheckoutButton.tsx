"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PaymentMethodType } from "./PaymentMethod";

type Props = {
  selectedMethod: PaymentMethodType;
};

export default function CheckoutButton({ selectedMethod }: Props) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleBkashPaymentMethod = async () => {
    setIsProcessing(true);
    try {
      const paymentData = {
        phone: selectedMethod.phoneNumber,
        paymentMode: "payment", // make payment with this number
      };

      const res = await axios.post("/api/make-payment", paymentData);

      if (res.data.url) {
        router.push(res.data.url);
      } else {
        console.error(res.data.error);
        setError(res.data.error);
      }
    } catch (error) {
      console.error(error);
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isDisabled =
    selectedMethod === null ||
    selectedMethod === undefined ||
    selectedMethod.isDisabled;

  return (
    <div className="flex justify-end">
      {error && (
        <div className="text-red-500 text-sm text-center mb-2">{error}</div>
      )}

      <button
        className={`
          mt-4 block text-white font-bold py-2 px-4 rounded-md text-center max-w-xs
          ${
            isDisabled
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-600 hover:bg-green-700 cursor-pointer"
          }
        `}
        onClick={handleBkashPaymentMethod}
        disabled={isDisabled || isProcessing}
      >
        {isProcessing ? "Processing..." : "Confirm Order"}
      </button>
    </div>
  );
}
