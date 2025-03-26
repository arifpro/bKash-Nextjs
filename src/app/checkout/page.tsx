import { AddPaymentMethod, OrderSummary, PaymentMethod } from "@/components";

export default function CheckoutPage() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden sm:min-w-sm min-w-xs flex flex-col items-center">
      <OrderSummary />

      <div className="mt-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <PaymentMethod />
      </div>

      <hr className="w-full border border-gray-200 my-6" />

      <p>Or</p>

      <AddPaymentMethod />
    </div>
  );
}
