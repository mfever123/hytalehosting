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

    // For TCAdmin, we validate credentials by attempting to get user info
    // The API key gives us admin access - we lookup the user by username
    const userResponse = await fetch(
      `${TCADMIN_API_URL}/api/user/me?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      }
    );

    // If the direct auth doesn't work, try looking up user by username
    if (!userResponse.ok) {
      // Try alternative: lookup user and validate
      const lookupResponse = await fetch(
        `${TCADMIN_API_URL}/api/user/find?user_name=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api_key": TCADMIN_API_KEY,
          },
        }
      );

      if (!lookupResponse.ok) {
        console.error("TCAdmin user lookup failed");
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }

      const lookupData = await lookupResponse.json();
      
      if (!lookupData.Success || !lookupData.Result) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 401 }
        );
      }

      // Return user data with a session token (using user_id as simple token)
      const user = lookupData.Result;
      return NextResponse.json({
        success: true,
        token: `${user.UserId || user.user_id}`,
        user: {
          id: user.UserId || user.user_id,
          username: user.UserName || user.user_name || email,
          email: user.Email || user.email || email,
        },
      });
    }

    const userData = await userResponse.json();

    if (!userData.Success) {
      return NextResponse.json(
        { error: userData.Message || "Authentication failed" },
        { status: 401 }
      );
    }

    // Return user data and token
    return NextResponse.json({
      success: true,
      token: `${userData.Result?.UserId || userData.Result?.user_id || "session"}`,
      user: {
        id: userData.Result?.UserId || userData.Result?.user_id,
        username: userData.Result?.UserName || email,
        email: userData.Result?.Email || email,
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
