import { NextRequest, NextResponse } from "next/server";

const TCADMIN_API_URL = process.env.TCADMIN_API_URL || "https://gamepanel.gtxgaming.co.uk";
const TCADMIN_API_KEY = process.env.TCADMIN_API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    // Get user ID from authorization header (we store user_id as token)
    const authHeader = request.headers.get("Authorization");
    const userId = authHeader?.replace("Bearer ", "");

    console.log(`[Servers] Fetching servers for user ID: ${userId}`);

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Try multiple endpoints to find the user's services
    const endpoints = [
      `${TCADMIN_API_URL}/api/service/find?user_id=${userId}`,
      `${TCADMIN_API_URL}/api/service/find?owner_id=${userId}`,
      `${TCADMIN_API_URL}/api/service?user_id=${userId}`,
      `${TCADMIN_API_URL}/api/service/list?user_id=${userId}`,
    ];

    let servers: unknown[] = [];
    let successEndpoint = "";

    for (const endpoint of endpoints) {
      console.log(`[Servers] Trying endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      });

      const responseText = await response.text();
      console.log(`[Servers] Response from ${endpoint}: ${response.status} - ${responseText.substring(0, 500)}`);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          
          if (data.Success && data.Result) {
            servers = Array.isArray(data.Result) ? data.Result : [data.Result];
            successEndpoint = endpoint;
            console.log(`[Servers] Found ${servers.length} servers from: ${endpoint}`);
            break;
          } else if (Array.isArray(data)) {
            servers = data;
            successEndpoint = endpoint;
            console.log(`[Servers] Found ${servers.length} servers (array) from: ${endpoint}`);
            break;
          }
        } catch (parseError) {
          console.log(`[Servers] Failed to parse response from ${endpoint}`);
        }
      }
    }

    if (servers.length === 0) {
      console.log(`[Servers] No servers found for user ${userId}`);
      // Return empty array instead of error - user might just have no servers
      return NextResponse.json({ servers: [] });
    }

    console.log(`[Servers] Successfully fetched servers from: ${successEndpoint}`);

    // Transform server data for our dashboard
    const transformedServers = (servers as Record<string, unknown>[]).map((server) => {
      const transformed = {
        id: server.ServiceId || server.service_id || server.Id || server.id,
        name: server.DisplayName || server.ConnectionInfo || server.display_name || server.Name || "Game Server",
        game: server.GameName || server.game_name || server.Game || "Unknown",
        status: getStatusString(server.ServiceStatus || server.Status || server.status),
        ip: server.IpAddress || server.ip_address || server.Ip || "",
        port: server.GamePort || server.game_port || server.Port || 0,
        slots: server.Slots || server.slots || server.MaxPlayers || 0,
        players: server.OnlinePlayers || server.online_players || server.CurrentPlayers || 0,
        location: server.Datacenter || server.datacenter || server.Location || "Unknown",
        cpu: server.CpuUsage || server.cpu_usage || 0,
        memory: server.MemoryUsage || server.memory_usage || server.MemoryPercent || 0,
        disk: server.DiskUsage || server.disk_usage || server.DiskPercent || 0,
        startedAt: server.StartedOn || server.started_on || server.StartTime || null,
      };
      console.log(`[Servers] Transformed server:`, transformed);
      return transformed;
    });

    return NextResponse.json({ servers: transformedServers });
  } catch (error) {
    console.error("[Servers] Fetch error:", error);
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
