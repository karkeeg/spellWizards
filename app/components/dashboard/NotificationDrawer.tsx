"use client";

import React, { useState } from "react";
import Drawer from "./Drawer";
import { Flame, UserPlus, Info, CheckCircle2 } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "streak" | "new_user" | "update" | "success";
  read: boolean;
  user?: string;
}

const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "Rahul's streak is at risk!",
    message: "He hasn't played today. 7-day streak ends at midnight.",
    time: "2m ago",
    type: "streak",
    read: false,
    user: "Rahul",
  },
  {
    id: "2",
    title: "Maya is on fire!",
    message: "She played yesterday and is on a 10-day streak.",
    time: "5h ago",
    type: "streak",
    read: false,
    user: "Maya",
  },
  {
    id: "3",
    title: "Tom just joined!",
    message: "He has yet to play his first game. Streak starts tomorrow.",
    time: "1d ago",
    type: "new_user",
    read: false,
    user: "Tom",
  },
  {
    id: "4",
    title: "Lila is in the game!",
    message: "She missed a day but has a 5-day streak.",
    time: "3h ago",
    type: "streak",
    read: false,
    user: "Lila",
  },
  {
    id: "5",
    title: "Sam's back!",
    message: "After a break, he aims for a new streak today.",
    time: "30m ago",
    type: "streak",
    read: true,
    user: "Sam",
  },
];

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const [activeTab, setActiveTab] = useState<"All" | "Unread">("All");

  const filteredNotifications = dummyNotifications.filter(n => 
    activeTab === "All" ? true : !n.read
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "streak": return <Flame size={18} className="text-orange-500" />;
      case "new_user": return <UserPlus size={18} className="text-blue-500" />;
      case "update": return <Info size={18} className="text-purple-500" />;
      case "success": return <CheckCircle2 size={18} className="text-green-500" />;
      default: return <Info size={18} />;
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="p-4 bg-white sticky top-0 z-10 border-b border-dashboard-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {["All", "Unread"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? "bg-dashboard-purple text-white shadow-sm" 
                    : "text-dashboard-text-muted hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="text-dashboard-purple text-sm font-medium hover:underline transition-all">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="divide-y divide-dashboard-border">
        {filteredNotifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-4 md:p-6 hover:bg-gray-50 transition-colors cursor-pointer group flex gap-3 md:gap-4 ${!notif.read ? "bg-purple-50/30" : ""}`}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white border border-dashboard-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
              {getIcon(notif.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#14062B] group-hover:text-dashboard-purple transition-colors">
                  {notif.title}
                </h3>
                <span className="text-[10px] text-dashboard-text-muted font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs text-dashboard-text-muted leading-relaxed">
                {notif.message}
              </p>
              {notif.user && (
                <div className="mt-2 text-[10px] font-bold text-dashboard-purple uppercase tracking-wider bg-dashboard-purple/10 px-2 py-0.5 rounded w-fit">
                  {notif.user}
                </div>
              )}
            </div>
            {!notif.read && (
              <div className="w-1.5 h-1.5 rounded-full bg-dashboard-purple mt-1 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </Drawer>
  );
}
