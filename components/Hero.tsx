"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Puzzle, 
  Headphones, 
  Shield, 
  Globe, 
  FolderOpen,
  Mail
} from "lucide-react";
import { useState } from "react";

const features = [
  { icon: Zap, text: "Instant Setup", description: "Gets you up and running in a snap!" },
  { icon: Puzzle, text: "One-Click Mods", description: "Make each game unique!" },
  { icon: Headphones, text: "24/7 Support", description: "We're always here to help!" },
  { icon: Shield, text: "DDoS Protection", description: "So you can play without worry!" },
  { icon: Globe, text: "Worldwide Locations", description: "For super low-latency playing!" },
  { icon: FolderOpen, text: "Full File Access", description: "Imposes no artificial restrictions!" },
];

export default function Hero() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thanks for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Hytale</span>
              <br />
              <span className="gradient-text">Server Hosting</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center border border-accent-cyan/30 group-hover:border-accent-cyan transition-colors">
                    <feature.icon className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <span className="text-white font-semibold">{feature.text}</span>
                    <span className="text-gray-400 ml-2">- {feature.description}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button className="btn-primary text-lg">
                Create Server
              </button>
              <span className="px-4 py-3 text-gray-400 text-sm flex items-center justify-center">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
                Currently Unavailable - Coming Soon!
              </span>
            </motion.div>
          </div>

          {/* Right Content - Character & Newsletter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Character Placeholder */}
            <div className="relative mx-auto w-80 h-96">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/30 via-accent-purple/20 to-transparent rounded-full blur-3xl" />
              
              {/* Character silhouette placeholder */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-64 h-80 rounded-3xl bg-gradient-to-b from-dark-600/80 to-dark-900/80 border border-accent-cyan/30 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                  {/* Kweebec placeholder */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-600/30 border-2 border-green-400/50 flex items-center justify-center mb-4 animate-float">
                    <span className="text-6xl">🌿</span>
                  </div>
                  <span className="font-display text-2xl font-bold text-white">Kweebec</span>
                  <span className="text-accent-cyan text-sm mt-1">Hytale Character</span>
                </div>
              </div>
            </div>

            {/* Newsletter Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 glass rounded-2xl p-6"
            >
              <p className="text-gray-300 text-center mb-4">
                Subscribe to our Newsletter and be the first to find out when Hytale Servers become available!
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-accent-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan transition-colors"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary px-6">
                  Subscribe
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

