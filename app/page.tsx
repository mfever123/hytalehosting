import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingPlans from "@/components/PricingPlans";
import ServerLocations from "@/components/ServerLocations";
import Features from "@/components/Features";
import SupportTeam from "@/components/SupportTeam";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-grid">
      <Navbar />
      <Hero />
      <PricingPlans />
      <ServerLocations />
      <Features />
      <SupportTeam />
      <Footer />
    </main>
  );
}

