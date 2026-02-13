import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { AITools } from "@/components/portfolio/AITools";
import { Contact } from "@/components/portfolio/Contact";
import { About } from "@/components/portfolio/About";
import ProfessionalProjects from "@/components/portfolio/ProfessionalProjects";
import Education from "@/components/portfolio/Education";
import Resume from "@/components/portfolio/Resume";
import Testimonials from "@/components/portfolio/Testimonials";
import Blog from "@/components/portfolio/Blog";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Education/>
      <Projects/>
      <ProfessionalProjects/>
      <Blog />
      <Skills />
      <AITools />
      <Resume />
      <Testimonials />
      <Contact />
        
    </main>
  );
}
