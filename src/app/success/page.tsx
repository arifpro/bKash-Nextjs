"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const trxId = searchParams.get("trxID");
  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency");

  const goToHome = async () => {
    router.push("/");
  };

  if (!trxId || !amount || !currency) {
    goToHome();
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-16 h-16 text-green-600 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="text-gray-600">
            <span className="font-semibold">Transaction ID:</span> {trxId}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Amount:</span> {amount} {currency}
          </p>
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
          onClick={goToHome}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
