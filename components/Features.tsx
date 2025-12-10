"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Gauge, 
  Server, 
  HardDrive, 
  CloudCog 
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Custom Web Panel",
    description:
      "Our custom, feature rich, and easy to use Hytale server management panel makes controlling and updating your Hytale server through Hytale Hosting extremely easy and convenient.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Users,
    title: "Unlimited Players",
    description:
      "Host as many concurrent players on your Hytale server as you want. At Hytale Hosting, we put no artificial constraints on how many people you can let join your server at once!",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Gauge,
    title: "Ultra Low Latency",
    description:
      "We offer several different data center locations around the globe allowing you to choose the closest Hytale Hosting location to you for the lowest possible latency.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Server,
    title: "Enterprise Hardware",
    description:
      "We utilize only the most premium systems available, with Dual Intel Xeon E5-2600 series processors, DDR4 ECC RAM, and Samsung 860 series SSDs running on each Hytale Hosting box!",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: HardDrive,
    title: "Limitless Storage",
    description:
      "We offer unconstrained access to disk space and many other resources that your Hytale server uses in order to provide the most stable and enjoyable experience possible for your players.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: CloudCog,
    title: "Automated Backups",
    description:
      "We automatically backup all of your server files every single day at no extra cost to you. Did you accidentally delete or misconfigure a file? Let us fix that for you!",
    color: "from-indigo-400 to-purple-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Hytale Server Hosting{" "}
            <span className="gradient-text">Features</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            See why we&apos;re the most optimal choice for future Hytale Server Owners
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-8 h-full card-hover">
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 absolute -inset-1 blur-lg group-hover:opacity-40 transition-opacity`}
                  />
                  <div
                    className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 border border-white/10 flex items-center justify-center`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

