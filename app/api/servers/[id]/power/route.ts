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
    const userId = authHeader?.replace("Bearer ", "");

    if (!userId) {
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

    // Map action to TCAdmin endpoint
    const tcadminAction = action === "start" ? "start" : action === "stop" ? "stop" : "restart";

    // Send power command to TCAdmin using correct api_key header
    const response = await fetch(
      `${TCADMIN_API_URL}/api/service/${id}/${tcadminAction}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`TCAdmin ${action} error:`, errorText);
      return NextResponse.json(
        { error: `Failed to ${action} server` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.Success) {
      return NextResponse.json(
        { error: data.Message || `Failed to ${action} server` },
        { status: 500 }
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
