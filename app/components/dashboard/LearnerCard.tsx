"use client";

import React from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { AsteriskCircleIcon, ClockIcon, TargetIcon } from "../icons";
import UserAvatar from "@/app/components/UserAvatar";

interface LearnerCardProps {
  name: string;
  grade: string;
  age: number;
  level: number;
  // wordsMastered: number;
  // needsReview: number;
  accuracy: number;
  weeklyPractice: number | string;
  questPercent: number;
  lastActive: string;
  avatarColor: string;
  avatarUrl?: string;
}

export default function LearnerCard({
  name,
  grade,
  age,
  level,
  // wordsMastered,
  // needsReview,
  accuracy,
  weeklyPractice,
  questPercent,
  lastActive,
  avatarColor,
  avatarUrl,
}: LearnerCardProps) {
  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Header: Avatar + Name + Level */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <UserAvatar
            name={name}
            avatarUrl={avatarUrl}
            fallbackColor={avatarColor || "#8B5CF6"}
            className="w-12 h-12 text-lg text-white font-bold border-3 border-white shadow-md flex-shrink-0"
          />
          <div>
            <h3 className="text-base font-bold text-[#14062B]">{name}</h3>
            <p className="text-xs text-gray-400 font-medium">
              {grade} grade . Age {age}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-lg border border-purple-200 bg-purple-50 text-[#7C3AED] text-xs font-bold">
          Lv {level}
        </span>
      </div>

      {/* Stats Row + Quest Progress */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {/* Mini stats */}
        <div className="flex items-start gap-5 flex-wrap">


          <div className="flex flex-col items-center gap-1">
            <TargetIcon size={28} color="#F97316" />
            <span className="text-sm font-bold text-gray-600">{accuracy}%</span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight text-center">Accuracy</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <ClockIcon size={28} color="#00B3DE" />
            <span className="text-sm font-bold text-blue-600">{weeklyPractice} h</span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight text-center">Weekly<br />Practice</span>
          </div>
        </div>

        {/* Quest completed bar */}
        <div className="flex-1 min-w-[120px]">
          <span className="text-[10px] text-gray-400 font-medium mb-1 block">Quest Completed</span>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#7C3AED] transition-all duration-700"
                style={{ width: `${questPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-500">{questPercent}%</span>
          </div>
        </div>
      </div>

      {/* Last Active */}
      <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100 text-xs text-gray-400 font-medium">
        <Clock size={13} color="#6B7280" className="opacity-70" />
        <span>Last Active : {lastActive}</span>
      </div>
    </div>
  );
}
