"use client";

export default function CreditCardForm({
  cardDetails,
  onChange,
}: {
  cardDetails: {
    cardNumber: string;
    expiration: string;
    cvv: string;
    postcode: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
          onChange={onChange}
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
            onChange={onChange}
            placeholder="03/28"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={onChange}
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
            onChange={onChange}
            placeholder="10001"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
      </div>
    </div>
  );
}
