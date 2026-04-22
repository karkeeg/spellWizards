"use client";

import Navbar from "../components/Header";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

export default function AboutPage() {
  return (
    <main className="w-full bg-white relative overflow-x-hidden selection:bg-purple-100 selection:text-purple-900 min-h-screen flex flex-col font-poppins">
      <Navbar />
      <div className="pt-[80px]"> {/* Offset for fixed header */}
        <AboutUs />
      </div>
      <Footer />
    </main>
  );
}
