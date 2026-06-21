import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      {
        id: "69a97218852ad97300de2ced",
        name: "Premium Monthly Subscription",
        description: "Unlock premium features in GlobalEconomy on a monthly basis.",
        price_in_pi: 1,
        total_quantity: 1000000,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
  });
}
