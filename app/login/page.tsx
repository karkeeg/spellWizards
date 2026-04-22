"use client";

import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { WandIcon } from "../components/WandIcon";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!email.includes("@")) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    sessionStorage.setItem("auth_email", email);
    window.location.href = "/login/password";
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center shadow-lg p-4 text-center">
        <WandIcon className="w-12 h-10 mb-4" />

        <h1 className="text-[24px] font-semibold text-[#1A0533]">
          Sign in or sign up
        </h1>
        <p className="text-gray-500 mb-6 text-md">
          Start learning with spell wizard
        </p>

        <div className="w-[80%] space-y-3 mb-4">
          <button 
            suppressHydrationWarning
            className="w-full h-10 flex items-center justify-center gap-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            <Image
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google"
              width={24}
              height={24}
            />
            <span className="font-semibold text-sm">Continue with Google</span>
          </button>
          <button 
            suppressHydrationWarning
            className="w-full h-10 flex items-center justify-center gap-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              width={24}
              height={24}
            />
            <span className="font-semibold text-sm">
              Continue with Microsoft
            </span>
          </button>
          <button 
            suppressHydrationWarning
            className="w-full h-10 flex items-center justify-center gap-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              width={24}
              height={24}
            />
            <span className="font-semibold text-sm">Continue with Apple</span>
          </button>
        </div>

        <div className="w-[80%] flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-sm text-gray-400">Or</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <div className="w-[80%] space-y-4">
          <input
            suppressHydrationWarning
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-4 border-2 border-purple-100 rounded-xl focus:border-purple-600 outline-none transition-colors text-sm"
          />
          <button
            suppressHydrationWarning
            onClick={handleContinue}
            disabled={isLoading || !email.includes("@")}
            className={`w-full h-10 rounded-xl font-semibold transition-all gap-2 ${
              isLoading
                ? "bg-[#C4B5FD] cursor-wait"
                : "bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg shadow-purple-100"
            } text-white`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
