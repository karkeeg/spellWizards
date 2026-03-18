"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WandIcon } from "../components/WandIcon";
import {
  ChevronLeft,
  Plus,
  Minus,
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Layout,
  Star,
  CheckCircle2,
} from "lucide-react";
import AuthLayout from "../components/AuthLayout";

type OnboardingStep = 1 | 2 | 3 | 4 | 5;

interface ChildInfo {
  firstName: string;
  age: string;
  gradeLevel: string;
  spellingLevel: string;
  interests: string[];
}

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>(1);
  const [parentName, setParentName] = useState("");
  const [childCount, setChildCount] = useState(1);
  const [childInfo, setChildInfo] = useState<ChildInfo>({
    firstName: "",
    age: "",
    gradeLevel: "",
    spellingLevel: "",
    interests: [],
  });

  const nextStep = () =>
    setStep((prev) => (prev < 5 ? ((prev + 1) as OnboardingStep) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as OnboardingStep) : prev));

  const ProgressBar = () => (
    <div className="w-full max-w-[420px] mb-6">
      <div className="flex justify-between items-center relative px-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex flex-col items-center z-10">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                step >= s
                  ? "bg-[#7C3AED] text-white"
                  : "bg-[#F3F0FF] text-[#A78BFA]"
              }`}
            >
              {s}
            </div>
          </div>
        ))}
        {/* Progress Background Line */}
        <div className="absolute top-[14px] left-0 right-0 h-[2px] bg-[#F3F0FF] -z-0" />
        {/* Active Progress Line */}
        <div
          className="absolute top-[14px] left-0 h-[2px] bg-[#7C3AED] transition-all duration-300 -z-0"
          style={{ width: `${((step - 1) / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="flex flex-col items-center p-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="">
        <WandIcon className="w-12 h-12 text-[#7C3AED]" />
      </div>
      <h1 className="text-2xl font-bold text-[#1A0533] mb-1">
        Welcome to Spell Wizards!
      </h1>
      <p className="text-xs text-gray-400 mb-4 max-w-s">
        Let's personalize your child's magical spelling journey. This will only
        take a moment.
      </p>

      <div className="w-[80%] text-left mb-4">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A0533] mb-1.5 opacity-60">
          What should we call you?
        </label>
        <input
          type="text"
          placeholder="Enter your first name"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          className="w-full h-9 px-4 bg-[#F8F7FF] border border-[#E5E0FF] rounded-md focus:border-[#7C3AED] outline-none transition-colors text-sm"
        />
      </div>

      <div className="w-full bg-[#F5F3FF] p-2 rounded-xl flex items-start gap-3 mb-3 text-left">
        <div className="mt-0.5">
          <Clock className="w-4 h-4 text-[#7C3AED]" />
        </div>
        <p className="text-[11px] text-[#4B3A7A] leading-normal font-medium">
          This setup takes about <span className="font-bold">2 minutes</span>{" "}
          and helps us create the perfect learning path.
        </p>
      </div>

      <button
        onClick={nextStep}
        disabled={!parentName.trim()}
        className="w-[40%] h-11 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-[#DDD6FE] text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-200 text-sm"
      >
        Continue
      </button>
    </div>
  );

  const Step2 = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-[#1A0533] mb-1">
        Hi {parentName}! 👋
      </h1>
      <p className="text-xs text-gray-400 mb-4">
        How many children will be using Spell Wizards?
      </p>

      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setChildCount(Math.max(1, childCount - 1))}
          className="w-10 h-10 rounded-full bg-[#F3F0FF] flex items-center justify-center text-[#7C3AED] hover:bg-[#E9E4FF] transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>
        <div className="text-center min-w-[60px]">
          <div className="text-3xl font-bold text-[#7C3AED] leading-none">
            {childCount}
          </div>
          <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">
            child
          </div>
        </div>
        <button
          onClick={() => setChildCount(Math.min(6, childCount + 1))}
          className="w-10 h-10 rounded-full bg-[#F3F0FF] flex items-center justify-center text-[#7C3AED] hover:bg-[#E9E4FF] transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-1.5 mb-8 w-full justify-center">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => setChildCount(n)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
              childCount === n
                ? "bg-[#7C3AED] text-white shadow-md shadow-purple-100"
                : "bg-white border border-gray-100 text-[#4B3A7A] hover:bg-gray-50"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="w-full bg-[#FFFBEB] border border-[#FEF3C7] p-3 rounded-xl flex items-start gap-3 mb-8 text-left">
        <div className="mt-0.5">
          <Star className="w-4 h-4 text-[#F59E0B]" />
        </div>
        <p className="text-[11px] text-[#92400E] leading-normal font-medium">
          Each child gets a{" "}
          <span className="font-bold">unique wizard avatar</span>, personalized
          word lists, and separate progress tracking.
        </p>
      </div>

      <div className="flex w-full gap-3">
        <button
          onClick={prevStep}
          className="flex-1 h-11 bg-white border border-gray-200 text-[#1A0533] rounded-xl font-bold transition-all text-sm"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="flex-[2] h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-200 text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-xl font-bold text-[#1A0533] mb-0.5">
        Tell us about your child
      </h1>
      <p className="text-[12px] text-gray-400 mb-2 ">
        This helps us create a personalized spelling journey.
      </p>

      <div className="space-y-2 mb-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A0533] mb-1 opacity-60">
              First Name
            </label>
            <input
              type="text"
              placeholder="e.g. Emma"
              value={childInfo.firstName}
              onChange={(e) =>
                setChildInfo({ ...childInfo, firstName: e.target.value })
              }
              className="w-full h-8 px-3 bg-[#F8F7FF] border border-[#E5E0FF] rounded-md focus:border-[#7C3AED] outline-none text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A0533] mb-1 opacity-60">
              Age
            </label>
            <select
              value={childInfo.age}
              onChange={(e) =>
                setChildInfo({ ...childInfo, age: e.target.value })
              }
              className="w-full h-8 px-3 bg-[#F8F7FF] border border-[#E5E0FF] rounded-md focus:border-[#7C3AED] outline-none appearance-none text-xs"
            >
              <option value="">Select age</option>
              {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A0533] mb-2 opacity-60 text-center">
            Grade Level
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {["Pre-K", "Kinder", "1st", "2nd", "3rd", "4th", "5th", "6th"].map(
              (level) => (
                <button
                  key={level}
                  onClick={() =>
                    setChildInfo({ ...childInfo, gradeLevel: level })
                  }
                  className={`py-1 text-[12px] bg-[#F8F7FF] font-bold rounded-lg border transition-all ${
                    childInfo.gradeLevel === level
                      ? "bg-[#7C3AED] border-[#7C3AED] text-[#7C3AED] shadow-sm shadow-purple-100"
                      : "border-gray-100 text-[#4B3A7A] hover:bg-gray-50 font-medium"
                  }`}
                >
                  {level}
                </button>
              ),
            )}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A0533] mb-2 opacity-60 text-center">
            Spelling Level
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "Beginner", icon: "🌱", desc: "Just starting" },
              { id: "Elementary", icon: "🥪", desc: "Basic 3-4 letters" },
              { id: "Intermediate", icon: "📖", desc: "Common words" },
              { id: "Advanced", icon: "🏆", desc: "Strong speller" },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() =>
                  setChildInfo({ ...childInfo, spellingLevel: lvl.id })
                }
                className={`p-2 text-left rounded-xl border-2 transition-all ${
                  childInfo.spellingLevel === lvl.id
                    ? "border-[#7C3AED] bg-[#FDFDFF] ring-2 ring-[#7C3AED]/5"
                    : "border-gray-100 bg-white hover:border-[#DDD6FE]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">{lvl.icon}</span>
                  <span className="font-bold text-[12px] text-[#1A0533]">
                    {lvl.id}
                  </span>
                </div>
                <p className="text-[8px] text-gray-400 font-medium">
                  {lvl.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A0533] mb-2 opacity-60 text-center">
            Interests <span className="font-normal">(up to 4)</span>
          </label>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              "Animals",
              "Space",
              "Sports",
              "Music",
              "Art",
              "Science",
              "Nature",
              "Games",
            ].map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  const current = childInfo.interests;
                  if (current.includes(interest)) {
                    setChildInfo({
                      ...childInfo,
                      interests: current.filter((i) => i !== interest),
                    });
                  } else if (current.length < 4) {
                    setChildInfo({
                      ...childInfo,
                      interests: [...current, interest],
                    });
                  }
                }}
                className={`px-3 py-1.5 text-[9px] font-bold rounded-full border transition-all ${
                  childInfo.interests.includes(interest)
                    ? "bg-[#7C3AED] text-white shadow-sm shadow-purple-100"
                    : "bg-[#F8F7FF] border-gray-100 text-[#4B3A7A] hover:bg-gray-50"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full gap-3 mt-auto">
        <button
          onClick={prevStep}
          className="flex-1 h-9 bg-white border border-gray-200 text-[#1A0533] rounded-xl font-bold transition-all text-sm"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={
            !childInfo.firstName ||
            !childInfo.age ||
            !childInfo.gradeLevel ||
            !childInfo.spellingLevel
          }
          className="flex-[2] h-9 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-200 text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-12 h-12 bg-[#FFFBEB] rounded-full flex items-center justify-center mb-4">
        <Sparkles className="w-6 h-6 text-[#F59E0B]" />
      </div>
      <h1 className="text-xl font-bold text-[#1A0533] mb-1">
        Your Personalized Plan
      </h1>
      <p className="text-[10px] text-gray-400 mb-6 px-4">
        Based on what you told us, here's what we recommend for{" "}
        {childInfo.firstName || "your child"}.
      </p>

      <div className="w-full space-y-2.5 mb-8">
        {[
          {
            icon: BookOpen,
            title: "Phonics Foundation Path",
            desc: "Building letter-sound connections through interactive games.",
            color: "bg-[#F3F0FF]",
            iconColor: "text-[#7C3AED]",
          },
          {
            icon: Clock,
            title: "15 Min Daily Sessions",
            desc: "Short, engaging sessions ideal for younger learners.",
            color: "bg-[#FFF1F2]",
            iconColor: "text-[#F43F5E]",
          },
          {
            icon: Star,
            title: "Themed Word Lists",
            desc: `Custom lists based on ${childInfo.firstName}'s interests: ${childInfo.interests.slice(0, 2).join(", ") || "Magic"}.`,
            color: "bg-[#FFFBEB]",
            iconColor: "text-[#F59E0B]",
          },
          {
            icon: Layout,
            title: "Story-Based Learning",
            desc: "Narrative approach where your child becomes a Spell Wizard.",
            color: "bg-[#F0FDF4]",
            iconColor: "text-[#22C55E]",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex gap-3 p-3 bg-white border border-gray-100 rounded-xl text-left hover:border-[#E5E0FF] transition-all"
          >
            <div
              className={`w-9 h-9 shrink-0 rounded-lg ${item.color} flex items-center justify-center ${item.iconColor}`}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-[#1A0533] text-[11px] leading-tight">
                {item.title}
              </h3>
              <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full gap-3">
        <button
          onClick={prevStep}
          className="flex-1 h-11 bg-white border border-gray-200 text-[#1A0533] rounded-xl font-bold transition-all text-sm"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="flex-[2] h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-200 text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const Step5 = () => (
    <div className="flex flex-col px-8 items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
      </div>
      <h1 className="text-2xl font-bold text-[#1A0533] mb-1">
        You're All Set, {parentName}!
      </h1>
      <p className="text-[11px] text-gray-400 mb-8">
        Your child's magical spelling journey begins now.
      </p>

      <div className="w-full bg-white border border-[#F3F0FF] p-4 rounded-2xl text-left mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] ">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#7C3AED] rounded-3xl flex items-center justify-center text-white font-bold text-lg">
            {childInfo.firstName[0]?.toUpperCase() || "C"}
          </div>
          <div>
            <h3 className="font-bold text-[#1A0533] text-lg">
              {childInfo.firstName}
            </h3>
            <p className="text-[12px] text-gray-400">
              {childInfo.gradeLevel} • Age {childInfo.age}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {childInfo.interests.map((i) => (
            <span
              key={i}
              className="px-2 py-1 bg-[#F3F0FF] text-[#7C3AED] text-[9px] font-extrabold rounded-md uppercase tracking-tighter"
            >
              {i}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full text-left space-y-3 mb-6">
        <p className="text-[9px] font-bold text-gray-700 tracking-widest">
          What Happens next :
        </p>
        <div className="space-y-2">
          {[
            "Personalized word lists generated",
            "Learning schedule set",
            "First lesson ready",
          ].map((text, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F0FDF4] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-[#22C55E]" />
              </div>
              <p className="text-[11px] text-[#4B3A7A] font-medium">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => (window.location.href = "/")}
        className="w-[60%] h-10 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg transition-all shadow-lg shadow-purple-200 text-sm"
      >
        Continue to Dashboard
      </button>
    </div>
  );

  return (
    <div className="w-full relative bg-white flex flex-col font-poppins overflow-hidden">
      <AuthLayout>
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 z-10 min-h-0 overflow-hidden -mt-4">
          <ProgressBar />

          <div className="w-full max-w-[480px] bg-white rounded-[12px] md:rounded-[12px] shadow-[0_20px_50px_rgba(124,58,237,0.06)] border border-[#F3F0FF] overflow-hidden flex flex-col">
            <div className="p-2 md:p-4 flex-1">
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
              {step === 5 && <Step5 />}
            </div>
          </div>
        </main>
      </AuthLayout>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}
