"use client";

import React from "react";
import StatCard from "../components/dashboard/StatCard";
import LearnerCard from "../components/dashboard/LearnerCard";
import { Users, Zap, Target, Flame, Sparkles } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
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
            Good Morning, Meena!
          </h2>
          <p className="text-lg md:text-xl text-purple-100 font-medium animate-fade-in [animation-delay:0.3s]">
            You have 2 active learners. Priya had a great session today!
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
          value="2" 
          label="All Progressing" 
          icon={Users} 
          color="text-purple-600" 
          bgColor="bg-purple-100" 
        />
        <StatCard 
          title="Total XP Earned" 
          value="55,863" 
          label="Across all students" 
          icon={Zap} 
          color="text-blue-600" 
          bgColor="bg-blue-100" 
        />
        <StatCard 
          title="Avg. Accuracy" 
          value="91%" 
          label="This week" 
          icon={Target} 
          color="text-green-600" 
          bgColor="bg-green-100" 
        />
        <StatCard 
          title="Best Streak" 
          value="12 days" 
          label="Priya Sharma" 
          icon={Flame} 
          color="text-orange-600" 
          bgColor="bg-orange-100" 
        />
      </section>

      {/* Learners Section */}
      <section className="space-y-4 animate-fade-in [animation-delay:0.5s]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#14062B] font-syne">Your Learners</h3>
          <button className="text-dashboard-purple text-xs font-bold hover:underline transition-all flex items-center gap-1 group">
            See All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LearnerCard 
            name="Rahul Kumar" 
            grade="5th" 
            age={10} 
            level={2} 
            streak={6} 
            xp={21363} 
            overallXp={30000} 
            lastActive="Yesterday, 4:30 PM" 
            avatarColor="bg-blue-400"
          />
          <LearnerCard 
            name="Priya Sharma" 
            grade="5th" 
            age={10} 
            level={3} 
            streak={12} 
            xp={34500} 
            overallXp={50000} 
            lastActive="Today, 9:15 AM" 
            avatarColor="bg-purple-400"
          />
        </div>
      </section>
    </div>
  );
}
