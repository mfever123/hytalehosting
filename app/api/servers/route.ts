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

    // TCAdmin API structure: /api/service returns all services
    // We then filter by user ID on our side
    const endpoints = [
      `${TCADMIN_API_URL}/api/service`,
      `${TCADMIN_API_URL}/api/service/list`,
    ];

    let allServices: Record<string, unknown>[] = [];
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
      console.log(`[Servers] Response status: ${response.status}`);
      console.log(`[Servers] Response preview: ${responseText.substring(0, 500)}`);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          
          if (data.Success && data.Result) {
            allServices = Array.isArray(data.Result) ? data.Result : [data.Result];
            successEndpoint = endpoint;
            console.log(`[Servers] Got ${allServices.length} total services from: ${endpoint}`);
            break;
          } else if (Array.isArray(data)) {
            allServices = data;
            successEndpoint = endpoint;
            console.log(`[Servers] Got ${allServices.length} services (array) from: ${endpoint}`);
            break;
          }
        } catch (parseError) {
          console.log(`[Servers] Failed to parse response from ${endpoint}`);
        }
      }
    }

    // Filter services by user ID
    const userIdNum = parseInt(userId, 10);
    console.log(`[Servers] Filtering services for user ID: ${userIdNum}`);
    
    const userServices = allServices.filter((service) => {
      const serviceUserId = service.UserId || service.user_id || service.OwnerId || service.owner_id;
      const matches = serviceUserId === userIdNum || serviceUserId === userId;
      if (matches) {
        console.log(`[Servers] Found matching service: ${service.ServiceId || service.DisplayName}`);
      }
      return matches;
    });

    console.log(`[Servers] Found ${userServices.length} services for user ${userId}`);

    if (userServices.length === 0 && allServices.length > 0) {
      // Log a sample service to see the structure
      console.log(`[Servers] Sample service structure:`, JSON.stringify(allServices[0], null, 2).substring(0, 500));
    }

    // Transform server data for our dashboard
    const transformedServers = userServices.map((server) => ({
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
    }));

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
