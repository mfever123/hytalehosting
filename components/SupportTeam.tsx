"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Pearson Wright",
    role: "Lead Support",
    avatar: "👨‍💻",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "James Greer",
    role: "Technical Expert",
    avatar: "👨‍🔧",
    color: "from-purple-400 to-pink-500",
  },
  {
    name: "Peter North",
    role: "Community Manager",
    avatar: "👨‍💼",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "Nicholas Bailey",
    role: "Server Specialist",
    avatar: "🧑‍💻",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Easton Sampley",
    role: "Network Engineer",
    avatar: "👨‍🔬",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Chris Heuvel",
    role: "Security Expert",
    avatar: "🛡️",
    color: "from-indigo-400 to-purple-500",
  },
  {
    name: "Robert Howard",
    role: "Customer Success",
    avatar: "🤝",
    color: "from-pink-400 to-rose-500",
  },
];

export default function SupportTeam() {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Meet Your <span className="gradient-text">Support Team</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Featuring industry experts and avid Hytale enthusiasts
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 text-center card-hover">
                {/* Avatar */}
                <div className="relative mx-auto mb-4">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} opacity-20 absolute -inset-2 blur-lg group-hover:opacity-40 transition-opacity`}
                  />
                  <div
                    className={`relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${member.color} bg-opacity-20 border-2 border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}
                  >
                    {member.avatar}
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-display text-sm font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-xs">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Have questions? Our team is available 24/7 to help you succeed.
          </p>
          <button className="btn-secondary">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}

