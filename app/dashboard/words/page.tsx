"use client";

import React, { useState } from "react";
import ChildSelector from "../../components/dashboard/ChildSelector";
import { Plus, X, Check, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { useChildren, useCustomWords, useAddCustomWord } from "@/hooks/use-child";
import toast from "react-hot-toast";
import { AsteriskCircleIcon, AccessibilityIcon, TargetIcon } from "@/app/components/icons";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCardProps {
  value: number | string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ value, label, color, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-[2rem] border border-purple-100/50 p-6 shadow-sm relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className={`text-4xl font-black font-syne leading-none mb-2`} style={{ color }}>
          {value}
        </h3>
        <p className="text-[14px] text-[#8E78B3] font-bold">{label}</p>
      </div>
      <div className="absolute top-0 right-0 h-full w-1/2 flex items-center justify-end pr-0 translate-x-4">
        <div className="flex items-center justify-center translate-x-1/4">{icon}</div>
      </div>
    </div>
  );
}

function EmptyWordList() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen size={32} className="text-gray-200" />
      </div>
      <p className="text-base font-bold text-gray-400">No words added yet</p>
      <p className="text-sm text-gray-300 mt-1">Add words to help your child excel!</p>
    </div>
  );
}

function NoChildrenState() {
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomWordsPage() {
  const [newWord, setNewWord] = useState("");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const { data: children, isLoading: isChildrenLoading } = useChildren();
  const { data: words, isLoading: isWordsLoading } = useCustomWords(selectedChildId);
  const { mutate: addWord, isPending: isAdding } = useAddCustomWord();

  React.useEffect(() => {
    if (children && children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].child_id);
    }
  }, [children, selectedChildId]);

  const selectedChild = children?.find((c) => c.child_id === selectedChildId);
  const selectedChildFirstName = selectedChild?.name.split(" ")[0];

  const wordsList = Array.isArray(words) ? words : [];
  const totalWords = wordsList.length;
  const masteredWords = wordsList.filter((w) => w.status === "mastered").length;
  const needsReviewWords = wordsList.filter((w) => w.status === "active").length;

  const handleAddWord = () => {
    if (!newWord.trim() || !selectedChildId) return;
    addWord(
      { childId: selectedChildId, word: newWord.trim() },
      {
        onSuccess: () => {
          toast.success(`"${newWord.trim()}" added to ${selectedChildFirstName}'s list!`);
          setNewWord("");
        },
        onError: () => toast.error("Failed to add word. Please try again."),
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

  if (!children || children.length === 0) return <NoChildrenState />;

  return (
    <div className="pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <ChildSelector
          children_list={children.map((c) => ({
            id: c.child_id,
            name: c.name,
            color: "#FFB820",
          }))}
          selectedId={selectedChildId || ""}
          onSelect={setSelectedChildId}
        />
        <Link
          href="/dashboard/add-child"
          className="bg-dashboard-purple text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6D28D9] transition-all flex items-center gap-2 shadow-sm shadow-purple-200 active:scale-95 mb-6 md:mb-8"
        >
          <Plus size={20} />
          Add a child
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          value={masteredWords || 89}
          label="Words Mastered"
          color="#DE00DA"
          icon={<AsteriskCircleIcon size={140} className="opacity-10" />}
        />
        <StatCard
          value={needsReviewWords || 14}
          label="Needs Review"
          color="#FF4D4D"
          icon={
            <div className="w-32 h-32 bg-[#FFE4E4] rounded-full flex items-center justify-center">
              <AccessibilityIcon size={120} color="#FFFFFF" className="opacity-100" />
            </div>
          }
        />
        <StatCard
          value="87%"
          label="Accuracy"
          color="#FF4D4D"
          icon={<TargetIcon size={140} className="opacity-10" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Words */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-8 shadow-sm flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#14062B] font-syne mb-1">
              Add Words for {selectedChildFirstName}
            </h3>
            <p className="text-sm text-dashboard-text-muted">
              Words appear in {selectedChildFirstName}&apos;s game sessions automatically.
            </p>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
                placeholder="Type a word and press Enter..."
                disabled={isAdding}
                className="flex-1 bg-[#F3E8FF]/20 border-2 border-purple-100/50 rounded-2xl px-6 py-4 text-base focus:outline-none focus:ring-4 focus:ring-dashboard-purple/10 focus:border-dashboard-purple transition-all placeholder:text-gray-400 font-medium disabled:opacity-60"
              />
              <button
                onClick={handleAddWord}
                disabled={isAdding || !newWord.trim()}
                className="w-14 h-14 bg-dashboard-purple/30 text-dashboard-purple rounded-2xl flex items-center justify-center hover:bg-dashboard-purple hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAdding ? <Loader2 size={24} className="animate-spin" /> : <Plus size={28} />}
              </button>
            </div>

            <div className="bg-[#FFF9EE] p-5 rounded-2xl border border-orange-100/50">
              <p className="text-sm font-bold text-orange-800 leading-relaxed text-center">
                <span className="text-orange-500">Tip:</span> Add words from homework, books, or topics you&apos;re exploring together!
              </p>
            </div>
          </div>

          <button
            onClick={handleAddWord}
            disabled={isAdding || !newWord.trim()}
            className="w-full bg-dashboard-purple text-white py-4 rounded-2xl font-black text-lg mt-8 hover:bg-[#6D28D9] transition-all shadow-md active:scale-[0.98]"
          >
            Save Word List
          </button>
        </div>

        {/* Word List */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-8 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">
            Word List ({totalWords})
          </h3>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {isWordsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-50 rounded-2xl animate-pulse" />
              ))
            ) : wordsList.length > 0 ? (
              wordsList.map((w) => {
                const isMastered = w.status === "mastered";
                return (
                  <div
                    key={w.id}
                    className={`p-5 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
                      isMastered ? "bg-[#E6FFFA] border-green-100" : "bg-[#F3E8FF]/20 border-purple-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                        isMastered ? "bg-[#38A169] text-white" : "bg-dashboard-purple text-white"
                      }`}>
                        {isMastered ? <Check size={20} /> : <Plus size={20} className="rotate-45" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#14062B] text-base capitalize">{w.word}</h4>
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-1 block">
                          {w.created_at
                            ? new Date(w.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            : "Feb 25"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {isMastered && (
                        <span className="bg-[#BEE3F8] text-[#2C5282] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">
                          Mastered
                        </span>
                      )}
                      <button className="text-gray-300 hover:text-red-500 transition-colors">
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyWordList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}