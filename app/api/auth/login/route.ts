import { NextRequest, NextResponse } from "next/server";

const TCADMIN_API_URL = process.env.TCADMIN_API_URL || "https://gamepanel.gtxgaming.co.uk";
const TCADMIN_API_KEY = process.env.TCADMIN_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Authenticate with TCAdmin API
    const authResponse = await fetch(`${TCADMIN_API_URL}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TCADMIN_API_KEY}`,
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error("TCAdmin auth error:", errorText);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const authData = await authResponse.json();

    // Return user data and token
    return NextResponse.json({
      success: true,
      token: authData.token || authData.access_token,
      user: {
        id: authData.user_id || authData.id,
        username: authData.username || email,
        email: authData.email || email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication service unavailable" },
      { status: 500 }
    );
  }
}

