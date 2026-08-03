import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { FAQ } from "@/components/landing/FAQ";
import { SiteFooter } from "@/components/landing/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <SiteHeader />
      <main>
        <Hero />
        <SocialProof />
        <WhyChooseUs />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
