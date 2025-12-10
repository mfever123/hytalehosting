import { NextRequest, NextResponse } from "next/server";

const TCADMIN_API_URL = process.env.TCADMIN_API_URL || "https://gamepanel.gtxgaming.co.uk";
const TCADMIN_API_KEY = process.env.TCADMIN_API_KEY || "";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("Authorization");
    const userToken = authHeader?.replace("Bearer ", "");

    if (!userToken) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { action } = await request.json();

    if (!["start", "stop", "restart"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use: start, stop, or restart" },
        { status: 400 }
      );
    }

    // Send power command to TCAdmin
    const response = await fetch(`${TCADMIN_API_URL}/api/services/${id}/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TCADMIN_API_KEY}`,
        "X-User-Token": userToken,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`TCAdmin ${action} error:`, errorText);
      return NextResponse.json(
        { error: `Failed to ${action} server` },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Server ${action} command sent successfully`,
    });
  } catch (error) {
    console.error("Power action error:", error);
    return NextResponse.json(
      { error: "Failed to execute power action" },
      { status: 500 }
    );
  }
}

