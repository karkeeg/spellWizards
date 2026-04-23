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
    <div className="bg-white px-6 py-5 rounded-2xl border border-purple-100/50 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center gap-4 md:gap-6">
        {/* Icon Container */}
        <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          <Icon size={44} className={color} />
        </div>
        
        {/* Value */}
        <div className={`text-4xl font-black ${color} tracking-tight`}>
          {value}
        </div>

        {/* Text Details */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-[16px] font-bold text-[#6D49A6] whitespace-nowrap">
            {title}
          </span>
          <div className="h-4 w-[1px] bg-purple-200/60 mx-1 flex-shrink-0" />
          <span className="text-[15px] text-[#8E78B3] font-medium whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
