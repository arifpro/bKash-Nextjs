"use client";

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import axios from "axios";
import { CreditCard, LucideProps } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

export type PaymentMethodType = {
  id: string;
  type: string;
  last4?: string;
  phoneNumber?: string;
  icon:
    | string
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
  isDisabled: boolean;
};

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch payment methods
    const fetchPaymentMethods = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/payment-methods");

        if (res?.data?.methods?.length) {
          const paymentMethodsData: PaymentMethodType[] = [
            {
              id: "visa",
              type: "Visa",
              last4: "3243",
              icon: CreditCard,
              isDisabled: true,
            },
            // {
            //   id: "bkash",
            //   type: "bKash",
            //   phoneNumber: "01770618575",
            //   icon: "/bKash-Logo.svg",
            //   isDisabled: false,
            // },
          ];

          res.data?.methods?.forEach(
            (method: { payerReference: string; _id: string }) => {
              paymentMethodsData.push({
                id: `bkash-${method._id}`,
                type: "bKash",
                phoneNumber: method.payerReference,
                icon: "/bKash-Logo.svg",
                isDisabled: false,
              });
            }
          );

          setPaymentMethods(paymentMethodsData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-4">
      {isLoading ? (
        <PaymentMethodsSkeleton />
      ) : paymentMethods.length === 0 ? (
        <div className="text-center text-gray-600">
          No payment methods found.
          <br />
          Please add a payment method to continue.
          <br />
          <Link href="/doc.pdf" passHref className="underline" target="_blank">
            See the list
          </Link>
        </div>
      ) : (
        paymentMethods?.map((method) => (
          <div
            key={method.id}
            className={`
        flex items-center justify-between p-2 border rounded-lg cursor-pointer
        ${
          selectedMethod?.id === method.id
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
            selectedMethod?.id === method.id
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300"
          }
        `}
            />
          </div>
        ))
      )}

      <CheckoutButton selectedMethod={selectedMethod} />
    </div>
  );
}

const PaymentMethodsSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between p-2 border border-gray-300 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            {/* Icon/Logo Skeleton */}
            <div className="bg-gray-300 rounded-full w-8 h-8" />

            <div className="space-y-2">
              {/* Payment Method Text Skeleton */}
              <div className="h-4 bg-gray-300 rounded w-32" />
            </div>
          </div>

          {/* Radio Button Skeleton */}
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
        </div>
      ))}
    </div>
  );
};
