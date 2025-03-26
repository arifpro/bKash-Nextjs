import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createPayment } from "@/service/bkash";

export async function POST(req: NextRequest) {
  try {
    const { phone, paymentMode } = await req.json();

    const myUrl = req.headers.get("origin");
    const paymentId = "txn_" + uuidv4().substring(0, 10);
    const amount = 1000;

    const paymentDetails = {
      amount: amount,
      callbackURL: `${myUrl}/api/callback`,
      orderID: paymentId,
      // reference: "1",
      reference: phone,
      name: "name from db",
      email: "email@from.db",
      phone: phone,
    };

    const createPaymentResponse = await createPayment(
      paymentDetails,
      paymentMode
    );
    console.log(">>>createPaymentResponse", createPaymentResponse);

    if (createPaymentResponse?.statusCode !== "0000") {
      return NextResponse.json({ message: "Payment Failed" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Payment Success",
      url: createPaymentResponse?.bkashURL,
    });
  } catch (error) {
    console.log(">>>error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
