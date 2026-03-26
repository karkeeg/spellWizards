"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer: NextPage = () => {
  const pathname = usePathname();
  const getHref = (hash: string) => pathname === '/' ? `#${hash}` : `/#${hash}`;
  return (
    <footer className="w-full bg-[#7C3AED] flex flex-col items-center py-18 px-30 gap-14 text-left text-white font-nunito">
      {/* Top section */}
      <div className="flex justify-center items-start gap-12 flex-wrap">
        {/* Logo and Description */}
        <div className="relative h-40 w-52 text-sm text-white/70 font-poppins">
          <Image
            src="/FooterIcon.svg"
            alt="Logo"
            width={161}
            height={36}
            className="absolute top-0 left-0 text-white object-cover"
          />
          <p className="absolute top-13 left-0 w-full text-white/70 leading-6">
            Making spelling practice fun and effective for kids everywhere.
          </p>
        </div>

        {/* Product Links */}
        <div className="flex flex-col gap-4 w-52">
          <h3 className="font-extrabold text-base">Product</h3>
          <div className="flex flex-col gap-3 text-white/60 font-poppins">
            <a href={getHref("features")} className="hover:text-white transition-colors">Features</a>
            <a href={getHref("pricing")} className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Download App</a>
            <a href="#" className="hover:text-white transition-colors">Updates</a>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4 w-52">
          <h3 className="font-extrabold text-base">Company</h3>
          <div className="flex flex-col gap-3 text-white/60 font-poppins">
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-4 w-52">
          <h3 className="font-extrabold text-base">Support</h3>
          <div className="flex flex-col gap-3 text-white/60 font-poppins">
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
            <a href="#" className="hover:text-white transition-colors">FAQs</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex justify-between items-center border-t border-white/20 pt-4 text-xs text-white/50 font-poppins flex-wrap gap-4">
        <p>© 2026 Spell Wizards. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Facebook</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">YouTube</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;