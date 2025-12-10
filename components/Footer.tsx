"use client";

import { motion } from "framer-motion";
import { Gamepad2, Twitter, Youtube, MessageCircle, Github } from "lucide-react";

const supportLinks = [
  { name: "Knowledgebase", href: "#" },
  { name: "Submit a Ticket", href: "#" },
  { name: "Livechat", href: "#" },
  { name: "Network Status", href: "#" },
  { name: "Contact Us", href: "#" },
];

const companyLinks = [
  { name: "About Us", href: "#about" },
  { name: "Jobs", href: "#" },
  { name: "Partners", href: "#partners" },
  { name: "Earn Money", href: "#" },
  { name: "Create Server", href: "#create" },
  { name: "Control Panel", href: "#" },
  { name: "Billing Area", href: "#" },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Discord", icon: MessageCircle, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Gamepad2 className="w-10 h-10 text-accent-cyan" />
                <div className="absolute inset-0 blur-lg bg-accent-cyan/30" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-wider text-white">
                  HYTALE
                </span>
                <span className="font-display text-xs tracking-widest text-accent-cyan">
                  HOSTING.AI
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Hytale Hosting is pioneering the way forwards for game server owners
              looking to stake their claim in the Hytale community. Our mission is
              to offer the highest quality Hytale Server Hosting opportunities at
              the most affordable possible prices.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-dark-700 border border-accent-cyan/20 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-bold text-white mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-cyan transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-bold text-white mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-cyan transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2020 - {new Date().getFullYear()} Hytale Hosting AI. All Rights Reserved.
            </p>
            <p className="text-gray-600 text-xs text-center md:text-right">
              This site is not affiliated with Hytale or Hypixel Studios. Some
              images are trademarked property of Hypixel Studios.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

