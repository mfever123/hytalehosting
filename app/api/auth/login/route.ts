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

    // TCAdmin API doesn't support user lookup by username
    // We have two strategies:
    // 1. If the input looks like a number, try it as a user ID
    // 2. Otherwise, try to find the user through the service API

    let userId: string | null = null;
    let username = email;

    // Check if the input is a numeric user ID
    if (/^\d+$/.test(email)) {
      console.log(`[Login] Input appears to be a user ID: ${email}`);
      
      // Verify the user exists by fetching their profile
      const userResponse = await fetch(`${TCADMIN_API_URL}/api/user/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      });

      const userText = await userResponse.text();
      console.log(`[Login] User lookup response: ${userText.substring(0, 300)}`);

      if (userResponse.ok) {
        try {
          const userData = JSON.parse(userText);
          if (userData.Success && userData.Result) {
            userId = email;
            username = userData.Result.UserName || userData.Result.user_name || email;
            console.log(`[Login] Found user by ID: ${username}`);
          }
        } catch (e) {
          console.log(`[Login] Failed to parse user response`);
        }
      }
    } else {
      // Try to find user through services - look for services owned by this username
      console.log(`[Login] Trying to find user via services API...`);
      
      // First, let's try getting all services and filtering by owner
      const servicesEndpoints = [
        `${TCADMIN_API_URL}/api/service`,
        `${TCADMIN_API_URL}/api/service/list`,
      ];

      for (const endpoint of servicesEndpoints) {
        console.log(`[Login] Trying services endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api_key": TCADMIN_API_KEY,
          },
        });

        const responseText = await response.text();
        console.log(`[Login] Services response status: ${response.status}`);
        console.log(`[Login] Services response preview: ${responseText.substring(0, 500)}`);

        if (response.ok) {
          try {
            const data = JSON.parse(responseText);
            if (data.Success && data.Result) {
              const services = Array.isArray(data.Result) ? data.Result : [data.Result];
              
              // Find a service owned by this username
              const userService = services.find((svc: Record<string, unknown>) => {
                const ownerName = String(svc.UserName || svc.user_name || svc.OwnerName || "").toLowerCase();
                return ownerName === email.toLowerCase();
              });

              if (userService) {
                userId = String(userService.UserId || userService.user_id || userService.OwnerId || userService.owner_id);
                username = String(userService.UserName || userService.user_name || email);
                console.log(`[Login] Found user via service - ID: ${userId}, Username: ${username}`);
                break;
              }
            }
          } catch (e) {
            console.log(`[Login] Failed to parse services response`);
          }
        }
      }
    }

    // If we still don't have a user ID, try one more thing:
    // See if we can get a list of all users
    if (!userId) {
      console.log(`[Login] Trying to list all users...`);
      
      const usersResponse = await fetch(`${TCADMIN_API_URL}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      });

      const usersText = await usersResponse.text();
      console.log(`[Login] Users list response: ${usersText.substring(0, 500)}`);

      if (usersResponse.ok) {
        try {
          const usersData = JSON.parse(usersText);
          if (usersData.Success && usersData.Result) {
            const users = Array.isArray(usersData.Result) ? usersData.Result : [usersData.Result];
            
            const matchedUser = users.find((u: Record<string, unknown>) => {
              const uname = String(u.UserName || u.user_name || "").toLowerCase();
              return uname === email.toLowerCase();
            });

            if (matchedUser) {
              userId = String(matchedUser.UserId || matchedUser.user_id || matchedUser.Id);
              username = String(matchedUser.UserName || matchedUser.user_name || email);
              console.log(`[Login] Found user in users list - ID: ${userId}, Username: ${username}`);
            }
          }
        } catch (e) {
          console.log(`[Login] Failed to parse users list`);
        }
      }
    }

    if (!userId) {
      console.log(`[Login] Could not find user: ${email}`);
      console.log(`[Login] TIP: Try logging in with your TCAdmin User ID (a number) instead of username`);
      return NextResponse.json(
        { error: "User not found. Try using your TCAdmin User ID instead of username." },
        { status: 401 }
      );
    }

    console.log(`[Login] Login successful - UserID: ${userId}, Username: ${username}`);

    return NextResponse.json({
      success: true,
      token: userId,
      user: {
        id: userId,
        username: username,
        email: "",
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
