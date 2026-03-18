import Navbar from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="w-full bg-white relative overflow-x-hidden selection:bg-purple-100 selection:text-purple-900">
      <Navbar />
      <div className="relative">
        <Hero />
        <HowItWorks />
        <Features />
        {/* Additional sections would go here */}
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}
