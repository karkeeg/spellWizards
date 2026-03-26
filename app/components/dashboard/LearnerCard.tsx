"use client";

import React from "react";
import { Flame, Zap, Clock, Star } from "lucide-react";

interface LearnerCardProps {
  name: string;
  grade: string;
  age: number;
  level: number;
  streak: number;
  xp: number;
  overallXp: number;
  lastActive: string;
  avatarColor: string;
}

export default function LearnerCard({ 
  name, grade, age, level, streak, xp, overallXp, lastActive, avatarColor 
}: LearnerCardProps) {
  // Calculate progress percentage (mock)
  const progress = Math.min((xp / overallXp) * 100, 100);

  return (
    <div className="bg-white p-5 md:p-6 rounded-3xl border border-dashboard-border shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md relative group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: avatarColor || "#8B5CF6" }}
          >
            <span className="text-xl font-bold">{name.charAt(0)}</span>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
              <Star size={10} className="text-white fill-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#14062B] font-syne">{name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-dashboard-purple text-[10px] font-bold border border-purple-200 uppercase tracking-tighter shadow-sm">
                Lv {level}
              </span>
            </div>
            <p className="text-xs text-dashboard-text-muted mt-0.5 font-medium">
              {grade} grade • Age {age}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100/50 group-hover:bg-orange-100 transition-colors shrink-0">
            <Flame size={16} className="text-orange-500 md:size-[18px]" />
          </div>
          <div>
            <p className="text-base md:text-lg font-bold text-[#14062B]">{streak}d</p>
            <p className="text-[9px] md:text-[10px] text-dashboard-text-muted font-bold uppercase tracking-wider">Streak</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100/50 group-hover:bg-blue-100 transition-colors shrink-0">
            <Zap size={16} className="text-blue-500 md:size-[18px]" />
          </div>
          <div>
            <p className="text-base md:text-lg font-bold text-[#14062B]">{xp.toLocaleString()}</p>
            <p className="text-[9px] md:text-[10px] text-dashboard-text-muted font-bold uppercase tracking-wider">XP</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-dashboard-text-muted font-bold uppercase tracking-wider">Overall XP Progress</p>
          <p className="text-[10px] text-dashboard-purple font-bold tabular-nums">{Math.round(progress)}%</p>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-50/50">
          <div 
            className="h-full bg-dashboard-purple transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(124,58,237,0.3)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-dashboard-border text-[10px] font-medium text-gray-400 group-hover:text-dashboard-text-muted transition-colors">
        <Clock size={12} className="opacity-70" />
        <span>Last Active: {lastActive}</span>
      </div>
    </div>
  );
}
