import { NextResponse, NextRequest } from "next/server";
import { executePayment } from "@/service/bkash";
import BkashAgreement from "@/models/bkashAgreement";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const paymentId = query.get("paymentID");
    const myUrl = req.nextUrl.origin;

    if (!paymentId) return NextResponse.redirect(`${myUrl}/cancel`, 303); // Redirect to the cancel page

    const executePaymentResponse = await executePayment(paymentId);

    console.log(">>>executePaymentResponse", executePaymentResponse);

    if (executePaymentResponse.statusCode !== "0000") {
      return NextResponse.redirect(`${myUrl}/cancel?mode=payment`, 303); // Redirect to the cancel page
    }

    // for agreement creation
    if (executePaymentResponse.agreementStatus === "Completed") {
      const agreement = new BkashAgreement({
        paymentID: executePaymentResponse.paymentID,
        agreementID: executePaymentResponse.agreementID,
        agreementStatus: executePaymentResponse.agreementStatus,
        agreementVoidTime: new Date(),
        payerReference: executePaymentResponse.payerReference,
      });

      await agreement.save();

      return NextResponse.redirect(`${myUrl}/checkout`, 303); // Redirect to the checkout page
    } else if (executePaymentResponse.agreementStatus === "Cancelled") {
      return NextResponse.redirect(`${myUrl}/cancel?mode=add`, 303); // Redirect to the cancel page
    }

    // >>>executePaymentResponse {
    //   paymentID: 'TR0001AblNpHl1742987158150',
    //   trxID: 'CCQ10MPE1J',
    //   transactionStatus: 'Completed',
    //   amount: '1000',
    //   currency: 'BDT',
    //   intent: 'sale',
    //   paymentExecuteTime: '2025-03-26T17:06:17:499 GMT+0600',
    //   merchantInvoiceNumber: 'txn_6f9f95a1-a',
    //   payerType: 'Customer',
    //   agreementID: 'TestnewAdmin41EUYJK1742987050489',
    //   payerReference: '01770618575',
    //   customerMsisdn: '01770618575',
    //   payerAccount: '01770618575',
    //   statusCode: '0000',
    //   statusMessage: 'Successful'
    // }

    const successParams = new URLSearchParams({
      // paymentID: executePaymentResponse.paymentID,
      trxID: executePaymentResponse.trxID,
      amount: executePaymentResponse.amount,
      currency: executePaymentResponse.currency,
    });

    return NextResponse.redirect(
      `${myUrl}/success?${successParams.toString()}`,
      303
    ); // Redirect to the success page
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
