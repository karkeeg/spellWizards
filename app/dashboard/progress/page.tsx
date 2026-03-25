"use client";

import React, { useState } from "react";
import ChildSelector from "../../components/dashboard/ChildSelector";
import MetricCard from "../../components/dashboard/MetricCard";
import { Flame, Star, Target, Zap, Clock, BookOpen, MousePointer2, Lightbulb, Gamepad2 } from "lucide-react";

import { useChildren } from "@/hooks/use-child";

export default function ProgressPage() {
  const { data: children, isLoading } = useChildren();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  // Set default selection once children are loaded
  React.useEffect(() => {
    if (children && children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].child_id);
    }
  }, [children, selectedChildId]);

  const selectedChild = children?.find((c) => c.child_id === selectedChildId);

  if (isLoading) {
    return (
      <div className="space-y-6 pb-8 animate-pulse p-4">
        <div className="h-10 w-64 bg-gray-100 rounded-xl mb-8" />
        <div className="h-48 bg-gray-100 rounded-[2rem]" />
      </div>
    );
  }

  if (!children || children.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100 min-h-[400px]">
        <h3 className="text-xl font-bold text-[#14062B] mb-2 font-syne">No learners yet</h3>
        <p className="text-dashboard-text-muted mb-6">Add your first child to see their magical progress!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Child Selector */}
      <ChildSelector 
        children_list={children.map((c, i) => ({ 
          id: c.child_id, 
          name: c.name, 
          color: i % 2 === 0 ? "#7C3AED" : "#F97316" 
        }))} 
        selectedId={selectedChildId || ""} 
        onSelect={setSelectedChildId} 
      />

      {/* Main Stats Card */}
      <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-[#14062B] border-4 border-white shadow-lg relative`}>
              <span className="text-2xl font-bold">{selectedChild?.name.charAt(0)}</span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <Star size={12} className="text-white fill-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#14062B] font-syne">{selectedChild?.name}</h2>
              <p className="text-xs text-dashboard-text-muted mt-1 font-medium">
                {selectedChild?.class_name} Grade • Last active {selectedChild?.created_at ? new Date(selectedChild.created_at).toLocaleDateString() : "Recently"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 md:gap-10 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
            <MetricCard label="Day Streak" value={selectedChild?.streak_days.toString() || "0"} icon={Flame} color="text-orange-500" />
            <MetricCard label="Level" value={`Lv.${selectedChild?.current_level || 1}`} icon={Star} color="text-blue-500" />
            <MetricCard label="Accuracy" value="--" icon={Target} color="text-green-500" />
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-[#14062B]">XP Progress to Level {(selectedChild?.current_level || 1) + 1}</span>
            <span className="text-dashboard-text-muted tabular-nums">{selectedChild?.xp.toLocaleString()} / {((selectedChild?.current_level || 1) + 1) * 10000}</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-50/50">
            <div 
              className="h-full bg-orange-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(249,115,22,0.3)]"
              style={{ width: `${Math.min(((selectedChild?.xp || 0) / (((selectedChild?.current_level || 1) + 1) * 10000)) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Breakdown */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">Skill Breakdown</h3>
          <div className="space-y-6">
            {[
              { label: "Spelling Power", value: 72, color: "bg-purple-500" },
              { label: "Accuracy", value: 87, color: "bg-green-500" },
              { label: "Speed", value: 58, color: "bg-cyan-500" },
              { label: "Creativity", value: 65, color: "bg-orange-500" },
            ].map((skill) => (
              <div key={skill.label} className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-[#14062B]">{skill.label}</span>
                  <span className="text-dashboard-purple">{skill.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                  <div 
                    className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly XP Activity */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">Weekly XP Activity</h3>
          <div className="flex items-end justify-between h-40 gap-2 pb-6 border-b border-gray-100">
            {[
              { day: "Mon", value: 210 },
              { day: "Tue", value: 340 },
              { day: "Wed", value: 180 },
              { day: "Thu", value: 420 },
              { day: "Fri", value: 390 },
              { day: "Sat", value: 500 },
              { day: "Sun", value: 310, current: true },
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#14062B] text-white text-[10px] py-1 px-2 rounded-md mb-1 font-bold">
                  {d.value}
                </div>
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${d.current ? "bg-dashboard-purple shadow-[0_0_20px_rgba(124,58,237,0.4)]" : "bg-purple-100 group-hover:bg-purple-200"}`}
                  style={{ height: `${(d.value / 500) * 100}%` }}
                />
                <span className="text-[10px] font-bold text-dashboard-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Realm Progress */}
      <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">Realm Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Sounds of Echoes", progress: 80, xp: 800, color: "bg-blue-500", border: "border-blue-100", bg: "bg-blue-50/50" },
            { name: "Path of Valor", progress: 50, xp: 500, color: "bg-purple-500", border: "border-purple-100", bg: "bg-purple-50/50" },
            { name: "Frozen Peaks", progress: 68, xp: 680, color: "bg-orange-500", border: "border-orange-100", bg: "bg-orange-50/50" },
            { name: "Mystic Forest", progress: 12, xp: 120, color: "bg-red-500", border: "border-red-100", bg: "bg-red-50/50" },
          ].map((realm) => (
            <div key={realm.name} className={`${realm.bg} p-6 rounded-3xl border ${realm.border} group hover:shadow-md transition-shadow`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-xl ${realm.color} flex items-center justify-center text-white shadow-sm`}>
                  <BookOpen size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#14062B]">{realm.name}</h4>
                    <span className="text-sm font-black text-dashboard-purple">{realm.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden border border-white/20">
                  <div 
                    className={`h-full ${realm.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${realm.progress}%` }}
                  />
                </div>
                <p className="text-[10px] font-bold text-dashboard-text-muted uppercase tracking-widest">{realm.xp} / 1,000 XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Games */}
      <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">Recent Games</h3>
        <div className="space-y-3">
          {[
            { name: "Meaning Maze", date: "Yesterday", score: 850, icon: MousePointer2 },
            { name: "Lightning Spell", date: "2 days ago", score: 1240, icon: Zap },
            { name: "Word Builder", date: "3 days ago", score: 2249, icon: Lightbulb },
          ].map((game) => (
            <div key={game.name + game.date} className="bg-[#FCFAFF] p-5 rounded-2xl flex items-center justify-between border border-gray-100 hover:border-dashboard-purple/20 hover:bg-white transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-dashboard-purple group-hover:scale-110 transition-transform shadow-sm">
                  <game.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#14062B] text-sm">{game.name}</h4>
                  <p className="text-xs text-dashboard-text-muted mt-0.5">{game.date}</p>
                </div>
              </div>
              <div className="text-xl font-black text-[#14062B] font-syne">{game.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
