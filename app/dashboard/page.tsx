"use client";

import React from "react";
import StatCard from "../components/dashboard/StatCard";
import LearnerCard from "../components/dashboard/LearnerCard";
import { Users, Zap, Target, Flame, Sparkles, Plus } from "lucide-react";
import { useParentProfile } from "@/hooks/use-parent-profile";
import { useChildren } from "@/hooks/use-child";
import Link from "next/link";

export default function DashboardPage() {
  const { data: profile, isLoading: isProfileLoading } = useParentProfile();
  const { data: children, isLoading: isChildrenLoading } = useChildren();

  const firstName = profile?.parent_name || (isProfileLoading ? " " : "Parent");
  
  const totalStudents = children?.length || 0;
  const totalXp = children?.reduce((acc, c) => acc + c.xp, 0) || 0;
  const bestStreak = children?.length 
    ? Math.max(...children.map(c => c.streak_days)) 
    : 0;
  const bestStreakChild = children?.find(c => c.streak_days === bestStreak)?.name || "N/A";

  console.log("Children data:", children);
  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-purple-200/50 group">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4 animate-fade-in [animation-delay:0.1s]">
            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest border border-white/10 shadow-sm">
              Dashboard
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-syne mb-6 leading-tight animate-fade-in [animation-delay:0.2s]">
            Good Morning, {firstName}!
          </h2>
          <p className="text-lg md:text-xl text-purple-100 font-medium animate-fade-in [animation-delay:0.3s]">
            {totalStudents > 0 
              ? `You have ${totalStudents} active ${totalStudents === 1 ? 'learner' : 'learners'}. ${bestStreak > 0 ? `${bestStreakChild} has the longest streak!` : 'Keep up the momentum!'}`
              : "Welcome! Add your first learner to start the adventure."}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-10 right-20 animate-float">
            <Sparkles size={64} className="text-white/20" />
          </div>
          <div className="absolute bottom-10 right-40 animate-float-delayed">
            <Sparkles size={40} className="text-white/30" />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in [animation-delay:0.4s]">
        <StatCard
          title="Active Students"
          value={totalStudents.toString()}
          label={totalStudents === 1 ? "1 Learner" : `${totalStudents} Learners`}
          icon={Users}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <StatCard
          title="Total XP Earned"
          value={totalXp.toLocaleString()}
          label="Across all students"
          icon={Zap}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          title="Avg. Accuracy"
          value="--"
          label="Coming soon"
          icon={Target}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatCard
          title="Best Streak"
          value={`${bestStreak} days`}
          label={bestStreakChild}
          icon={Flame}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </section>

      {/* Learners Section */}
      <section className="space-y-4 animate-fade-in [animation-delay:0.5s]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#14062B] font-syne">
            Your Learners
          </h3>
          <Link href="/dashboard/children" className="text-dashboard-purple text-xs font-bold hover:underline transition-all flex items-center gap-1 group">
            See All{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isChildrenLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
            ))
          ) : children && children.length > 0 ? (
            children.map((child) => (
              <LearnerCard
                key={child.child_id}
                name={child.name}
                grade={child.class_name}
                age={child.age}
                level={child.current_level}
                streak={child.streak_days}
                xp={child.xp}
                overallXp={(child.current_level || 1) * 10000}
                lastActive={child.created_at ? new Date(child.created_at).toLocaleDateString() : "Recently"}
                avatarColor={child.avatar_url?.startsWith("#") ? child.avatar_url : "#8B5CF6"}
              />
            ))
          ) : (
            <div className="lg:col-span-2 bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="text-dashboard-purple" size={32} />
              </div>
              <h4 className="text-lg font-bold text-[#14062B] mb-2">No learners added yet</h4>
              <p className="text-sm text-dashboard-text-muted mb-6 max-w-sm">
                Add your children to start tracking their magical spelling journey!
              </p>
              <Link 
                href="/dashboard/add-child"
                className="bg-dashboard-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6D28D9] transition-all"
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
