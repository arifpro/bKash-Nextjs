"use client";

import { PaymentMethodType } from "./PaymentMethod";

type Props = {
  selectedMethod: PaymentMethodType;
};

export default function CheckoutButton({ selectedMethod }: Props) {
  const isDisabled =
    selectedMethod === null ||
    selectedMethod === undefined ||
    selectedMethod.isDisabled;

  return (
    <div className="flex justify-end">
      <button
        className={`
          mt-4 block text-white font-bold py-2 px-4 rounded-md text-center max-w-xs
          ${
            isDisabled
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }
        `}
        onClick={() => alert("Confirmed")}
        disabled={isDisabled}
      >
        Confirm Order
      </button>
    </div>
  );
}
