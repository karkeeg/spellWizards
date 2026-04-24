"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { useChildren } from "@/hooks/use-child";
import ChildListItem from "@/app/components/dashboard/ChildListItem";
import Link from "next/link";

export default function MyChildrenPage() {
  const { data: children, isLoading } = useChildren();
  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#14062B] font-syne">My Children</h2>
          <p className="text-xs text-dashboard-text-muted mt-1 font-medium">{children?.length || 0} linked profiles</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/add-child"
            className="flex items-center gap-2 bg-dashboard-purple text-white px-5 py-2.5 rounded-xl hover:bg-[#6D28D9] transition-all font-bold shadow-md shadow-purple-200 text-sm"
          >
            <Plus size={18} />
            <span>Add Child</span>
          </Link>
          <Link
            href="/dashboard/delete-child"
            className="flex items-center gap-2 text-red-500 px-5 py-2.5 rounded-xl border-2 border-red-500 text-sm"
          >
            <Trash2 size={18} />
            <span>Delete Child Profile</span>
          </Link>
        </div>
      </div>

      <div className="space-y-5">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-[2rem] animate-pulse" />
          ))
        ) : children && children.length > 0 ? (
          children.map((child) => (
            <ChildListItem key={child.child_id} child={child} />
          ))
        ) : (
          <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
            <h4 className="text-lg font-bold text-[#14062B] mb-2">No children found</h4>
            <p className="text-sm text-dashboard-text-muted mb-6">Start by adding your first child to the family!</p>
            <Link
              href="/dashboard/add-child"
              className="bg-dashboard-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6D28D9] transition-all"
            >
              Add Child
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
