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

export default function StatCard({
  title,
  value,
  label,
  icon: Icon,
  color,
  bgColor,
}: StatCardProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-dashboard-border shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${bgColor} group-hover:scale-110 transition-transform duration-300 shrink-0`}
        >
          <Icon size={20} className={color} />
        </div>
        <div>
          <h3 className={`text-xl md:text-2xl font-bold ${color}`}>{value}</h3>
          <p className="text-[18px] md:text-lg font-bold text-[#14062B] mt-0.5 md:mt-1">
            {title}
          </p>
          <p className="text-[16px] md:text-lg text-dashboard-text-muted mt-0.5">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
