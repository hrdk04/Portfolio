import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 md:gap-8 lg:gap-12">
      <Hero />
      <About />
      <Skills />
      <Contact />
    </div>
  );
}
