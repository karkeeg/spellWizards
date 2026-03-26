"use client";

import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import NotificationDrawer from "../components/dashboard/NotificationDrawer";
import AskWizDrawer from "../components/dashboard/AskWizDrawer";
import { usePathname } from "next/navigation";
import { AuthGuard } from "../components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAskWizOpen, setIsAskWizOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <AuthGuard>
      <div className="min-h-screen bg-dashboard-bg flex relative">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col min-h-screen relative transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "ml-0 md:ml-64"}`}>
          {/* Topbar */}
          <Topbar 
            title={getTitle(pathname)} 
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenAskWiz={() => setIsAskWizOpen(true)}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Page Content */}
          <main className="mt-16 p-4 md:p-6 flex-1 overflow-x-hidden hide-scrollbar">
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
    </AuthGuard>
  );
}
