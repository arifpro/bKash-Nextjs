"use client";

import React, { useState } from "react";
import { Modal } from "./common";
import AddPaymentMethodModalContent from "./AddPaymentMethodModalContent";

export default function AddPaymentMethod() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        title="Add Payment Method"
      >
        <AddPaymentMethodModalContent />
      </Modal>
    </div>
  );
}
