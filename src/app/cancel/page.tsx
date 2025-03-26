"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");

  const handleTryAgain = async () => {
    router.push("/checkout"); // checkout page
  };

  const goToHome = async () => {
    router.push("/");
  };

  if (!mode) {
    goToHome();
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              className="w-16 h-16 text-red-600 animate-shake"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {mode === "payment" ? "Payment Cancelled" : "Something went wrong"}
        </h1>
        <p className="text-gray-600 mb-6">
          {mode === "payment"
            ? "Your payment was not completed. You can try again or contact support if you need help."
            : "Something went wrong. Please try again or contact support if you need help."}
        </p>
        <div className="space-y-4">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
          <button
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-600 font-semibold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
            onClick={goToHome}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
