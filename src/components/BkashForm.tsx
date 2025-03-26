"use client";

export default function BkashForm({
  bkashNumber,
  onChange,
}: {
  bkashNumber: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        bKash Wallet Number
      </label>
      <input
        type="text"
        value={bkashNumber}
        onChange={(e) => onChange(e.target.value)}
        placeholder="+8801XXXXXXXXX"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
      />
    </div>
  );
}
