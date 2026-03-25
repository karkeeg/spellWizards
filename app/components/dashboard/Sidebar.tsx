"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  UserPlus, 
  Settings,
  ChevronRight,
  LogOut
} from "lucide-react";

import { useParentProfile } from "@/hooks/use-parent-profile";
import { useAuth } from "@/contexts/auth-context";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Progress", href: "/dashboard/progress", icon: BarChart3 },
  { name: "My children", href: "/dashboard/children", icon: Users },
  { name: "Custom Words", href: "/dashboard/words", icon: FileText },
  { name: "Add Child", href: "/dashboard/add-child", icon: UserPlus },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: profile, isLoading } = useParentProfile();
  const { logout } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return "P";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-dashboard-border flex flex-col fixed left-0 top-0 z-30">
      {/* Logo Section */}
      <div className="p-6 pb-4 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/spellWizard.svg" 
            alt="SpellWizards Logo" 
            width={140} 
            height={40} 
            className="h-auto w-auto"
          />
        </Link>
        <div className="bg-[#F3E8FF] text-dashboard-purple text-[10px] font-black py-2 px-3 rounded-xl text-center uppercase tracking-widest border border-purple-100/50">
          Parents Portal
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto hide-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? "bg-[#F3E8FF] text-dashboard-purple shadow-md shadow-purple-100/30" 
                  : "text-dashboard-text-muted hover:bg-gray-50 hover:text-dashboard-purple"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={`${isActive ? "text-dashboard-purple" : "text-gray-400 group-hover:text-dashboard-purple"}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-dashboard-border bg-gray-50/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 p-2 rounded-xl flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#D8B4FE] flex items-center justify-center text-white font-bold shrink-0">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              getInitials(profile?.parent_name)
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-[#14062B] truncate">
              {isLoading ? "Loading..." : profile?.parent_name || "Guest Parent"}
            </span>
            <span className="text-[10px] text-dashboard-text-muted truncate">
              Parent Account • {profile?.onboarding_status === "completed" ? "Pro" : "Basic"}
            </span>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={logout}
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group shrink-0"
          title="Logout"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </aside>
  );
}
