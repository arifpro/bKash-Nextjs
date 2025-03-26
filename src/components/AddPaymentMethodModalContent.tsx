"use client";

import React, { useState } from "react";

// components
import CreditCardForm from "./CreditCardForm";
import BkashForm from "./BkashForm";
import PaymentMethodButton from "./PaymentMethodButton";

// data
import { paymentMethods } from "@/data";

export default function AddPaymentMethodModalContent() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    postcode: "",
  });
  const [bkashNumber, setBkashNumber] = useState("");

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
          <div className="mt-6 flex justify-between items-center gap-4">
            <button
              onClick={() => setSelectedMethod(null)}
              className="text-blue-600 hover:underline"
            >
              ← Change Payment Method
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              disabled={
                selectedMethod === "card"
                  ? !cardDetails.cardNumber ||
                    !cardDetails.expiration ||
                    !cardDetails.cvv ||
                    !cardDetails.postcode
                  : !bkashNumber
              }
            >
              Add Payment Method
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
