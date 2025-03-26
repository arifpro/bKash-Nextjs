"use server";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Bkash from "@/models/bkashToken";
import { bkashConfig } from "@/config/env";
import connectDb from "@/config/db";
import BkashAgreement from "@/models/bkashAgreement";

connectDb();

interface PaymentDetails {
  amount: number; // product price in BDT
  callbackURL: string; // URL to redirect after payment
  orderID?: string; // unique order ID
  reference?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface TokenResponse {
  token_type: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
}

const API_BASE = "/tokenized/checkout";
const commonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Core request handler
const makeBkashRequest = async (
  endpoint: string,
  data: object,
  _headers?: object
) => {
  try {
    const url = `${bkashConfig.baseUrl}${endpoint}`;
    const headers = {
      ...commonHeaders,
      ...(_headers || {
        authorization: await handleToken(),
        "x-app-key": bkashConfig.appKey,
      }),
    };

    console.log(">>>url", url);
    console.log(">>>data", data);

    const response = await axios.post(url, data, { headers });

    return response.data;
  } catch (error) {
    console.error(`Bkash API Error [${endpoint}]:`, error);
    // throw error;
    return error;
  }
};

// Token management
const handleToken = async () => {
  const existingToken = await Bkash.findOne({});

  // if (!existingToken || existingToken.updatedAt < Date.now() - TOKEN_EXPIRY) {
  //   return grantToken(config);
  // }

  if (!existingToken || existingToken?.accessTokenExpiresAt < Date.now()) {
    return grantToken();
  } else if (existingToken?.refreshTokenExpiresAt < Date.now()) {
    return refreshToken(existingToken.refreshToken);
  }

  return existingToken.accessToken;
};

const grantToken = async () => {
  const data: TokenResponse = await makeBkashRequest(
    `${API_BASE}/token/grant`,
    {
      app_key: bkashConfig.appKey,
      app_secret: bkashConfig.appSecret,
    },
    {
      username: bkashConfig.username,
      password: bkashConfig.password,
    }
  );

  if (!data.id_token) throw new Error("Token not found");

  await Bkash.findOneAndUpdate(
    {},
    {
      accessToken: data.id_token,
      refreshToken: data.refresh_token,
      accessTokenExpiresAt: Date.now() + data.expires_in * 1000, // 1 hour
      refreshTokenExpiresAt: Date.now() + 2419200 * 1000, // 28 days
    },
    { upsert: true, new: true }
  );

  return data.id_token;
};

const refreshToken = async (refreshToken: string) => {
  type TokenResponse = {
    token_type: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
  };

  const data: TokenResponse = await makeBkashRequest(
    `${API_BASE}/token/refresh`,
    {
      app_key: bkashConfig.appKey,
      app_secret: bkashConfig.appSecret,
      refresh_token: refreshToken,
    },
    {
      username: bkashConfig.username,
      password: bkashConfig.password,
    }
  );

  if (!data.id_token) throw new Error("Token not found");

  await Bkash.findOneAndUpdate(
    {},
    {
      accessToken: data.id_token,
      refreshToken: data.refresh_token,
      accessTokenExpiresAt: Date.now() + data.expires_in,
    },
    { upsert: true, new: true }
  );

  return data.id_token;
};

export const createPayment = async (
  details: PaymentDetails,
  mode: "add" | "payment"
) => {
  if (!details.amount || details.amount < 1) throw new Error("Invalid amount");
  if (!details.callbackURL) throw new Error("callbackURL required");

  const paymentMode = mode === "add" ? "0000" : "0001";

  const payload: {
    mode: string;
    currency: string;
    intent: string;
    amount: number;
    callbackURL: string;
    payerReference: string;
    merchantInvoiceNumber: string;
    agreementID?: string;
  } = {
    mode: paymentMode, // 0011 for checkout, 0001 for payment, 0000 for agreement creation
    currency: "BDT",
    intent: "sale",
    amount: details.amount,
    callbackURL: details.callbackURL,
    payerReference: details.reference || "1", // If the wallet number is passed here, then it will be pre-populated in bKash's wallet number entry page.
    merchantInvoiceNumber: details.orderID || `Inv_${uuidv4().slice(0, 6)}`,
  };

  if (mode === "payment") {
    const agreement = await BkashAgreement.findOne({
      agreementStatus: "Completed",
      payerReference: details.reference,
    }).select("agreementID");

    if (!agreement) throw new Error("Agreement not found");

    payload.agreementID = agreement.agreementID;
  }

  return makeBkashRequest(`${API_BASE}/create`, payload);
};

export const executePayment = async (paymentID: string) =>
  makeBkashRequest(`${API_BASE}/execute`, { paymentID });

export const queryPayment = async (paymentID: string) =>
  makeBkashRequest(`${API_BASE}/payment/status`, { paymentID });

export const refundTransaction = async (bodyData: object) =>
  makeBkashRequest(`${API_BASE}/payment/refund`, bodyData);

export const searchTransaction = async (trxID: string) =>
  makeBkashRequest(`${API_BASE}/general/searchTransaction`, {
    trxID,
  });
