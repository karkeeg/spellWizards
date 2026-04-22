"use client";

import React from "react";
import Link from "next/link";
import { Plus, Flame, Zap, Star, MoreVertical } from "lucide-react";
import { useChildren } from "@/hooks/use-child";

export default function MyChildrenPage() {
  const { data: children, isLoading } = useChildren();
  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#14062B] font-syne">My Children</h2>
          <p className="text-xs text-dashboard-text-muted mt-1 font-medium">{children?.length || 0} linked profiles</p>
        </div>
        <Link
          href="/dashboard/add-child"
          className="flex items-center gap-2 bg-dashboard-purple text-white px-5 py-2.5 rounded-xl hover:bg-[#6D28D9] transition-all font-bold shadow-md shadow-purple-200 text-sm"
        >
          <Plus size={18} />
          <span>Add Child</span>
        </Link>
      </div>

      <div className="space-y-5">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-[2rem] animate-pulse" />
          ))
        ) : children && children.length > 0 ? (
          children.map((child) => (
            <div key={child.child_id} className="bg-white rounded-[2rem] border border-dashboard-border p-5 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 md:gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 text-center sm:text-left">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0"
                    style={{ backgroundColor: child.avatar_url?.startsWith("#") ? child.avatar_url : "#8B5CF6" }}
                  >
                    <span className="text-xl font-bold">{child.name.charAt(0)}</span>
                  </div>
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
                        <Flame size={14} className="text-orange-500" />
                        <span className="text-xs font-bold text-[#14062B]">{child.streak_days}d</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Zap size={14} className="text-blue-500" />
                        <span className="text-xs font-bold text-[#14062B]">{child.xp.toLocaleString()} xp</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Star size={14} className="text-dashboard-purple" />
                        <span className="text-xs font-bold text-[#14062B]">Lv {child.current_level}</span>
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
          ))
        ) : (
          <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
            <h4 className="text-lg font-bold text-[#14062B] mb-2">No children found</h4>
            <p className="text-sm text-dashboard-text-muted mb-6">Start by adding your first child to the family!</p>
            <Link
              href="/dashboard/add-child"
              className="bg-dashboard-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6D28D9] transition-all"
            >
              Add Child
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
