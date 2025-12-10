"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Gamepad2, 
  Server, 
  Cpu, 
  HardDrive, 
  Users, 
  Activity,
  Power,
  RotateCw,
  Square,
  Play,
  Globe,
  Clock,
  LogOut,
  Settings,
  Terminal,
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GameServer {
  id: string;
  name: string;
  game: string;
  status: string;
  ip: string;
  port: number;
  slots: number;
  players: number;
  location: string;
  cpu: number;
  memory: number;
  disk: number;
  startedAt: string | null;
}

export default function Dashboard() {
  const router = useRouter();
  const [servers, setServers] = useState<GameServer[]>([]);
  const [selectedServer, setSelectedServer] = useState<GameServer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Check authentication
    const token = sessionStorage.getItem("tcadmin_token");
    const userData = sessionStorage.getItem("tcadmin_user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchServers(token);
  }, [router]);

  const fetchServers = async (token: string) => {
    try {
      const response = await fetch("/api/servers", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          sessionStorage.removeItem("tcadmin_token");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch servers");
      }

      const data = await response.json();
      setServers(data.servers || []);
      
      if (data.servers?.length > 0) {
        setSelectedServer(data.servers[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load servers");
    } finally {
      setLoading(false);
    }
  };

  const handlePowerAction = async (action: "start" | "stop" | "restart") => {
    if (!selectedServer) return;

    const token = sessionStorage.getItem("tcadmin_token");
    if (!token) return;

    setActionLoading(action);

    try {
      const response = await fetch(`/api/servers/${selectedServer.id}/power`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} server`);
      }

      // Refresh server data after action
      setTimeout(() => fetchServers(token), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tcadmin_token");
    sessionStorage.removeItem("tcadmin_user");
    router.push("/login");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "running":
        return "text-green-400 bg-green-400/20";
      case "stopped":
        return "text-red-400 bg-red-400/20";
      case "starting":
      case "stopping":
        return "text-yellow-400 bg-yellow-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-grid flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-accent-cyan animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your servers...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-grid">
      {/* Header */}
      <header className="glass border-b border-accent-cyan/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-accent-cyan" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white">HYTALE</span>
                <span className="font-display text-[10px] tracking-widest text-accent-cyan -mt-1">HOSTING.AI</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm hidden sm:block">
                Welcome, <span className="text-white">{user?.username || "User"}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 mb-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Server List Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-4">
              <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-accent-cyan" />
                Your Servers
              </h2>

              {servers.length === 0 ? (
                <div className="text-center py-8">
                  <Server className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No servers found</p>
                  <Link href="/#pricing" className="text-accent-cyan text-sm hover:underline mt-2 block">
                    Create a server
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {servers.map((server) => (
                    <button
                      key={server.id}
                      onClick={() => setSelectedServer(server)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedServer?.id === server.id
                          ? "bg-accent-cyan/20 border border-accent-cyan/50"
                          : "bg-dark-800 border border-transparent hover:border-accent-cyan/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium text-sm truncate">
                          {server.name}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(server.status)}`}>
                          {server.status}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs">{server.game}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {selectedServer ? (
              <>
                {/* Server Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="font-display text-2xl font-bold text-white mb-1">
                        {selectedServer.name}
                      </h1>
                      <p className="text-gray-400">{selectedServer.game}</p>
                    </div>

                    {/* Power Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePowerAction("stop")}
                        disabled={actionLoading !== null || selectedServer.status === "stopped"}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === "stop" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                        Stop
                      </button>
                      <button
                        onClick={() => handlePowerAction("restart")}
                        disabled={actionLoading !== null || selectedServer.status === "stopped"}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === "restart" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <RotateCw className="w-4 h-4" />
                        )}
                        Restart
                      </button>
                      <button
                        onClick={() => handlePowerAction("start")}
                        disabled={actionLoading !== null || selectedServer.status === "running"}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === "start" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        Start
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Server Info Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-accent-cyan/20">
                        <Globe className="w-5 h-5 text-accent-cyan" />
                      </div>
                      <span className="text-gray-400 text-sm">Connection</span>
                    </div>
                    <p className="text-white font-mono text-sm">
                      {selectedServer.ip}:{selectedServer.port}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <Users className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-gray-400 text-sm">Players</span>
                    </div>
                    <p className="text-white font-semibold">
                      {selectedServer.players} / {selectedServer.slots}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Power className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-gray-400 text-sm">Status</span>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedServer.status)}`}>
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      {selectedServer.status}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <Clock className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-gray-400 text-sm">Location</span>
                    </div>
                    <p className="text-white font-semibold">{selectedServer.location || "N/A"}</p>
                  </motion.div>
                </div>

                {/* Resource Usage */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-6"
                >
                  <h2 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-accent-cyan" />
                    Resource Usage
                  </h2>

                  <div className="grid sm:grid-cols-3 gap-6">
                    {/* CPU */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 flex items-center gap-2">
                          <Cpu className="w-4 h-4" /> CPU
                        </span>
                        <span className="text-white font-semibold">{selectedServer.cpu}%</span>
                      </div>
                      <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(selectedServer.cpu, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Memory */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 flex items-center gap-2">
                          <Activity className="w-4 h-4" /> Memory
                        </span>
                        <span className="text-white font-semibold">{selectedServer.memory}%</span>
                      </div>
                      <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(selectedServer.memory, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Disk */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 flex items-center gap-2">
                          <HardDrive className="w-4 h-4" /> Disk
                        </span>
                        <span className="text-white font-semibold">{selectedServer.disk}%</span>
                      </div>
                      <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(selectedServer.disk, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="glass rounded-2xl p-6"
                >
                  <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-accent-cyan" />
                    Quick Actions
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-dark-800 border border-accent-cyan/20 rounded-xl hover:border-accent-cyan/50 transition-colors text-left">
                      <Terminal className="w-6 h-6 text-accent-cyan" />
                      <div>
                        <p className="text-white font-medium">Console</p>
                        <p className="text-gray-500 text-xs">View server logs</p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-4 bg-dark-800 border border-accent-cyan/20 rounded-xl hover:border-accent-cyan/50 transition-colors text-left">
                      <HardDrive className="w-6 h-6 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">File Manager</p>
                        <p className="text-gray-500 text-xs">Manage files</p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-4 bg-dark-800 border border-accent-cyan/20 rounded-xl hover:border-accent-cyan/50 transition-colors text-left">
                      <Settings className="w-6 h-6 text-orange-400" />
                      <div>
                        <p className="text-white font-medium">Settings</p>
                        <p className="text-gray-500 text-xs">Configure server</p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-4 bg-dark-800 border border-accent-cyan/20 rounded-xl hover:border-accent-cyan/50 transition-colors text-left">
                      <Activity className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="text-white font-medium">Backups</p>
                        <p className="text-gray-500 text-xs">Restore points</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              </>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <Server className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="font-display text-xl font-bold text-white mb-2">No Server Selected</h2>
                <p className="text-gray-400">Select a server from the sidebar or create a new one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

