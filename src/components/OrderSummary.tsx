export default function OrderSummary() {
  return (
    <div className="bg-white w-full">
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
    </div>
  );
}
