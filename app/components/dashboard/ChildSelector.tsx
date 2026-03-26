"use client";

import React from "react";

interface Child {
  id: string;
  name: string;
  color: string;
}

interface ChildSelectorProps {
  children_list: Child[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ChildSelector({ children_list, selectedId, onSelect }: ChildSelectorProps) {
  return (
    <div className="flex gap-3 mb-6 md:mb-8 overflow-x-auto hide-scrollbar pb-1">
      {children_list.map((child) => (
        <button
          key={child.id}
          onClick={() => onSelect(child.id)}
          className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-xl border-2 transition-all duration-300 font-bold text-xs md:text-sm whitespace-nowrap shrink-0 ${
            selectedId === child.id
              ? "bg-[#F3E8FF] border-dashboard-purple text-dashboard-purple shadow-sm"
              : "bg-white border-transparent text-gray-400 hover:border-gray-200 hover:bg-gray-50/50"
          }`}
        >
          <div 
            className={`w-3 h-3 rounded-full ${child.id === '1' ? 'bg-orange-400' : 'bg-yellow-400'}`} 
            style={{ backgroundColor: child.color }}
          />
          {child.name}
        </button>
      ))}
    </div>
  );
}
