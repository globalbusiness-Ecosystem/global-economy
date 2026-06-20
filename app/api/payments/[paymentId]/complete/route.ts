import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { paymentId } = await params;

  try {
    const body = await request.json();
    const txid = body?.txid;

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txid }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Complete failed:", response.status, errText);
      return NextResponse.json(
        { error: "Failed to complete payment" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Complete error:", error);
    return NextResponse.json(
      { error: "Complete failed" },
      { status: 500 }
    );
  }
}
