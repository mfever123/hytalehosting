import { NextRequest, NextResponse } from "next/server";

const TCADMIN_API_URL = process.env.TCADMIN_API_URL || "https://gamepanel.gtxgaming.co.uk";
const TCADMIN_API_KEY = process.env.TCADMIN_API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    // Get user token from authorization header
    const authHeader = request.headers.get("Authorization");
    const userToken = authHeader?.replace("Bearer ", "");

    if (!userToken) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Fetch user's servers from TCAdmin
    const response = await fetch(`${TCADMIN_API_URL}/api/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TCADMIN_API_KEY}`,
        "X-User-Token": userToken,
      },
    });

    if (!response.ok) {
      console.error("TCAdmin servers error:", await response.text());
      return NextResponse.json(
        { error: "Failed to fetch servers" },
        { status: response.status }
      );
    }

    const servers = await response.json();

    // Transform server data for our dashboard
    const transformedServers = Array.isArray(servers) ? servers.map((server: Record<string, unknown>) => ({
      id: server.service_id || server.id,
      name: server.display_name || server.name,
      game: server.game_name || server.game,
      status: server.status || "unknown",
      ip: server.ip_address || server.ip,
      port: server.game_port || server.port,
      slots: server.slots || 0,
      players: server.online_players || 0,
      location: server.datacenter || server.location,
      cpu: server.cpu_usage || 0,
      memory: server.memory_usage || 0,
      disk: server.disk_usage || 0,
      startedAt: server.started_on || null,
    })) : [];

    return NextResponse.json({ servers: transformedServers });
  } catch (error) {
    console.error("Servers fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch servers" },
      { status: 500 }
    );
  }
}

