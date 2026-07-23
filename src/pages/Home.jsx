import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col gap-6 md:gap-12 lg:gap-16">
      <Hero />
      <About />
      <Skills />
      <Contact />
    </div>
  );
}
