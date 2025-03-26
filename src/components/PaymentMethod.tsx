"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import CheckoutButton from "./CheckoutButton";

const paymentMethodsData = [
  {
    id: "visa",
    type: "Visa",
    last4: "3243",
    icon: CreditCard,
    isDisabled: true,
  },
  {
    id: "bkash",
    type: "bKash",
    phoneNumber: "+8801700000000",
    icon: "/bKash-Logo.svg",
    isDisabled: false,
  },
];

export type PaymentMethodType = (typeof paymentMethodsData)[0] &
  (typeof paymentMethodsData)[1];

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethodsData[0]);

  return (
    <div className="max-w-md mx-auto space-y-4">
      {paymentMethodsData.map((method) => (
        <div
          key={method.id}
          className={`
            flex items-center justify-between p-2 border rounded-lg cursor-pointer
            ${
              selectedMethod.id === method.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }
          `}
          onClick={() => setSelectedMethod(method)}
        >
          <div className="flex items-center space-x-3">
            {typeof method.icon === "string" ? (
              <Image
                src={method.icon}
                alt={method.type}
                width={50}
                height={50}
                className="mr-3 w-8 h-8"
              />
            ) : (
              <method.icon className="mr-3 text-gray-600 w-8 h-8 p-1" />
            )}
            <span className="font-medium text-gray-800">
              {method.type}
              {method.last4 && ` ****${method.last4}`}
              {method.phoneNumber && ` ${method.phoneNumber}`}
            </span>
          </div>
          <div
            className={`
              w-5 h-5 rounded-full border-2 
              ${
                selectedMethod.id === method.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }
            `}
          />
        </div>
      ))}

      <CheckoutButton selectedMethod={selectedMethod} />
    </div>
  );
}
