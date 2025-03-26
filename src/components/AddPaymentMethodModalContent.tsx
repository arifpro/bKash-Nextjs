"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// components
import CreditCardForm from "./CreditCardForm";
import BkashForm from "./BkashForm";
import PaymentMethodButton from "./PaymentMethodButton";

// data
import { paymentMethods } from "@/data";

export default function AddPaymentMethodModalContent() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    postcode: "",
  });
  const [bkashNumber, setBkashNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderPaymentMethodForm = () => {
    switch (selectedMethod) {
      case "card":
        return (
          <CreditCardForm
            cardDetails={cardDetails}
            onChange={handleCardDetailsChange}
          />
        );
      case "bkash":
        return (
          <BkashForm bkashNumber={bkashNumber} onChange={setBkashNumber} />
        );
      default:
        return null;
    }
  };

  const handleBkashPaymentMethod = async () => {
    setIsProcessing(true);
    try {
      const paymentData = {
        phone: bkashNumber,
        paymentMode: "add", // add to my payment method list
      };

      const res = await axios.post("/api/payment", paymentData);

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

  const handleCardPaymentMethod = () => {
    console.log("Card Details", cardDetails);
  };

  const handleAddPaymentMethod = () => {
    if (selectedMethod === "card") {
      handleCardPaymentMethod();
    } else if (selectedMethod === "bkash") {
      handleBkashPaymentMethod();
    }
  };

  const isDisabled =
    selectedMethod === "card"
      ? !cardDetails.cardNumber ||
        !cardDetails.expiration ||
        !cardDetails.cvv ||
        !cardDetails.postcode
      : !bkashNumber;

  return (
    <div>
      {!selectedMethod ? (
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <PaymentMethodButton
              key={method.id}
              method={method}
              onClick={() => setSelectedMethod(method.id)}
            />
          ))}
        </div>
      ) : (
        <div>
          {renderPaymentMethodForm()}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-6 flex justify-between items-center gap-4">
            <button
              onClick={() => setSelectedMethod(null)}
              className="text-blue-600 hover:underline"
            >
              ← Change Payment Method
            </button>
            <button
              className={`
                ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 cursor-pointer"
                }
                text-white px-6 py-2 rounded-lg
              `}
              disabled={isDisabled || isProcessing}
              onClick={handleAddPaymentMethod}
            >
              {isProcessing ? "Processing..." : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
