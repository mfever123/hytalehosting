import { NextRequest, NextResponse } from "next/server";

const TCADMIN_API_URL = process.env.TCADMIN_API_URL || "https://gamepanel.gtxgaming.co.uk";
const TCADMIN_API_KEY = process.env.TCADMIN_API_KEY || "";

export async function GET(
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

    // Fetch server details from TCAdmin using correct api_key header
    const response = await fetch(
      `${TCADMIN_API_URL}/api/service/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": TCADMIN_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Server not found" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.Success || !data.Result) {
      return NextResponse.json(
        { error: "Server not found" },
        { status: 404 }
      );
    }

    const server = data.Result;

    return NextResponse.json({
      id: server.ServiceId || server.service_id,
      name: server.DisplayName || server.ConnectionInfo || "Game Server",
      game: server.GameName || server.game_name || "Unknown",
      status: getStatusString(server.ServiceStatus || server.Status),
      ip: server.IpAddress || server.ip_address || "",
      port: server.GamePort || server.game_port || 0,
      queryPort: server.QueryPort || server.query_port,
      ftpPort: server.FtpPort || server.ftp_port,
      slots: server.Slots || server.slots || 0,
      players: server.OnlinePlayers || server.online_players || 0,
      location: server.Datacenter || server.datacenter || "Unknown",
      cpu: server.CpuUsage || server.cpu_usage || 0,
      memory: server.MemoryUsage || server.memory_usage || 0,
      memoryMax: server.MemoryMb || server.memory_limit || 0,
      disk: server.DiskUsage || server.disk_usage || 0,
      diskMax: server.DiskMb || server.disk_limit || 0,
      bandwidth: server.BandwidthUsage || server.bandwidth_usage || 0,
      startedAt: server.StartedOn || server.started_on,
      owner: server.UserName || server.user_name,
    });
  } catch (error) {
    console.error("Server details error:", error);
    return NextResponse.json(
      { error: "Failed to fetch server details" },
      { status: 500 }
    );
  }
}

function getStatusString(status: unknown): string {
  if (typeof status === "string") return status;
  
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
