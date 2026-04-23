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
import { TargetIcon, AsteriskCircleIcon, ClockIcon, AccessibilityIcon } from "@/app/components/icons";
import { useChildren, useChildStats } from "@/hooks/use-child";
import { useChildInsights, useParentRealms } from "@/hooks/use-insights";

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
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md flex-shrink-0"
              style={{ backgroundColor: avatarColor }}
            >
              {child.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#14062B]">{child.name}</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {child.class_name} Grade &bull; Last active Yesterday, 4:30 PM
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <StatItem icon={<Gem size={18} fill="#3D85FD" className="text-blue-500" />} value={`Lv. ${child.current_level}`} label="Level" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<Zap size={18} fill="#7C3AED" color="#7C3AED" className="text-yellow-500" />} value={(stats?.total_xp_earned ?? child.xp).toLocaleString()} label="Total XP" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<CompassIcon size={20} color="white" fill="#16A34A" className="" />} value={String(stats?.total_quests_completed ?? 0)} label="Quests" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<Target size={18} className="text-orange-500" />} value="87%" label="Accuracy" />
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<Flame size={18} fill="#F97316" className="text-orange-600" />} value={String(child.streak_days)} label="Day Streak" />
            
              <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <StatItem icon={<Clock size={18} fill="#00B3DE" className="text-white" />} value={'0'} label="Weekly Practice" />
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
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500">
              <ChartScatter size={24} />
            </div>
            <h3 className="text-base font-bold text-[#14062B]">Weekly XP Activity</h3>
          </div>
          <div className="flex items-end justify-between gap-1 h-28 pb-1">
            {(stats?.weekly_activity ?? WEEKLY_XP_FALLBACK).map((d) => {
              const isToday = d.day === todayName;
              const heightPct = Math.min((d.xp / maxWeeklyXp) * 100, 100);
              const displayDay = d.day.slice(0, 3);
              return (
                <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-[11px] text-gray-400 font-semibold">{d.xp}</span>
                  <div
                    className="w-full rounded-t-sm transition-all duration-500"
                    style={{
                      height: `${heightPct}%`,
                      minHeight: 4,
                      backgroundColor: isToday ? "#7C3AED" : "#C4B5FD",
                    }}
                  />
                  <span className={`text-[11px] font-medium ${isToday ? "text-[#7C3AED] font-bold" : "text-gray-400"}`}>{displayDay}</span>
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
              <div
                key={realm.id}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm"
              >
                {/* Title + % */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-[#14062B]">{realm.name}</h4>
                  <span className="text-base font-bold text-[#7C3AED]">{realm.percent}%</span>
                </div>

                {/* Description */}
                {realm.description && (
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{realm.description}</p>
                )}

                {/* Topics as tags */}
                {realm.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {realm.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-100"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${realm.percent}%`,
                      backgroundColor: realm.barColor,
                    }}
                  />
                </div>

                {/* Quest info */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-400 font-medium">
                    {realm.questsDone} / {realm.questsTotal} Quests
                  </p>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${realm.status === "completed" ? "bg-green-50 text-green-600" :
                    realm.status === "in_progress" ? "bg-blue-50 text-blue-600" :
                      "bg-gray-50 text-gray-400"
                    }`}>
                    {realm.status === "not_started" ? "Not Started" :
                      realm.status === "in_progress" ? "In Progress" :
                        realm.status === "completed" ? "Completed" :
                          realm.status.replace(/_/g, " ")}
                  </span>
                </div>

                {/* View breakdown */}
                <button className="text-xs font-semibold text-[#7C3AED] hover:underline">
                  View Topic breakdown
                </button>
              </div>
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
