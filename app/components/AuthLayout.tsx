import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full relative bg-white flex flex-col font-poppins overflow-hidden">
      {/* Background Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
      />

      {/* Logo Wrapper */}
      <div className="p-2 md:p-6 z-10">
        <Image
          src="/spellWizard.svg"
          alt="SpellWizards"
          width={161}
          height={36}
          className="h-8 w-auto cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10">
        <div className="w-full max-w-[700px] p-6 md:p-8 ">{children}</div>
      </main>

      {/* Footer */}
      <footer className="p-8 flex flex-col md:flex-row justify-center gap-24 text-sm text-gray-500 z-10">
        <div className="flex gap-8">
          <a href="#" className="hover:underline">
            Terms of service
          </a>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
        </div>
        <span>@2026 Spellwizards</span>
      </footer>
    </div>
  );
}
