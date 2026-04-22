"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  color: string;
  bgColor: string;
}

export default function StatCard({
  title,
  value,
  label,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="flex flex-col items-start gap-3">
        <div
          className={`w-12 h-12  flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={60} className={color} />
        </div>
        <div>
          <h3 className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</h3>
          <p className="text-sm font-bold text-[#14062B] mt-1">
            {title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
