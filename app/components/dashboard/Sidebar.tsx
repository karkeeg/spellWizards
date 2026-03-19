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
  ChevronRight
} from "lucide-react";

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
      <div className="p-4 border-t border-dashboard-border bg-gray-50/50">
        <div className="flex items-center gap-3 p-2 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#D8B4FE] flex items-center justify-center text-white font-bold">
            MK
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-[#14062B] truncate">Meena Kumar</span>
            <span className="text-[10px] text-dashboard-text-muted truncate">Parent Account • Pro</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
