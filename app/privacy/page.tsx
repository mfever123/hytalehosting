import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Hytale Hosting",
  description: "Learn how Hytale Hosting collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-grid">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-gray-400">Last updated: December 2024</p>
          </div>

          {/* Content */}
          <div className="glass rounded-2xl p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Hytale Hosting (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our game server hosting services and visit our website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong className="text-white">Account Information:</strong> Name, email address, username, and password</li>
                <li><strong className="text-white">Payment Information:</strong> Billing address and payment method details (processed securely by our payment providers)</li>
                <li><strong className="text-white">Server Data:</strong> Game server configurations, files, and settings you upload</li>
                <li><strong className="text-white">Communication Data:</strong> Support tickets, emails, and chat messages</li>
                <li><strong className="text-white">Technical Data:</strong> IP addresses, browser type, device information, and access logs</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Provide, maintain, and improve our hosting services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and security alerts</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage trends to improve user experience</li>
                <li>Detect, prevent, and address technical issues and fraud</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong className="text-white">Service Providers:</strong> Payment processors, hosting infrastructure providers, and support tools</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement industry-standard security measures to protect your personal information, 
                including encryption, firewalls, and secure data centers. However, no method of 
                transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">6. Your Rights (GDPR/CCPA)</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability (receive your data in a structured format)</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@hytalehosting.ai
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">7. Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies to remember your login status and preferences. We may also use cookies 
                for analytics and to track affiliate referrals. You can control cookies through your 
                browser settings, though disabling them may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information for as long as your account is active or as needed 
                to provide services. We may retain certain information as required by law or for 
                legitimate business purposes. Server data is retained for 30 days after service 
                termination unless otherwise requested.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not directed to children under 13. We do not knowingly collect 
                personal information from children under 13. If you believe we have collected 
                information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-dark-800 rounded-lg border border-accent-cyan/20">
                <p className="text-accent-cyan font-semibold">Hytale Hosting</p>
                <p className="text-gray-400">Email: privacy@hytalehosting.ai</p>
                <p className="text-gray-400">Support: support@hytalehosting.ai</p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

