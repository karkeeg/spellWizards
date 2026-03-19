"use client";

import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import NotificationDrawer from "../components/dashboard/NotificationDrawer";
import AskWizDrawer from "../components/dashboard/AskWizDrawer";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAskWizOpen, setIsAskWizOpen] = useState(false);

  // Determine topbar title based on pathname
  const getTitle = (path: string) => {
    if (path.includes("/progress")) return "Progress";
    if (path.includes("/children")) return "My Children";
    if (path.includes("/words")) return "Custom Words";
    if (path.includes("/add-child")) return "Add a Child Profile";
    if (path.includes("/settings")) return "Settings";
    return "Overview";
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative transition-all duration-300">
        {/* Topbar */}
        <Topbar 
          title={getTitle(pathname)} 
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenAskWiz={() => setIsAskWizOpen(true)}
        />

        {/* Page Content */}
        <main className="mt-16 p-6 flex-1 overflow-x-hidden hide-scrollbar">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Drawers */}
      <NotificationDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
      <AskWizDrawer 
        isOpen={isAskWizOpen} 
        onClose={() => setIsAskWizOpen(false)} 
      />
    </div>
  );
}
