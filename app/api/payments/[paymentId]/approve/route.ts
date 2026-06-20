import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { paymentId } = await params;

  try {
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Approve failed:", response.status, errText);
      return NextResponse.json(
        { error: "Failed to approve payment" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Approve error:", error);
    return NextResponse.json(
      { error: "Approve failed" },
      { status: 500 }
    );
  }
}
