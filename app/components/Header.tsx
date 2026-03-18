"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-[25px] bg-white/70 border-b border-purple-600/10 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-12 xl:px-[100px] py-2 md:py-4">
        
        {/* Left Logo */}
        <div className="flex items-center shrink-0">
          <Image
            src="/spellWizard.svg"
            alt="logo"
            width={161}
            height={36}
            className="h-[30px] md:h-[36px] w-auto"
          />
        </div>

        {/* Center Navigation - Desktop */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-[58px] text-[15px] xl:text-[16px] text-black/80 font-poppins">
          <a href="#features" className="font-medium hover:text-[#7C3AED] transition-colors cursor-pointer">Features</a>
          <a href="#how-it-works" className="font-medium hover:text-[#7C3AED] transition-colors cursor-pointer">How It Works</a>
          <a href="#pricing" className="font-medium hover:text-[#7C3AED] transition-colors cursor-pointer">Pricing</a>
        </div>

        <div className="hidden lg:flex items-center gap-4 xl:gap-[20px] font-poppins">
          <a href="/signup" className="rounded-[8px] bg-white border border-black/10 hover:border-black flex items-center justify-center px-4 xl:px-[16px] py-2 xl:py-[8px] transition-all">
            <span className="font-medium text-[15px]">Try for Free</span>
          </a>
          <a href="/login" className="rounded-[8px] bg-[#7c3aed] text-white hover:bg-[#6d28d9] flex items-center justify-center px-4 xl:px-[16px] py-2 xl:py-[8px] shadow-lg shadow-purple-500/20 transition-all">
            <span className="font-medium text-[15px]">Parents Portal</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-black/70 hover:text-black transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-purple-100 shadow-2xl animate-fade-in py-6 px-4 flex flex-col gap-6 items-center text-center">
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black/80">Features</a>
          <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black/80">How It Works</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black/80">Pricing</a>
          <div className="flex flex-col gap-3 w-full max-w-[280px]">
            <a href="/signup" className="w-full rounded-[8px] bg-white border border-black py-3 font-medium flex items-center justify-center">Try for Free</a>
            <a href="/login" className="w-full rounded-[8px] bg-[#7c3aed] text-white py-3 font-medium shadow-lg shadow-purple-500/20 flex items-center justify-center">Parents Portal</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;