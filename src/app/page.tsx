import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
