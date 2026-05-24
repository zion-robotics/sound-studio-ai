import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { EnhanceSection } from "@/components/site/EnhanceSection";
import { Features } from "@/components/site/Features";
import { UniqueFeatures } from "@/components/site/UniqueFeatures";
import { HowItWorks } from "@/components/site/HowItWorks";
import { SocialProof } from "@/components/site/SocialProof";
import { Pricing } from "@/components/site/Pricing";
import { Footer } from "@/components/site/Footer";
import { AuthModal } from "@/components/site/AuthModal";
import { ChatWidget } from "@/components/site/ChatWidget";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Navbar onAuth={() => setAuthOpen(true)} />
      <main>
        <Hero onCta={() => setAuthOpen(true)} />
        <EnhanceSection />
        <Features />
        <UniqueFeatures />
        <HowItWorks />
        <SocialProof />
        <Pricing onStart={() => setAuthOpen(true)} />
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <ChatWidget onRequireAuth={() => setAuthOpen(true)} />
    </div>
  );
}
