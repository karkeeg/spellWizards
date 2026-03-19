"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function StatCard({ title, value, label, icon: Icon, color, bgColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-dashboard-border shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="flex flex-col gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} className={color} />
        </div>
        <div>
          <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
          <p className="text-sm font-bold text-[#14062B] mt-1">{title}</p>
          <p className="text-xs text-dashboard-text-muted mt-0.5">{label}</p>
        </div>
      </div>
    </div>
  );
}
