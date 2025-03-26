import { CreditCard } from "lucide-react";

export const paymentMethods = [
  {
    id: "card",
    name: "Credit or debit card",
    icon: CreditCard,
    isDisabled: false,
  },
  {
    id: "bkash",
    name: "bKash",
    icon: "/bKash-Logo.svg",
    isDisabled: false,
  },
];

export type Medthod = typeof paymentMethods[0] & typeof paymentMethods[1];
