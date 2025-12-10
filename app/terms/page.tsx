import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Hytale Hosting",
  description: "Terms and Conditions for using Hytale Hosting game server services.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-grid">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Terms and <span className="gradient-text">Conditions</span>
            </h1>
            <p className="text-gray-400">Last updated: December 2024</p>
          </div>

          {/* Content */}
          <div className="glass rounded-2xl p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">1. Definitions</h2>
              <p className="text-gray-300 leading-relaxed">
                Hytale Hosting (&quot;Us&quot;, &quot;We&quot;, &quot;Hytale Hosting&quot;, &quot;hytalehosting.ai&quot;) provides hosting 
                services (&quot;services&quot;, &quot;server&quot;, &quot;game server&quot;, &quot;dedicated server&quot;) to the customer 
                (&quot;You&quot;, &quot;Your&quot;, &quot;Customer&quot;, &quot;Client&quot;, &quot;User&quot;).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">2. Conditions</h2>
              <p className="text-gray-300 leading-relaxed">
                By purchasing any of Hytale Hosting&apos;s services you agree to the terms and conditions 
                laid out in this document.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">3. Services</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">3.1.</strong> The cost of a server subscription is valid through the entire rental of the server, subject to fair consumer price index increases.</p>
                <p><strong className="text-white">3.2.</strong> All subscription users have the option to transfer to different products/services if they choose, subject to availability and pricing differences.</p>
                <p><strong className="text-white">3.3.</strong> We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.</p>
                <p><strong className="text-white">3.4.</strong> Service uptime is targeted at 99.9%. Scheduled maintenance will be communicated in advance where possible.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">4. Payments, Refunds & Cancellations</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">4.1.</strong> Payment is due at the start of each billing period. Services may be suspended if payment is not received within 3 days of the due date.</p>
                <p><strong className="text-white">4.2.</strong> We offer a 48-hour money-back guarantee for new customers who are not satisfied with our service.</p>
                <p><strong className="text-white">4.3.</strong> Refund requests must be submitted via support ticket within the eligible period.</p>
                <p><strong className="text-white">4.4.</strong> Refunds are not available for services terminated due to Terms of Service violations.</p>
                <p><strong className="text-white">4.5.</strong> Customers may cancel their service at any time. To cancel, submit a cancellation request through your control panel or via support ticket.</p>
                <p><strong className="text-white">4.6.</strong> Early cancellations of discounted plans (monthly, semi-annually, annually) may result in the discount being rescinded from the final invoice.</p>
                <p><strong className="text-white">4.7.</strong> Domain renewals cannot be refunded once processed.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">5. Communications</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">5.1.</strong> Hytale Hosting support staff are here to assist you. They will do their utmost to help within the confines of the support service guidelines. Please treat them with respect.</p>
                <p><strong className="text-white">5.2.</strong> We will contact you via email to inform you of any downtime or maintenance required on your server. Scheduled restarts occur weekly during low-usage periods (typically 6 AM local time).</p>
                <p><strong className="text-white">5.3.</strong> Abusive, threatening, or inappropriate communication with staff may result in service termination without refund.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">6. Hardware and Backups</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">6.1.</strong> Hytale Hosting maintains offsite backup stores with regular backup intervals. Auto-backup systems are in place to help protect your files.</p>
                <p><strong className="text-white">6.2.</strong> You can use the control panel to manually back up your files or store worlds locally via FTP access.</p>
                <p><strong className="text-white">6.3.</strong> Hytale Hosting cannot be held responsible for the loss or corruption of your files, although we will do everything possible to recover data in the unlikely event of a failure.</p>
                <p><strong className="text-white">6.4.</strong> We strongly recommend maintaining local backups of important data.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">7. Advertising & Affiliates</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">7.1.</strong> De-branding is available for our services.</p>
                <p><strong className="text-white">7.2.</strong> We may occasionally send promotional material to your email address if you have opted in to marketing emails. You may unsubscribe at any time.</p>
                <p><strong className="text-white">7.3.</strong> Affiliates must provide genuine value to visitors. We reserve the right not to pay out affiliate commissions from coupon sites with outdated or incorrect codes.</p>
                <p><strong className="text-white">7.4.</strong> Affiliate payouts are processed via PayPal.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">8. Prohibited Use</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">8.1.</strong> Any unlawful activity carried out by you or a third party on your rented servers can result in immediate and non-refundable termination of services and, in extreme cases, legal action.</p>
                <p className="ml-4 text-gray-400">This includes but is not limited to: copyrighted materials, illegal content, DDoS attacks, and any material violating local or international law.</p>
                <p><strong className="text-white">8.2.</strong> The Customer must defend and pay any damages, fees, judgments, and costs incurred by Hytale Hosting due to the customer breaching these terms.</p>
                <p><strong className="text-white">8.3.</strong> We reserve the right to refuse service to anybody for any reason, including abuse, libel, insults, and unreasonable behavior.</p>
                <p><strong className="text-white">8.4.</strong> Cryptocurrency mining, email spam, and unsolicited material are strictly prohibited. Violations will result in immediate suspension or termination without notice.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">9. DDoS Protection</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">9.1.</strong> All game servers include DDoS protection as standard.</p>
                <p><strong className="text-white">9.2.</strong> While we implement robust protection measures, no DDoS protection is 100% effective against all attack types. We continuously improve our protection systems.</p>
                <p><strong className="text-white">9.3.</strong> Intentionally launching DDoS attacks from our network is strictly prohibited and will result in immediate termination.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">10. Intellectual Property</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">10.1.</strong> Hytale Hosting is not affiliated with Hytale or Hypixel Studios. &quot;Hytale&quot; and related marks are trademarks of Hypixel Studios.</p>
                <p><strong className="text-white">10.2.</strong> Some images used on this site are trademarked property of Hypixel Studios and are used for illustrative purposes.</p>
                <p><strong className="text-white">10.3.</strong> You retain ownership of your game server content and configurations.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">11. Limitation of Liability</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p><strong className="text-white">11.1.</strong> Hytale Hosting shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
                <p><strong className="text-white">11.2.</strong> Our total liability shall not exceed the amount paid by you for services in the 12 months preceding the claim.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of our services 
                after changes constitutes acceptance of the new terms. We will notify users of 
                significant changes via email.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">13. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-dark-800 rounded-lg border border-accent-cyan/20">
                <p className="text-accent-cyan font-semibold">Hytale Hosting</p>
                <p className="text-gray-400">Email: legal@hytalehosting.ai</p>
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

