"use client";

import React, { useState } from "react";
import { Modal } from "./common";

export default function AddPaymentMethod() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    alert(`Confirmed with input: ${inputValue}`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-center max-w-xs"
      >
        Add Payment Method
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        onConfirm={handleConfirm}
      >
        <input
          type="text"
          placeholder="Enter some text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-sm text-slate-600">
          This is a simple modal with an input field.
        </p>
      </Modal>
    </div>
  );
}
