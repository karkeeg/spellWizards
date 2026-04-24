"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trophy,
  Zap,
  CheckCircle2,
  BookOpen,
  AlertCircle,
  Target,
  Calendar,
  Flame,
  Languages,
  Brain,
  BarChart3,
  Dumbbell,
  Search,
  LayoutDashboard,
  ChartScatter,
  Diamond,
  DiamondIcon,
  Gem,
  CompassIcon,
  Timer,
  Clock
} from "lucide-react";
import { TargetIcon, AsteriskCircleIcon, ClockIcon, AccessibilityIcon, StreakIcon } from "@/app/components/icons";
import { useChildren, useChildStats } from "@/hooks/use-child";
import { useChildInsights, useParentRealms } from "@/hooks/use-insights";
import RealmProgressCard from "@/app/components/dashboard/RealmProgressCard";
import UserAvatar from "@/app/components/UserAvatar";

// ─── Static mock data (only for panels without API yet) ───────────────────────
const WEEKLY_XP_FALLBACK = [
  { day: "Monday", xp: 0 },
  { day: "Tuesday", xp: 0 },
  { day: "Wednesday", xp: 0 },
  { day: "Thursday", xp: 0 },
  { day: "Friday", xp: 0 },
  { day: "Saturday", xp: 0 },
  { day: "Sunday", xp: 0 },
];

const AVATAR_COLORS = ["#F97316", "#EAB308", "#8B5CF6", "#06B6D4", "#10B981"];
const TAB_DOT_COLORS = ["#F97316", "#EAB308", "#8B5CF6", "#06B6D4", "#10B981"];

// Map attribute names to custom SVG icons
const ATTRIBUTE_ICONS: Record<string, React.ReactNode> = {
  "Accuracy": <TargetIcon size={32} color="#FF7438" />,
  "Spelling Power": <AsteriskCircleIcon size={32} color="#DE00DA" />,
  "Creativity": <AccessibilityIcon size={32} color="#7C3AED" />,
  "Speed": <ClockIcon size={32} color="#00B3DE" />,
  "Persistence": <Dumbbell size={32} className="text-orange-500" />,
  "Focus": <Search size={32} className="text-blue-500" />,
};

const REALM_BAR_COLORS = ["#8B5CF6", "#F97316", "#06B6D4", "#EF4444", "#22C55E", "#EAB308"];

// ─── Stat item component ──────────────────────────────────────────────────────
function StatItem({ icon: Icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[55px]">
      <div className="text-xl leading-none flex items-center justify-center h-6 w-6">
        {Icon}
      </div>
      <span className="text-sm font-bold text-[#14062B] leading-snug">{value}</span>
      <span className="text-[11px] text-gray-400 font-medium text-center">{label}</span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProgressPage() {
  const { data: children, isLoading: childrenLoading } = useChildren();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedChild = children?.[selectedIdx] ?? children?.[0];
  const childId = selectedChild?.child_id ?? null;

  // Fetch insights for the selected child
  const { data: insights, isLoading: insightsLoading } = useChildInsights(childId);
  // Fetch stats for the selected child
  const { data: stats, isLoading: statsLoading } = useChildStats(childId);
  // Fetch all realms
  const { data: realms, isLoading: realmsLoading } = useParentRealms();

  const maxWeeklyXp = 1000;
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Loading skeleton
  if (childrenLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-gray-100 rounded-xl w-72" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-56 bg-gray-100 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-64 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  // Empty state
  if (!children || children.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
        <h4 className="text-lg font-bold text-[#14062B] mb-2">No children found</h4>
        <p className="text-sm text-gray-400 mb-6">Start by adding your first child to the family!</p>
        <Link
          href="/dashboard/add-child"
          className="bg-[#7C3AED] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6D28D9] transition-all"
        >
          Add Child
        </Link>
      </div>
    );
  }

  const child = selectedChild!;
  const avatarColor = AVATAR_COLORS[selectedIdx % AVATAR_COLORS.length];
  const nextLevelXp = 30000;
  const xpProgress = Math.min((child.xp / nextLevelXp) * 100, 100);

  // Attributes from API (Personality Traits panel)
  const attributes = insights?.attributes ?? [];

  // Merge realm list with per-child progress
  const realmProgressMap = new Map(
    (insights?.realmProgress ?? []).map((rp) => [rp.realmId, rp]),
  );

  // Build combined realm cards: use API realms list, enrich with progress data
  const realmCards = (realms ?? []).map((realm, i) => {
    const progress = realmProgressMap.get(realm.id);
    return {
      id: realm.id,
      name: realm.name,
      description: realm.description || "",
      topics: realm.topics ?? [],
      percent: progress?.percentCompleted ?? 0,
      questsDone: progress?.questsCompleted ?? 0,
      questsTotal: progress?.questsTotal ?? 0,
      status: progress?.status ?? "not_started",
      barColor: REALM_BAR_COLORS[i % REALM_BAR_COLORS.length],
    };
  });

  // If no realms list yet, fall back to the progress-only data
  const finalRealmCards = realmCards.length > 0
    ? realmCards
    : (insights?.realmProgress ?? []).map((rp, i) => ({
      id: rp.realmId,
      name: rp.realmName,
      description: "",
      topics: [] as string[],
      percent: rp.percentCompleted,
      questsDone: rp.questsCompleted,
      questsTotal: rp.questsTotal,
      status: rp.status,
      barColor: REALM_BAR_COLORS[i % REALM_BAR_COLORS.length],
    }));

  return (
    <div className="space-y-4 pb-10  animate-fade-in">

      {/* ── 1. Child tabs + Add button ──────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {children.map((c, i) => (
            <button
              key={c.child_id}
              onClick={() => setSelectedIdx(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-base font-semibold ${i === selectedIdx
                ? " border-2 border-[#7C3AED]/50 text-[#7C3AED]"
                : "text-gray-500 bg-white/80 hover:bg-white/70"
                }`}
            >
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: "#FFB820" }}
              />
              {c.name}
            </button>
          ))}
        </div>
        <Link
          href="/dashboard/add-child"
          className="flex items-center gap-2 bg-[#7C3AED] text-white px-4 py-2 rounded-xl text-base font-semibold hover:bg-[#6D28D9] transition-all shadow-md"
        >
          <Plus size={15} />
          Add a child
        </Link>
      </div>

      {/* ── 2. Profile card ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
        {/* Top: avatar + name / stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <UserAvatar 
              name={child.name} 
              avatarUrl={child.avatar_url?.startsWith("#") ? undefined : child.avatar_url} 
              fallbackColor={avatarColor} 
              className="w-14 h-14 text-2xl text-white font-bold shadow-md flex-shrink-0" 
            />
            <div>
              <h2 className="text-lg font-bold text-[#14062B]">{child.name}</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {child.class_name} Grade &bull; Last active Yesterday, 4:30 PM
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 mt-4 sm:mt-0">
            <StatItem icon={<Gem size={18} fill="#3D85FD" className="text-blue-500" />} value={`Lv. ${child.current_level}`} label="Level" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<Zap size={18} fill="#7C3AED" color="#7C3AED" className="text-yellow-500" />} value={(stats?.total_xp_earned ?? child.xp).toLocaleString()} label="Total XP" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<CompassIcon size={20} color="white" fill="#16A34A" className="" />} value={String(stats?.total_quests_completed ?? 0)} label="Quests" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<StreakIcon size={20} className="text-orange-600" />} value={String(child.streak_days)} label="Day Streak" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<Clock size={18} fill="#00B3DE" className="text-white" />} value={stats?.total_weekly_practice_minutes ? `${(stats.total_weekly_practice_minutes / 60).toFixed(1)}h` : '0h'} label="Weekly Practice" />
          </div>
        </div>

        {/* XP progress bar */}
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">
              XP Progress to Level {child.current_level + 1}
            </span>
            <span className="text-xs font-bold text-gray-400">
              {child.xp.toLocaleString()} / {nextLevelXp.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-700"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── 3. Three analytics panels ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Realm Progress summary (replacing Language Learning) */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <Languages size={24} />
            </div>
            <h3 className="text-base font-bold text-[#14062B]">Realm Progress</h3>
          </div>
          {insightsLoading || realmsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i}>
                  <div className="h-4 bg-gray-50 rounded w-1/3 mb-1.5 animate-pulse" />
                  <div className="h-2 bg-gray-50 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          ) : finalRealmCards.length > 0 ? (
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {finalRealmCards.map((realm) => (
                <div key={realm.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-600 font-medium">{realm.name}</span>
                    <span className="text-xs font-bold" style={{ color: realm.barColor }}>{realm.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${realm.percent}%`, backgroundColor: realm.barColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-8">No realm progress data yet.</p>
          )}
        </div>

        {/* Personality Traits — from API attributes */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <Brain size={24} />
            </div>
            <h3 className="text-base font-bold text-[#14062B]">Personality Traits</h3>
          </div>

          {insightsLoading ? (
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : attributes.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {attributes.map((attr) => {
                  const pct = attr.maxScore > 0 ? Math.round((attr.score / attr.maxScore) * 100) : 0;
                  return (
                    <div
                      key={attr.name}
                      className="flex flex-col items-center py-3 px-2 bg-gray-50 rounded-xl"
                    >
                      <div className="mb-1">{ATTRIBUTE_ICONS[attr.name] ?? <LayoutDashboard size={32} className="text-gray-400" />}</div>
                      <span className="text-xs text-gray-400 font-medium">{attr.name}</span>
                      <span className="text-base font-bold mt-0.5" style={{ color: attr.iconColor }}>
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Capturing learning character beyond raw scores.
              </p>
            </>
          ) : (
            <p className="text-xs text-gray-400 text-center py-8">No attribute data yet.</p>
          )}
        </div>

        {/* Weekly XP Activity */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED]">
              <ChartScatter size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-[20px] font-bold text-[#14062B]">Weekly XP Activity</h3>
          </div>
          <div className="flex items-end justify-between gap-1 sm:gap-2 h-40 sm:h-56 pb-2">
            {(stats?.weekly_activity ?? WEEKLY_XP_FALLBACK).map((d) => {
              const isToday = d.day === todayName;
              const heightPct = Math.min((d.xp / maxWeeklyXp) * 100, 100);
              const displayDay = d.day.slice(0, 3);
              return (
                <div key={d.day} className="flex flex-col items-center justify-end gap-2 flex-1 h-full">
                  <span className="text-[12px] font-bold text-[#8B5CF6]/70">{d.xp}</span>
                  <div
                    className="w-full rounded-t-xl transition-all duration-500"
                    style={{
                      height: `${heightPct}%`,
                      minHeight: 4,
                      backgroundColor: isToday ? "#7C3AED" : "#E9D5FF",
                    }}
                  />
                  <span className={`text-[13px] font-bold ${isToday ? "text-[#8B5CF6]/70" : "text-[#8B5CF6]/70"}`}>{displayDay}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 4. Realm Progress — from API ────────────────────────── */}
      <div>
        <h3 className="text-xl font-bold text-[#14062B] mb-4">Realm Progress</h3>

        {(insightsLoading || realmsLoading) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : finalRealmCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalRealmCards.map((realm) => (
              <RealmProgressCard key={realm.id} childId={childId!} realm={realm} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-100 text-center">
            <p className="text-sm text-gray-400">No realm progress data yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
