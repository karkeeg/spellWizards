"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function MetricCard({ label, value, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100`}>
        <Icon size={20} className={color} />
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-[#14062B] leading-none">{value}</p>
        <p className="text-[10px] text-dashboard-text-muted font-bold uppercase tracking-wider mt-1">{label}</p>
      </div>
    </div>
  );
}
