"use client";

import React from "react";
import StatCard from "../components/dashboard/StatCard";
import LearnerCardWithData from "../components/dashboard/LearnerCardWithData";
import { Sparkles, Users } from "lucide-react";
import { AccessibilityIcon, AsteriskCircleIcon, TargetIcon, ClockIcon } from "../components/icons";
import { useParentProfile } from "@/hooks/use-parent-profile";
import { useChildren } from "@/hooks/use-child";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const { data: profile, isLoading: isProfileLoading } = useParentProfile();
  const { data: children, isLoading: isChildrenLoading } = useChildren();
  console.log(children, "children");

  const firstName = profile?.parent_name || (isProfileLoading ? " " : "Parent");

  const totalStudents = children?.length || 0;
  const bestStreak = children?.length
    ? Math.max(...children.map((c) => c.streak_days))
    : 0;
  const bestStreakChild =
    children?.find((c) => c.streak_days === bestStreak)?.name || "N/A";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  const greeting = getGreeting();

  return (
    <div className="space-y-6 pb-8">
      {/* ── Welcome Banner ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] rounded-2xl text-white shadow-xl shadow-purple-200/50">
        <div className="relative z-10 flex flex-col md:flex-row justify-between min-h-[200px] md:min-h-[220px]">
          {/* Text */}
          <div className="flex-1 w-full md:max-w-[60%] p-6 md:p-8 lg:p-10 z-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-syne mb-2 leading-tight animate-fade-in">
              {greeting}, {firstName}!
            </h2>
            <p className="text-sm md:text-base text-white/90 font-medium animate-fade-in [animation-delay:0.1s]">
              Let&apos;s learn something new today!
            </p>
          </div>

          {/* Wizard image */}
          <div className="hidden sm:block relative w-full h-[250px] md:absolute md:right-0 md:bottom-0 md:h-full md:w-[45%] lg:w-[40%] z-0 flex-shrink-0 pointer-events-none">
            <Image
              src="/dashboardGood.svg"
              alt="Dashboard Banner"
              fill
              className="object-contain drop-shadow-[0_20px_40px_rgba(26,5,51,0.3)] p-4 md:p-0"
            />
          </div>
        </div>

        {/* Decorative sparkles */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-10 right-20 animate-float">
            <Sparkles size={50} className="text-white/20" />
          </div>
          <div className="absolute bottom-10 right-40 animate-float-delayed">
            <Sparkles size={32} className="text-white/30" />
          </div>
        </div>
      </section>

      {/* ── Stats Grid ──────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in [animation-delay:0.3s]">
        <StatCard
          title="Active Students"
          value={totalStudents.toString()}
          label="All Progressing"
          icon={AccessibilityIcon}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Avg. Accuracy"
          value="91%"
          label="This week"
          icon={TargetIcon}
          color="text-orange-500"
          bgColor="bg-orange-50"
        />

      </section>

      {/* ── Your Learners ───────────────────────────────────────── */}
      <section className="space-y-4 animate-fade-in [animation-delay:0.5s]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#14062B] font-syne">
            Your Learners
          </h3>
          <Link
            href="/dashboard/children"
            className="text-[#7C3AED] text-sm font-bold hover:underline transition-all flex items-center gap-1 group"
          >
            See All{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              &gt;
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isChildrenLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))
          ) : children && children.length > 0 ? (
            children.map((child, idx) => (
              <LearnerCardWithData
                key={child.child_id}
                child={child}
                idx={idx}
              />
            ))
          ) : (
            <div className="lg:col-span-2 bg-white p-12 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="text-[#7C3AED]" size={32} />
              </div>
              <h4 className="text-lg font-bold text-[#14062B] mb-2">
                No learners added yet
              </h4>
              <p className="text-sm text-gray-400 mb-6 max-w-sm">
                Add your children to start tracking their magical spelling
                journey!
              </p>
              <Link
                href="/dashboard/add-child"
                className="bg-[#7C3AED] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6D28D9] transition-all"
              >
                Add Your First Child
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
