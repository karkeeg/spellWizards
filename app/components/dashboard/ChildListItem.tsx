import React from "react";
import Link from "next/link";
import { Flame, Zap, Star, MoreVertical } from "lucide-react";
import UserAvatar from "@/app/components/UserAvatar";
import { ChildProfileResponse } from "@/services/child.service";
import { useChildStats } from "@/hooks/use-child";
import { useChildInsights } from "@/hooks/use-insights";
import { TargetIcon, ClockIcon, StreakIcon } from "@/app/components/icons";
import { CompassIcon } from "../icons/Compass";

interface ChildListItemProps {
  child: ChildProfileResponse;
}

export default function ChildListItem({ child }: ChildListItemProps) {
  const { data: stats } = useChildStats(child.child_id);
  const { data: insights } = useChildInsights(child.child_id);

  // Calculate Accuracy from insights
  const accuracyAttr = insights?.attributes?.find(
    (a) => a.name === "Accuracy"
  );
  const accuracy =
    accuracyAttr && accuracyAttr.maxScore > 0
      ? Math.round((accuracyAttr.score / accuracyAttr.maxScore) * 100)
      : 0;

  // Calculate Quest Percent from realmProgress
  const totalQuests =
    insights?.realmProgress?.reduce((acc, curr) => acc + curr.questsTotal, 0) || 0;
  const completedQuests =
    insights?.realmProgress?.reduce(
      (acc, curr) => acc + curr.questsCompleted,
      0
    ) || 0;
  const questPercent =
    totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0;

  // Weekly Practice
  const weeklyPractice = stats?.total_weekly_practice_minutes
    ? (stats.total_weekly_practice_minutes / 60).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-[2rem] border border-dashboard-border p-5 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 md:gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 text-center sm:text-left">
          <UserAvatar
            name={child.name}
            avatarUrl={child.avatar_url?.startsWith("#") ? undefined : child.avatar_url}
            fallbackColor={child.avatar_url?.startsWith("#") ? child.avatar_url : "#8B5CF6"}
            className="w-14 h-14 text-xl text-white font-bold border-4 border-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-[#14062B] font-syne">{child.name}</h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-dashboard-purple text-[10px] font-bold border border-purple-100">
                  @{child.name.toLowerCase().replace(/\s+/g, '_')}
                </span>
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold border border-green-100 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                  {child.onboarding_status === "completed" ? "Active" : "Pending"}
                </span>
              </div>
            </div>
            <p className="text-xs text-dashboard-text-muted font-medium">
              {child.class_name} Grade • Age {child.age} • Joined {child.created_at ? new Date(child.created_at).toLocaleDateString() : "Recently"}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-4 md:gap-6 pt-2 overflow-x-auto hide-scrollbar">
              <div className="flex items-center gap-1.5 shrink-0">
                <StreakIcon size={14} className="text-orange-500" />
                <span className="text-xs font-bold text-[#14062B]">{child.streak_days}d</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <CompassIcon size={14} className="text-blue-500" />
                <span className="text-xs font-bold text-[#14062B]">{(stats?.total_xp_earned ?? child.xp).toLocaleString()} xp</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Star size={14} className="text-dashboard-purple" />
                <span className="text-xs font-bold text-[#14062B]">Lv {child.current_level}</span>
              </div>
              {/* New Detailed Stats */}
              <div className="w-px h-4 bg-gray-200 shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0">
                <TargetIcon size={14} color="#F97316" />
                <span className="text-xs font-bold text-[#14062B]">{accuracy}%</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <ClockIcon size={14} color="#00B3DE" />
                <span className="text-xs font-bold text-[#14062B]">{weeklyPractice} h</span>
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full xl:w-auto">
          <div className="bg-[#FCFAFF] px-4 py-2.5 rounded-2xl border-2 border-dashed border-purple-100 flex flex-row sm:flex-col items-center justify-between sm:justify-center min-w-[120px] shrink-0">
            <div className="flex flex-col sm:items-center">
              <span className="text-[9px] text-dashboard-text-muted font-bold uppercase tracking-widest mb-0.5">Invite Code</span>
              <span className="text-base font-black text-dashboard-purple tracking-widest font-syne">{child.invite_code}</span>
            </div>
            <span className="text-[8px] text-gray-400 sm:mt-0.5 sm:block hidden">Share with child</span>
          </div>

          <div className="flex flex-row sm:flex-col gap-2 w-full xl:w-32">
            <Link
              href="/dashboard/progress"
              className="flex-1 py-2 px-3 bg-purple-50 text-dashboard-purple text-[10px] font-bold rounded-lg text-center hover:bg-purple-100 transition-colors border border-purple-100"
            >
              Progress
            </Link>
            <Link
              href="/dashboard/words"
              className="flex-1 py-2 px-3 bg-purple-50 text-dashboard-purple text-[10px] font-bold rounded-lg text-center hover:bg-purple-100 transition-colors border border-purple-100"
            >
              Words
            </Link>
          </div>

          <button className="p-2 text-gray-400 hover:text-dashboard-purple hover:bg-gray-50 rounded-lg absolute top-4 right-4 sm:top-6 sm:right-6 xl:static">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
