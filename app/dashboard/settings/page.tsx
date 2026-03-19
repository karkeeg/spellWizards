"use client";

import React, { useState } from "react";
import { Bell, Mail, Flame, Trophy, Save } from "lucide-react";

interface Preference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: any;
}

const initialPreferences: Preference[] = [
  {
    id: "1",
    title: "Daily Activity Report",
    description: "Get a summary of your child's daily learning activity",
    enabled: true,
    icon: Bell,
  },
  {
    id: "2",
    title: "Streak Alerts",
    description: "Be notified when a streak is at risk of breaking",
    enabled: true,
    icon: Flame,
  },
  {
    id: "3",
    title: "Weekly Progress Email",
    description: "Receive a detailed weekly report every Monday",
    enabled: false,
    icon: Mail,
  },
  {
    id: "4",
    title: "Achievement Notifications",
    description: "Know when your child earns badges or levels up",
    enabled: true,
    icon: Trophy,
  },
];

export default function SettingsPage() {
  const [preferences, setPreferences] = useState(initialPreferences);

  const togglePreference = (id: string) => {
    setPreferences(preferences.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  return (
    <div className="max-w-4xl animate-fade-in pb-8">
      <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 md:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-[#14062B] font-syne mb-6">Notification Preferences</h3>
        
        <div className="space-y-5">
          {preferences.map((pref) => (
            <div key={pref.id} className="flex items-center justify-between group">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  pref.enabled ? "bg-purple-100 text-dashboard-purple shadow-sm" : "bg-gray-100 text-gray-400 opacity-60"
                }`}>
                  <pref.icon size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className={`text-sm font-bold transition-colors ${pref.enabled ? "text-[#14062B]" : "text-gray-400 italic"}`}>
                    {pref.title}
                  </h4>
                  <p className="text-[10px] text-dashboard-text-muted font-medium pr-8">{pref.description}</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button 
                onClick={() => togglePreference(pref.id)}
                className={`w-12 h-7 rounded-full relative transition-all duration-300 flex items-center px-0.5 border-2 ${
                  pref.enabled ? "bg-dashboard-purple border-dashboard-purple" : "bg-gray-200 border-gray-200"
                }`}
              >
                <div 
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                    pref.enabled ? "translate-x-5 scale-110" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <button className="flex items-center justify-center gap-2 bg-dashboard-purple text-white px-6 py-3.5 rounded-xl hover:bg-[#6D28D9] transition-all font-bold shadow-lg shadow-purple-200 group text-sm">
            <Save size={18} className="group-hover:scale-110 transition-transform" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="mt-6 bg-purple-50/50 rounded-xl p-5 border border-purple-100/50">
        <p className="text-[10px] text-dashboard-purple font-medium leading-relaxed">
          <span className="font-bold">Note:</span> These settings apply to your parent portal notifications and emails. Child device notifications are managed within the SpellWizards app settings.
        </p>
      </div>
    </div>
  );
}
