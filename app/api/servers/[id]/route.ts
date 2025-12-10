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
    const userToken = authHeader?.replace("Bearer ", "");

    if (!userToken) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Fetch server details from TCAdmin
    const response = await fetch(`${TCADMIN_API_URL}/api/services/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TCADMIN_API_KEY}`,
        "X-User-Token": userToken,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Server not found" },
        { status: response.status }
      );
    }

    const server = await response.json();

    return NextResponse.json({
      id: server.service_id || server.id,
      name: server.display_name || server.name,
      game: server.game_name || server.game,
      status: server.status,
      ip: server.ip_address || server.ip,
      port: server.game_port || server.port,
      queryPort: server.query_port,
      ftpPort: server.ftp_port,
      slots: server.slots,
      players: server.online_players || 0,
      location: server.datacenter || server.location,
      cpu: server.cpu_usage || 0,
      memory: server.memory_usage || 0,
      memoryMax: server.memory_limit || 0,
      disk: server.disk_usage || 0,
      diskMax: server.disk_limit || 0,
      bandwidth: server.bandwidth_usage || 0,
      startedAt: server.started_on,
      owner: server.user_name,
      autoRefresh: server.auto_restart || false,
    });
  } catch (error) {
    console.error("Server details error:", error);
    return NextResponse.json(
      { error: "Failed to fetch server details" },
      { status: 500 }
    );
  }
}

