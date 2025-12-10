"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

const locations = [
  { name: "Helsinki", country: "Finland", x: 57, y: 22, ping: "12ms" },
  { name: "London", country: "UK", x: 47, y: 28, ping: "18ms" },
  { name: "Paris", country: "France", x: 49, y: 31, ping: "15ms" },
  { name: "Montreal", country: "Canada", x: 26, y: 30, ping: "35ms" },
  { name: "New York", country: "USA", x: 25, y: 35, ping: "28ms" },
  { name: "Los Angeles", country: "USA", x: 14, y: 38, ping: "45ms" },
  { name: "Miami", country: "USA", x: 23, y: 43, ping: "32ms" },
  { name: "Singapore", country: "Singapore", x: 76, y: 55, ping: "85ms" },
  { name: "Sydney", country: "Australia", x: 86, y: 72, ping: "120ms" },
];

export default function ServerLocations() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <section id="locations" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Hytale Server <span className="gradient-text">Locations</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Select your next data center for the lowest possible latency
          </p>
        </motion.div>

        {/* World Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[2/1] max-w-5xl mx-auto"
        >
          {/* Map Background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden glass">
            {/* Simplified World Map SVG */}
            <svg
              viewBox="0 0 100 50"
              className="w-full h-full opacity-30"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Continents simplified paths */}
              <g fill="currentColor" className="text-accent-cyan/40">
                {/* North America */}
                <path d="M5,15 Q15,10 25,12 L30,18 Q28,25 25,30 L20,35 Q15,38 10,35 L8,28 Q5,22 5,15" />
                {/* South America */}
                <path d="M22,42 Q25,40 28,42 L30,48 Q28,52 25,55 L22,52 Q20,48 22,42" />
                {/* Europe */}
                <path d="M45,20 Q50,18 55,20 L58,25 Q55,30 52,32 L48,30 Q45,26 45,20" />
                {/* Africa */}
                <path d="M48,35 Q52,33 56,35 L58,42 Q55,50 52,52 L48,48 Q46,42 48,35" />
                {/* Asia */}
                <path d="M60,15 Q70,12 80,15 L85,22 Q82,30 78,35 L70,38 Q65,35 62,30 L60,22 Q58,18 60,15" />
                {/* Australia */}
                <path d="M78,55 Q82,52 88,55 L90,62 Q88,68 85,70 L80,68 Q77,62 78,55" />
              </g>
            </svg>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-50" />

            {/* Location Markers */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="absolute"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onMouseEnter={() => setHoveredLocation(location.name)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Pulse ring */}
                <div className="absolute inset-0 -m-2">
                  <div className="w-6 h-6 rounded-full bg-accent-cyan/30 animate-ping" />
                </div>
                
                {/* Marker dot */}
                <div className="relative w-3 h-3 rounded-full bg-accent-cyan cursor-pointer hover:scale-150 transition-transform glow-cyan" />
                
                {/* Tooltip */}
                {hoveredLocation === location.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-dark-700 rounded-lg border border-accent-cyan/30 whitespace-nowrap z-10"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent-cyan" />
                      <span className="text-white font-semibold">{location.name}</span>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">{location.country}</div>
                    <div className="text-accent-cyan text-xs font-mono">{location.ping}</div>
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-dark-700" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location list for mobile */}
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-center"
            >
              <div className="w-8 h-8 mx-auto rounded-full bg-dark-700 border border-accent-cyan/30 flex items-center justify-center mb-2">
                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
              </div>
              <span className="text-white text-sm font-medium block">{location.name}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-primary">
            Find Best Location
          </button>
        </motion.div>
      </div>
    </section>
  );
}

