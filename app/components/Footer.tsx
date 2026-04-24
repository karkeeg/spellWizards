"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer: NextPage = () => {
  const pathname = usePathname();
  const getHref = (hash: string) => pathname === '/' ? `#${hash}` : `/#${hash}`;
  return (
    <footer className="w-full bg-[#7C3AED] flex flex-col items-center pt-20 pb-10 px-6 md:px-12 xl:px-24 text-left text-white font-poppins">
      {/* Top section */}
      <div className="max-w-[1240px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        {/* Logo and Description */}
        <div className="flex flex-col gap-6">
          <Image
            src="/spellWizard.svg"
            alt="Logo"
            width={161}
            height={36}
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
            Master spelling through game-based learning and fun challenges. Making literacy accessible and epic for every child.
          </p>
        </div>

        {/* Product Links */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-lg font-syne">Product</h3>
          <div className="flex flex-col gap-4 text-white/60 text-[15px]">
            <a href={getHref("features")} className="hover:text-white transition-all hover:translate-x-1 inline-block">Features</a>
            <a href={getHref("how-it-works")} className="hover:text-white transition-all hover:translate-x-1 inline-block">How It Works</a>
            <a href={getHref("pricing")} className="hover:text-white transition-all hover:translate-x-1 inline-block">Pricing</a>
            <a href="/updates" className="hover:text-white transition-all hover:translate-x-1 inline-block">Release Notes</a>
          </div>
        </div>

        {/* Company & Policies */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg font-syne">Company</h3>
            <div className="flex flex-col gap-4 text-white/60 text-[15px]">
              <a href="/about" className="hover:text-white transition-all hover:translate-x-1 inline-block">About Us</a>
              <a href="/blog" className="hover:text-white transition-all hover:translate-x-1 inline-block">Blog</a>
              <a href="/careers" className="hover:text-white transition-all hover:translate-x-1 inline-block">Careers</a>
            </div>
          </div>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-lg font-syne">Support</h3>
          <div className="flex flex-col gap-4 text-white/60 text-[15px]">
            <a href="/help" className="hover:text-white transition-all hover:translate-x-1 inline-block">Help Center</a>
            <a href="/faqs" className="hover:text-white transition-all hover:translate-x-1 inline-block">FAQs</a>
            {/* <a href="/privacy-policy" className="hover:text-white transition-all hover:translate-x-1 inline-block">Privacy Policy</a> */}
            <a href="/terms-condition" className="hover:text-white transition-all hover:translate-x-1 inline-block">Terms of Service</a>
            <a href="/pricing-policy" className="hover:text-white transition-all hover:translate-x-1 inline-block">Pricing Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1240px] w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-10 gap-6">
        <p className="text-[13px] text-white/40">© 2026 Spell Wizards. All rights reserved.</p>

        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.4a4.238 4.238 0 110-8.476 4.238 4.238 0 010 8.476zm4.845-9.184a1.11 1.11 0 112.22 0 1.11 1.11 0 01-2.22 0z" clipRule="evenodd" /></svg>
            </a>
          </div>

          <div className="flex gap-6 text-[13px] text-white/40">
            <a href="/privacy-policy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/cookies" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;