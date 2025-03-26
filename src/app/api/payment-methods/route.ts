import { NextResponse } from "next/server";
import BkashAgreement from "@/models/bkashAgreement";
import connectDb from "@/config/db";

connectDb();

export async function GET() {
  try {
    const methods = await BkashAgreement.find({}).select("payerReference");

    return NextResponse.json({ methods });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
