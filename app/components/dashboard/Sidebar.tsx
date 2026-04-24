"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import progress from "@/public/icons/progress.svg"
import home from "@/public/icons/Home.svg"
import users from "@/public/icons/UserCircle.svg"
import customWords from "@/public/icons/custom words.svg"
import addUser from "@/public/icons/add.svg"
import settings from "@/public/icons/settings.svg"
import { useParentProfile } from "@/hooks/use-parent-profile";
import { useAuth } from "@/contexts/auth-context";
import UserAvatar from "@/app/components/UserAvatar";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: home },
  { name: "Progress", href: "/dashboard/progress", icon: progress },
  { name: "My children", href: "/dashboard/children", icon: users },
  { name: "Custom Words", href: "/dashboard/words", icon: customWords },
  { name: "Add Child", href: "/dashboard/add-child", icon: addUser },
  { name: "Settings", href: "/dashboard/settings", icon: settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: profile, isLoading } = useParentProfile();
  const { logout } = useAuth();

  return (
    <aside
      className={`w-64 h-screen bg-white border-r border-dashboard-border flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* Logo Section */}
      <div className="p-6 pb-4 flex flex-col gap-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-6 p-2 text-gray-400 hover:text-dashboard-purple md:hidden"
        >
          <X size={20} />
        </button>
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
      {/* full length  border  */}
      <div className="border w-full border-[#7125F4]/20"></div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto hide-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-2 rounded-2xl transition-all duration-300 group ${isActive
                ? "bg-[#F3E8FF]/60 text-dashboard-purple shadow-sm border-l-[6px] border-l-dashboard-purple shadow-purple-100/30"
                : "text-dashboard-text-muted hover:bg-gray-50 hover:text-dashboard-purple"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={22}
                    height={22}
                    className={`transition-all duration-300 ${!isActive ? "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100" : ""}`}
                  />
                </div>
                <span className={`text-[15px] font-semibold transition-colors duration-300 ${isActive ? "text-dashboard-purple" : "group-hover:translate-x-0.5"
                  }`}>
                  {item.name}
                </span>
              </div>

            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-dashboard-border bg-gray-50/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 p-2 rounded-xl flex-1 min-w-0">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-[#D8B4FE] flex items-center justify-center text-white shrink-0">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <UserAvatar 
              name={profile?.parent_name} 
              avatarUrl={profile?.avatar_url} 
              className="w-10 h-10 text-white font-bold bg-[#D8B4FE]" 
              fallbackColor="#D8B4FE" 
            />
          )}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-[#14062B] truncate">
              {isLoading
                ? "Loading..."
                : profile?.parent_name || "Guest Parent"}
            </span>
            <span className="text-[10px] text-dashboard-text-muted truncate">
              Parent Account •{" "}
              {profile?.onboarding_status === "completed" ? "Pro" : "Basic"}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group shrink-0"
          title="Logout"
        >
          <LogOut
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
      </div>
    </aside>
  );
}
