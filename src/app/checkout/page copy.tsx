"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    postcode: "",
  });
  const [bkashNumber, setBkashNumber] = useState("");

  const paymentMethods = [
    {
      id: "card",
      name: "Credit or debit card",
      icon: CreditCard,
      isDisabled: true,
    },
    {
      id: "bkash",
      name: "bKash",
      icon: "/bKash-Logo.svg",
      isDisabled: false,
    },
  ];

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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                placeholder="4353 3773 0293 3726"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiration
                </label>
                <input
                  type="text"
                  name="expiration"
                  value={cardDetails.expiration}
                  onChange={handleCardDetailsChange}
                  placeholder="03/28"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  placeholder="833"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postcode
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={cardDetails.postcode}
                  onChange={handleCardDetailsChange}
                  placeholder="10001"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            </div>
          </div>
        );
      case "bkash":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              bKash Wallet Number
            </label>
            <input
              type="text"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              placeholder="+8801XXXXXXXXX"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden sm:min-w-sm min-w-xs">
      {/* Order Summary */}
      <div className="bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-gray-500">Bangladesh</span>
            <span className="ml-2 text-gray-500">2 GB</span>
          </div>
          <div>
            <span className="text-xl font-bold">USD 4.99</span>
          </div>
        </div>
        <div className="text-gray-500 mb-2">
          <span>Validity: 7 days</span>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

          {!selectedMethod ? (
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className="w-full flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition"
                  disabled={method.isDisabled}
                >
                  <div className="flex items-center">
                    {typeof method.icon === "string" ? (
                      <Image
                        src={method.icon}
                        alt={method.name}
                        width={50}
                        height={50}
                        className="mr-3 w-8 h-8"
                      />
                    ) : (
                      <method.icon className="mr-3 text-gray-600 w-8 h-8 p-1" />
                    )}
                    <span>{method.name}</span>
                  </div>
                  <span>→</span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              {renderPaymentMethodForm()}
              <div className="mt-6 flex justify-between items-center">
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
                  Complete Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
