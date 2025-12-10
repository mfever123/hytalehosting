"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const locations = [
  { name: "Helsinki", country: "Finland", x: 55, y: 18 },
  { name: "London", country: "UK", x: 46, y: 24 },
  { name: "Paris", country: "France", x: 47, y: 28 },
  { name: "Montreal", country: "Canada", x: 24, y: 26 },
  { name: "New York", country: "USA", x: 24, y: 32 },
  { name: "Los Angeles", country: "USA", x: 12, y: 34 },
  { name: "Miami", country: "USA", x: 21, y: 40 },
  { name: "Singapore", country: "Singapore", x: 77, y: 54 },
  { name: "Sydney", country: "Australia", x: 88, y: 74 },
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
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* Map Image */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/10 via-transparent to-accent-purple/10 z-0" />
            
            {/* Hytale World Map */}
            <Image
              src="/hytale-world-map.png"
              alt="Hytale Server Locations World Map"
              fill
              className="object-contain z-10"
              priority
            />

            {/* Location Markers */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="absolute z-20"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onMouseEnter={() => setHoveredLocation(location.name)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Pulse ring */}
                <div className="absolute inset-0 -m-3">
                  <div className="w-8 h-8 rounded-full bg-accent-cyan/40 animate-ping" />
                </div>
                
                {/* Marker dot */}
                <div className="relative w-4 h-4 rounded-full bg-accent-cyan cursor-pointer hover:scale-150 transition-transform glow-cyan border-2 border-white/50" />
                
                {/* Tooltip */}
                {hoveredLocation === location.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-3 bg-dark-800/95 backdrop-blur-sm rounded-xl border border-accent-cyan/40 whitespace-nowrap z-30 shadow-lg shadow-accent-cyan/20"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent-cyan" />
                      <span className="text-white font-semibold">{location.name}</span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{location.country}</div>
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-dark-800/95" />
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
              <div className="w-10 h-10 mx-auto rounded-full bg-dark-700 border border-accent-cyan/30 flex items-center justify-center mb-2 hover:border-accent-cyan hover:bg-dark-600 transition-all cursor-pointer group">
                <div className="w-3 h-3 rounded-full bg-accent-cyan group-hover:scale-125 transition-transform" />
              </div>
              <span className="text-white text-sm font-medium block">{location.name}</span>
              <span className="text-gray-500 text-xs">{location.country}</span>
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
