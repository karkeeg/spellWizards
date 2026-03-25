"use client";

import React, { useState } from "react";
import ChildSelector from "../../components/dashboard/ChildSelector";
import { Plus, X, Check, BookOpen, Users, Loader2 } from "lucide-react";
import Link from "next/link";
import { useChildren, useCustomWords, useAddCustomWord } from "@/hooks/use-child";
import toast from "react-hot-toast";

export default function CustomWordsPage() {
  const [newWord, setNewWord] = useState("");
  const { data: children, isLoading: isChildrenLoading } = useChildren();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  // Set default selected child once data loads
  React.useEffect(() => {
    if (children && children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].child_id);
    }
  }, [children, selectedChildId]);

  const { data: words, isLoading: isWordsLoading } = useCustomWords(selectedChildId);
  const { mutate: addWord, isPending: isAdding } = useAddCustomWord();

  const selectedChild = children?.find((c) => c.child_id === selectedChildId);

  const handleAddWord = () => {
    if (!newWord.trim() || !selectedChildId) return;
    addWord(
      { childId: selectedChildId, word: newWord.trim() },
      {
        onSuccess: () => {
          toast.success(`"${newWord.trim()}" added to ${selectedChild?.name.split(" ")[0]}'s list!`);
          setNewWord("");
        },
        onError: () => {
          toast.error("Failed to add word. Please try again.");
        },
      }
    );
  };

  if (isChildrenLoading) {
    return (
      <div className="space-y-6 pb-8 animate-pulse p-4">
        <div className="h-10 w-64 bg-gray-100 rounded-xl mb-8" />
        <div className="h-48 bg-gray-100 rounded-[2rem]" />
      </div>
    );
  }

  if (!children || children.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100 min-h-[400px]">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="text-dashboard-purple" size={32} />
        </div>
        <h3 className="text-xl font-bold text-[#14062B] mb-2 font-syne">No children found</h3>
        <p className="text-dashboard-text-muted mb-6">Add a child to start managing their custom word lists!</p>
        <Link
          href="/dashboard/add-child"
          className="bg-dashboard-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6D28D9] transition-all"
        >
          Add Child
        </Link>
      </div>
    );
  }

  const wordsList = Array.isArray(words) ? words : [];
  const totalWords = wordsList.length;
  const masteredWords = wordsList.filter((w) => w.status === "mastered").length;
  const inProgressWords = wordsList.filter((w) => w.status === "active").length;

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Child Selector */}
      <ChildSelector
        children_list={children.map((c) => ({
          id: c.child_id,
          name: c.name,
          color: c.avatar_url?.startsWith("#") ? c.avatar_url : "#8B5CF6",
        }))}
        selectedId={selectedChildId || ""}
        onSelect={setSelectedChildId}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Words", value: totalWords, color: "text-purple-600", bgColor: "bg-purple-100", icon: BookOpen },
          { label: "Mastered", value: masteredWords, color: "text-green-600", bgColor: "bg-green-100", icon: Users },
          { label: "In Progress", value: inProgressWords, color: "text-orange-600", bgColor: "bg-orange-100", icon: Users },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-3xl border border-dashboard-border shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <h3 className={`text-xl font-black ${stat.color} font-syne leading-none`}>{stat.value}</h3>
              <p className="text-[9px] text-dashboard-text-muted font-bold uppercase tracking-widest mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Words Form */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-[#14062B] font-syne mb-1">
            Add Words for {selectedChild?.name.split(" ")[0]}
          </h3>
          <p className="text-xs text-dashboard-text-muted mb-6">
            Words appear in {selectedChild?.name.split(" ")[0]}&apos;s game sessions automatically.
          </p>

          <div className="space-y-5">
            <div className="relative group">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
                placeholder="Type a word..."
                disabled={isAdding}
                className="w-full bg-gray-50 border border-dashboard-border rounded-xl px-5 py-3.5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all placeholder:text-gray-400 font-medium disabled:opacity-60"
              />
              <button
                onClick={handleAddWord}
                disabled={isAdding || !newWord.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-dashboard-purple text-white rounded-lg flex items-center justify-center hover:bg-[#6D28D9] transition-all shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={20} />}
              </button>
            </div>

            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 text-center">
              <p className="text-[10px] font-bold text-orange-800 leading-relaxed">
                <span className="text-orange-500">Tip:</span> Add words from homework, books, or topics you&apos;re exploring together!
              </p>
            </div>
          </div>
        </div>

        {/* Word List */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">Word List ({totalWords})</h3>
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-hide">
            {isWordsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              ))
            ) : wordsList.length > 0 ? (
              wordsList.map((w) => (
                <div
                  key={w.id}
                  className={`p-4 rounded-xl border flex items-center justify-between group transition-all duration-300 ${
                    w.status === "mastered"
                      ? "bg-green-50/50 border-green-100 hover:bg-green-50"
                      : "bg-[#FCFAFF] border-purple-50 hover:border-dashboard-purple/20 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                      w.status === "mastered" ? "bg-white text-green-500 shadow-sm" : "bg-white text-dashboard-purple shadow-sm"
                    }`}>
                      {w.status === "mastered" ? <Check size={16} /> : <BookOpen size={16} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#14062B] text-sm capitalize">{w.word}</h4>
                      <p className="text-[9px] text-dashboard-text-muted mt-0.5 font-bold uppercase tracking-widest">
                        {w.created_at ? new Date(w.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                      w.status === "mastered"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-purple-100 text-dashboard-purple border-purple-200"
                    }`}>
                      {w.status === "mastered" ? "Mastered" : w.status === "active" ? "Active" : w.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-sm font-bold text-gray-400">No words added yet</p>
                <p className="text-xs text-gray-300 mt-1">Type a word above and press Enter to add it!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
