"use client";

import Image from "next/image";
import { Medthod } from "@/data";

export default function PaymentMethodButton({
  method,
  onClick,
}: {
  method: Medthod;
  onClick: () => void;
}) {
  return (
    <button
      key={method.id}
      onClick={onClick}
      className="w-full flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
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
  );
}
