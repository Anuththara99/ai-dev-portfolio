import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { AITools } from "@/components/portfolio/AITools";
import { Contact } from "@/components/portfolio/Contact";
import { About } from "@/components/portfolio/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects/>
      <Skills />
      <AITools />
      <Contact />
    </main>
  );
}
