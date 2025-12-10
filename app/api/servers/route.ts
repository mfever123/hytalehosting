import { NextRequest, NextResponse } from "next/server";

const TCADMIN_API_URL = process.env.TCADMIN_API_URL || "https://gamepanel.gtxgaming.co.uk";
const TCADMIN_API_KEY = process.env.TCADMIN_API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    // Get user ID from authorization header (we store user_id as token)
    const authHeader = request.headers.get("Authorization");
    const userId = authHeader?.replace("Bearer ", "");

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Fetch user's services from TCAdmin using the correct api_key header
    const response = await fetch(
      `${TCADMIN_API_URL}/api/service/find?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("TCAdmin servers error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch servers" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.Success) {
      return NextResponse.json(
        { error: data.Message || "Failed to fetch servers" },
        { status: 500 }
      );
    }

    // Transform server data for our dashboard
    const servers = Array.isArray(data.Result) ? data.Result : [];
    const transformedServers = servers.map((server: Record<string, unknown>) => ({
      id: server.ServiceId || server.service_id,
      name: server.DisplayName || server.ConnectionInfo || server.display_name || "Game Server",
      game: server.GameName || server.game_name || "Unknown",
      status: getStatusString(server.ServiceStatus || server.Status || server.status),
      ip: server.IpAddress || server.ip_address || "",
      port: server.GamePort || server.game_port || 0,
      slots: server.Slots || server.slots || 0,
      players: server.OnlinePlayers || server.online_players || 0,
      location: server.Datacenter || server.datacenter || "Unknown",
      cpu: server.CpuUsage || server.cpu_usage || 0,
      memory: server.MemoryUsage || server.memory_usage || 0,
      disk: server.DiskUsage || server.disk_usage || 0,
      startedAt: server.StartedOn || server.started_on || null,
    }));

    return NextResponse.json({ servers: transformedServers });
  } catch (error) {
    console.error("Servers fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch servers" },
      { status: 500 }
    );
  }
}

// Convert TCAdmin status codes to readable strings
function getStatusString(status: unknown): string {
  if (typeof status === "string") return status;
  
  // TCAdmin status codes
  switch (status) {
    case 1:
      return "Running";
    case 2:
      return "Starting";
    case 3:
      return "Stopping";
    case 0:
    case 4:
      return "Stopped";
    default:
      return "Unknown";
  }
}
