import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const piAuthToken = body?.pi_auth_token;

    if (!piAuthToken) {
      return NextResponse.json(
        { error: "Missing pi_auth_token" },
        { status: 400 }
      );
    }

    const meResponse = await fetch("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${piAuthToken}`,
      },
    });

    if (!meResponse.ok) {
      return NextResponse.json(
        { error: "Invalid Pi auth token" },
        { status: 401 }
      );
    }

    const piUser = await meResponse.json();

    return NextResponse.json({
      id: piUser.uid,
      username: piUser.username,
      credits_balance: 0,
      terms_accepted: true,
      app_id: process.env.NEXT_PUBLIC_PI_APP_ID || "globaleconomy",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
