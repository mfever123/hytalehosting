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

    console.log(`[Login] Attempting login for user: ${email}`);

    // Try multiple endpoint formats to find the user
    const endpoints = [
      // Query parameter format
      `${TCADMIN_API_URL}/api/user?user_name=${encodeURIComponent(email)}`,
      // Alternative query formats
      `${TCADMIN_API_URL}/api/user?username=${encodeURIComponent(email)}`,
      `${TCADMIN_API_URL}/api/user?name=${encodeURIComponent(email)}`,
      // With method parameter
      `${TCADMIN_API_URL}/api/user/getbyname?user_name=${encodeURIComponent(email)}`,
      `${TCADMIN_API_URL}/api/user/search?user_name=${encodeURIComponent(email)}`,
    ];

    let userData = null;
    let successEndpoint = "";

    for (const endpoint of endpoints) {
      console.log(`[Login] Trying endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      });

      const responseText = await response.text();
      console.log(`[Login] Response from ${endpoint}: ${response.status} - ${responseText.substring(0, 300)}`);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          
          if (data.Success && data.Result) {
            userData = data;
            successEndpoint = endpoint;
            console.log(`[Login] Success from: ${endpoint}`);
            break;
          }
        } catch (parseError) {
          console.log(`[Login] Failed to parse response from ${endpoint}`);
        }
      }
    }

    if (!userData) {
      console.log(`[Login] Could not find user: ${email}`);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log(`[Login] Found user data from: ${successEndpoint}`);
    console.log(`[Login] User data:`, JSON.stringify(userData, null, 2));

    // Extract user from the response
    let user = null;
    
    if (Array.isArray(userData.Result)) {
      // Find the user with matching username (case-insensitive)
      user = userData.Result.find((u: Record<string, unknown>) => 
        String(u.UserName || u.user_name || "").toLowerCase() === email.toLowerCase()
      );
      console.log(`[Login] Found user in array:`, user);
    } else if (typeof userData.Result === "object") {
      user = userData.Result;
      console.log(`[Login] User is single object:`, user);
    }

    if (!user) {
      console.log(`[Login] No matching user found for: ${email}`);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Get the user ID - TCAdmin uses various field names
    const userId = user.UserId || user.user_id || user.Id || user.id;
    const username = user.UserName || user.user_name || user.Name || email;
    const userEmail = user.Email || user.email || "";

    console.log(`[Login] Extracted - UserId: ${userId}, Username: ${username}, Email: ${userEmail}`);

    if (!userId) {
      console.error(`[Login] Could not extract user ID from response`);
      return NextResponse.json(
        { error: "Could not identify user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      token: String(userId),
      user: {
        id: userId,
        username: username,
        email: userEmail,
      },
    });

  } catch (error) {
    console.error("[Login] Error:", error);
    return NextResponse.json(
      { error: "Authentication service unavailable" },
      { status: 500 }
    );
  }
}
