"use client";

import { motion } from "framer-motion";
import { Cpu, HardDrive, Users } from "lucide-react";
import Image from "next/image";

const plans = [
  {
    name: "Kweebec",
    image: "/characters/kweebec.png",
    color: "from-green-400 to-emerald-600",
    borderColor: "border-green-400/50",
    glowColor: "hover:shadow-green-500/30",
    accentColor: "text-green-400",
    ram: "1GB",
    vcpus: 1,
    playerCap: 10,
    price: 1.99,
  },
  {
    name: "Tessa",
    image: "/characters/tessa.png",
    color: "from-blue-400 to-indigo-600",
    borderColor: "border-blue-400/50",
    glowColor: "hover:shadow-blue-500/30",
    accentColor: "text-blue-400",
    ram: "2GB",
    vcpus: 1,
    playerCap: 20,
    price: 3.99,
  },
  {
    name: "Kyros",
    image: "/characters/kyros.png",
    color: "from-orange-400 to-red-600",
    borderColor: "border-orange-400/50",
    glowColor: "hover:shadow-orange-500/30",
    accentColor: "text-orange-400",
    ram: "4GB",
    vcpus: 2,
    playerCap: 30,
    price: 7.99,
    popular: true,
  },
  {
    name: "Gaia",
    image: "/characters/gaia.png",
    color: "from-teal-400 to-cyan-600",
    borderColor: "border-teal-400/50",
    glowColor: "hover:shadow-teal-500/30",
    accentColor: "text-teal-400",
    ram: "6GB",
    vcpus: 4,
    playerCap: 50,
    price: 11.99,
  },
  {
    name: "Varyn",
    image: "/characters/varyn.png",
    color: "from-purple-400 to-violet-600",
    borderColor: "border-purple-400/50",
    glowColor: "hover:shadow-purple-500/30",
    accentColor: "text-purple-400",
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
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full text-xs font-bold text-white z-20">
                  POPULAR
                </div>
              )}

              {/* Character Image */}
              <div className="relative h-48 flex items-end justify-center overflow-visible mb-[-60px] z-10">
                <div className="relative w-40 h-48 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={plan.image}
                    alt={`${plan.name} character`}
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                    sizes="(max-width: 768px) 160px, 160px"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className={`relative rounded-2xl p-6 pt-16 transition-all duration-500 ${plan.glowColor} hover:shadow-2xl`}
                   style={{
                     background: 'linear-gradient(180deg, rgba(20, 30, 60, 0.9) 0%, rgba(10, 15, 35, 0.95) 100%)',
                     border: '1px solid rgba(0, 180, 255, 0.3)',
                   }}>
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${plan.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Plan Name */}
                <h3 className="font-display text-2xl font-bold text-white text-center mb-6 relative z-10">
                  {plan.name}
                </h3>

                {/* Specs */}
                <div className="space-y-3 mb-6 relative z-10">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-400 font-semibold">RAM:</span>
                    <span className="text-white font-bold">{plan.ram}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-400 font-semibold">VCPUs:</span>
                    <span className="text-white font-bold">{plan.vcpus}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-400 font-semibold">Player Cap:</span>
                    <span className="text-white font-bold">{plan.playerCap}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-6 relative z-10">
                  <span className={`text-3xl font-display font-bold ${plan.accentColor}`}>
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 text-sm"> / Month</span>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 rounded-lg border-2 ${plan.borderColor} text-white font-display font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300 relative z-10`}>
                  Select Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
