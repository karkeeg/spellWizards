"use client";

import React from "react";
import { Bell, MessageCirclePlus, Menu } from "lucide-react";

interface TopbarProps {
  title: string;
  onOpenNotifications: () => void;
  onOpenAskWiz: () => void;
  onToggleSidebar: () => void;
}

export default function Topbar({
  title,
  onOpenNotifications,
  onOpenAskWiz,
  onToggleSidebar,
}: TopbarProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-dashboard-border flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 md:left-64 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-[#14062B] font-syne truncate max-w-[150px] sm:max-w-none">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="flex items-center gap-2 p-2 md:px-4 md:py-2 rounded-xl bg-[#F3E8FF] text-dashboard-purple border border-dashboard-purple/20 hover:bg-[#EDE9FE] transition-all font-medium text-sm group"
        >
          <Bell
            size={18}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="hidden sm:inline">Notifications</span>
        </button>

        {/* Ask Wiz Button */}
        <button
          onClick={onOpenAskWiz}
          className="flex items-center gap-2 p-2 md:px-4 md:py-2 rounded-xl bg-dashboard-purple text-white hover:bg-[#6D28D9] transition-all font-medium text-sm shadow-md"
        >
          <span className="hidden sm:inline">Ask Wiz +</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>
    </header>
  );
}
