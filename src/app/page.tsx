import { AnalyticsWork } from "@/components/analytics-work";
import { ContactSection } from "@/components/contact-section";
import { CredentialsSection } from "@/components/credentials-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AnalyticsWork />
      <CredentialsSection />
      <ContactSection />
    </>
  );
}
