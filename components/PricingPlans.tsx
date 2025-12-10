"use client";

import { motion } from "framer-motion";
import { Cpu, HardDrive, Users } from "lucide-react";

const plans = [
  {
    name: "Kweebec",
    emoji: "🌿",
    color: "from-green-400 to-emerald-600",
    borderColor: "border-green-400/50",
    glowColor: "hover:shadow-green-500/30",
    ram: "1GB",
    vcpus: 1,
    playerCap: 10,
    price: 1.99,
  },
  {
    name: "Tessa",
    emoji: "⚔️",
    color: "from-blue-400 to-indigo-600",
    borderColor: "border-blue-400/50",
    glowColor: "hover:shadow-blue-500/30",
    ram: "2GB",
    vcpus: 1,
    playerCap: 20,
    price: 3.99,
  },
  {
    name: "Kyros",
    emoji: "🔥",
    color: "from-orange-400 to-red-600",
    borderColor: "border-orange-400/50",
    glowColor: "hover:shadow-orange-500/30",
    ram: "4GB",
    vcpus: 2,
    playerCap: 30,
    price: 7.99,
    popular: true,
  },
  {
    name: "Gaia",
    emoji: "🌍",
    color: "from-teal-400 to-cyan-600",
    borderColor: "border-teal-400/50",
    glowColor: "hover:shadow-teal-500/30",
    ram: "6GB",
    vcpus: 4,
    playerCap: 50,
    price: 11.99,
  },
  {
    name: "Varyn",
    emoji: "🐉",
    color: "from-purple-400 to-violet-600",
    borderColor: "border-purple-400/50",
    glowColor: "hover:shadow-purple-500/30",
    ram: "8GB",
    vcpus: 6,
    playerCap: 70,
    price: 15.99,
  },
];

export default function PricingPlans() {
  return (
    <section id="pricing" className="py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-cyan font-semibold tracking-wider uppercase text-sm">
            Special Offers
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
            for pre-release subscribers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`pricing-card group ${plan.glowColor} hover:shadow-2xl relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full text-xs font-bold text-white">
                  POPULAR
                </div>
              )}

              {/* Character placeholder */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${plan.color} opacity-30 flex items-center justify-center border-2 ${plan.borderColor} mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-4xl">{plan.emoji}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {plan.name}
                </h3>
              </div>

              {/* Specs */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    RAM:
                  </span>
                  <span className="text-white font-semibold">{plan.ram}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    VCPUs:
                  </span>
                  <span className="text-white font-semibold">{plan.vcpus}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Player Cap:
                  </span>
                  <span className="text-white font-semibold">{plan.playerCap}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-3xl font-display font-bold text-white">
                  ${plan.price.toFixed(2)}
                </span>
                <span className="text-gray-400 text-sm">/ Month</span>
              </div>

              {/* CTA Button */}
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-dark-600 to-dark-700 border border-accent-cyan/30 text-white font-semibold hover:border-accent-cyan hover:bg-dark-600 transition-all duration-300 group-hover:from-accent-cyan/20 group-hover:to-accent-purple/20">
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

