"use client";

import { useState, useEffect, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { WandIcon } from "@/app/components/WandIcon";
import AuthLayout from "@/app/components/AuthLayout";
import { useLogin } from "@/hooks/use-auth";

function AuthForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending, error } = useLogin();

  // Read email from sessionStorage (set by login page)
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("auth_email");
    if (savedEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(savedEmail);
    }
  }, [searchParams]);

  const handleContinue = () => {
    if (!password) return;
    login({ email, password });
  };

  return (
    <div className="max-w-lg flex flex-col items-center p-4 shadow-lg text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <WandIcon className="w-12 h-12 mb-2" />

      <h1 className="text-[24px] font-semibold text-[#1A0533]">
        Create your Account
      </h1>
      <p className="text-gray-500 mb-2 text-md">
        Set your password to continue
      </p>

      <div className="w-[80%] space-y-4">
        {/* Email */}
        <div className="text-left space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <div className="relative">
            <input
              suppressHydrationWarning
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 pr-16 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-purple-600 transition-colors"
            />
            <button
              suppressHydrationWarning
              onClick={() => (window.location.href = "/login")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9]"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="text-left space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              suppressHydrationWarning
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:border-purple-600 outline-none transition-colors text-sm"
            />
            <button
              suppressHydrationWarning
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-500 text-left">
            {error.message || "Invalid email or password. Please try again."}
          </p>
        )}

        {/* Submit */}
        <button
          suppressHydrationWarning
          onClick={handleContinue}
          disabled={isPending || !password}
          className={`w-full h-12 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            isPending || !password
              ? "bg-[#C4B5FD] cursor-not-allowed opacity-70"
              : "bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg shadow-purple-100"
          } text-white`}
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            "Continue"
          )}
        </button>

        <button
          suppressHydrationWarning
          onClick={() => (window.location.href = "/login")}
          className="text-sm font-semibold text-gray-900 hover:opacity-70 transition-opacity"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm />
      </Suspense>
    </AuthLayout>
  );
}
