"use client";

import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { WandIcon } from "../components/WandIcon";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useSignup } from "@/hooks/use-auth";
import Link from "next/link";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { mutate: signup, isPending } = useSignup();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    signup({ full_name: fullName, email, password });
  };

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-[420px]">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#7C3AED] mb-4 transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <div className="w-full flex flex-col items-center shadow-2xl p-6 md:p-8 text-center bg-white rounded-[32px] border border-gray-50">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-5">
            <WandIcon className="w-8 h-8 text-[#7C3AED]" />
          </div>

        <h1 className="text-[26px] md:text-[28px] font-bold text-[#1A0533] font-syne tracking-tight">
          Create Account
        </h1>
        <p className="text-gray-500 mb-6 text-[13px] md:text-sm font-poppins">
          Join Spell Wizards and start learning today
        </p>

        <button 
          type="button"
          className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-[14px] font-bold text-gray-700 shadow-sm mb-5 active:scale-[0.98]"
        >
          <img 
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
            alt="Google" 
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="w-full flex items-center gap-4 mb-5">
          <div className="h-px flex-1 bg-gray-100"></div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Or</span>
          <div className="h-px flex-1 bg-gray-100"></div>
        </div>

        <form onSubmit={handleSignup} className="w-full space-y-4">
          <div className="text-left space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-500/5 outline-none transition-all text-[14px] font-medium"
              required
            />
          </div>

          <div className="text-left space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-500/5 outline-none transition-all text-[14px] font-medium"
              required
            />
          </div>

          <div className="text-left space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-500/5 outline-none transition-all text-[14px] font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7C3AED] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full h-12 rounded-xl font-bold font-syne text-base transition-all flex items-center justify-center gap-2.5 ${
              isPending
                ? "bg-[#C4B5FD] cursor-wait"
                : "bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg shadow-purple-500/20 hover:-translate-y-0.5 active:translate-y-0"
            } text-white mt-2`}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-8 text-[13px] text-gray-500 font-poppins">
          Already have an account?{" "}
          <a href="/login" className="text-[#7C3AED] font-bold hover:underline">
            Sign In
          </a>
        </p>
        </div>
      </div>
    </AuthLayout>
  );
}
