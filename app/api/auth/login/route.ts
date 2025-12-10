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

    // Step 1: Find the user by username using TCAdmin API
    const userSearchUrl = `${TCADMIN_API_URL}/api/user/find?user_name=${encodeURIComponent(email)}`;
    console.log(`[Login] Searching for user at: ${userSearchUrl}`);

    const userResponse = await fetch(userSearchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api_key": TCADMIN_API_KEY,
      },
    });

    const userResponseText = await userResponse.text();
    console.log(`[Login] User search response status: ${userResponse.status}`);
    console.log(`[Login] User search response: ${userResponseText}`);

    if (!userResponse.ok) {
      // Try alternative endpoint
      console.log(`[Login] Primary search failed, trying alternative...`);
      
      const altUrl = `${TCADMIN_API_URL}/api/user?user_name=${encodeURIComponent(email)}`;
      const altResponse = await fetch(altUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      });

      const altText = await altResponse.text();
      console.log(`[Login] Alt response: ${altText}`);

      if (!altResponse.ok) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 401 }
        );
      }
    }

    let userData;
    try {
      userData = JSON.parse(userResponseText);
    } catch {
      console.error(`[Login] Failed to parse response as JSON`);
      return NextResponse.json(
        { error: "Invalid response from authentication server" },
        { status: 500 }
      );
    }

    console.log(`[Login] Parsed user data:`, JSON.stringify(userData, null, 2));

    // Extract user from the response
    // TCAdmin returns { Success: true, Message: "", Result: { ... } } or Result could be an array
    let user = null;
    
    if (userData.Success && userData.Result) {
      if (Array.isArray(userData.Result)) {
        // Find the user with matching username (case-insensitive)
        user = userData.Result.find((u: Record<string, unknown>) => 
          (u.UserName as string)?.toLowerCase() === email.toLowerCase() ||
          (u.user_name as string)?.toLowerCase() === email.toLowerCase()
        );
        console.log(`[Login] Found user in array:`, user);
      } else {
        user = userData.Result;
        console.log(`[Login] User is single object:`, user);
      }
    }

    if (!user) {
      console.log(`[Login] No user found for: ${email}`);
      return NextResponse.json(
        { error: "User not found" },
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

    // Note: TCAdmin API doesn't have a direct password validation endpoint
    // The password check happens on the web panel side
    // For this integration, we're trusting that the user exists
    // In production, you'd want to either:
    // 1. Use TCAdmin's OAuth if available
    // 2. Have users log in through TCAdmin directly and use session tokens
    // 3. Set up a custom validation endpoint

    // For now, we'll proceed with the found user
    // TODO: Add proper password validation when TCAdmin endpoint is identified

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
