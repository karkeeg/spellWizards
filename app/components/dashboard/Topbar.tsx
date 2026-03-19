"use client";

import React from "react";
import { Bell, MessageCirclePlus } from "lucide-react";

interface TopbarProps {
  title: string;
  onOpenNotifications: () => void;
  onOpenAskWiz: () => void;
}

export default function Topbar({ title, onOpenNotifications, onOpenAskWiz }: TopbarProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-dashboard-border flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-20">
      <h1 className="text-xl font-bold text-[#14062B] font-syne">{title}</h1>
      
      <div className="flex items-center gap-4">
        {/* Notifications Button */}
        <button 
          onClick={onOpenNotifications}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3E8FF] text-dashboard-purple border border-dashboard-purple/20 hover:bg-[#EDE9FE] transition-colors font-medium text-sm group"
        >
          <Bell size={18} className="group-hover:scale-110 transition-transform" />
          <span>Notifications</span>
        </button>

        {/* Ask Wiz Button */}
        <button 
          onClick={onOpenAskWiz}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dashboard-purple text-white hover:bg-[#6D28D9] transition-colors font-medium text-sm shadow-md"
        >
          <span>Ask Wiz +</span>
        </button>
      </div>
    </header>
  );
}
