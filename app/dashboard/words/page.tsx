"use client";

import React, { useState } from "react";
import ChildSelector from "../../components/dashboard/ChildSelector";
import { Plus, X, Check, BookOpen, Users } from "lucide-react";
import Link from "next/link";

import { useChildren } from "@/hooks/use-child";

const initialWords = [
  { id: "1", word: "Kaleidoscope", date: "Jan 20", status: "Mastered" },
  { id: "2", word: "Ambiguous", date: "Feb 8", status: "Mastered" },
  { id: "3", word: "Perpendicular", date: "Feb 25", status: "In Progress" },
  { id: "4", word: "Adventure", date: "Feb 25", status: "In Progress" },
];

export default function CustomWordsPage() {
  const [newWord, setNewWord] = useState("");
  const { data: children, isLoading } = useChildren();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [words, setWords] = useState(initialWords);

  // Set default selection
  React.useEffect(() => {
    if (children && children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].child_id);
    }
  }, [children, selectedChildId]);

  const handleAddWord = () => {
    if (!newWord.trim()) return;
    const wordObj = {
      id: Date.now().toString(),
      word: newWord,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      status: "In Progress"
    };
    setWords([wordObj, ...words]);
    setNewWord("");
  };

  const handleDelete = (id: string) => {
    setWords(words.filter(w => w.id !== id));
  };

  const selectedChild = children?.find(c => c.child_id === selectedChildId);

  if (isLoading) {
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

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Child Selector */}
      <ChildSelector 
        children_list={children.map((c, i) => ({ 
          id: c.child_id, 
          name: c.name, 
          color: i % 2 === 0 ? "#7C3AED" : "#F97316" 
        }))} 
        selectedId={selectedChildId || ""} 
        onSelect={setSelectedChildId} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Words", value: words.length, color: "text-purple-600", bgColor: "bg-purple-100", icon: BookOpen },
          { label: "Mastered", value: words.filter(w => w.status === "Mastered").length, color: "text-green-600", bgColor: "bg-green-100", icon: Users },
          { label: "In Progress", value: words.filter(w => w.status === "In Progress").length, color: "text-orange-600", bgColor: "bg-orange-100", icon: Users },
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
          <h3 className="text-lg font-bold text-[#14062B] font-syne mb-1">Add Words for {selectedChild?.name.split(' ')[0]}</h3>
          <p className="text-xs text-dashboard-text-muted mb-6">Words appear in {selectedChild?.name.split(' ')[0]}&apos;s game sessions automatically.</p>
          
          <div className="space-y-5">
            <div className="relative group">
              <input 
                type="text" 
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
                placeholder="Type a word..."
                className="w-full bg-gray-50 border border-dashboard-border rounded-xl px-5 py-3.5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all placeholder:text-gray-400 font-medium"
              />
              <button 
                onClick={handleAddWord}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-dashboard-purple text-white rounded-lg flex items-center justify-center hover:bg-[#6D28D9] transition-all shadow-md active:scale-95"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 text-center">
              <p className="text-[10px] font-bold text-orange-800 leading-relaxed">
                <span className="text-orange-500">Tip:</span> Add words from homework, books, or topics you&apos;re exploring together!
              </p>
            </div>

            <button className="w-full py-3.5 bg-dashboard-purple text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#6D28D9] transition-all shadow-lg shadow-purple-200 text-sm">
              Save Word List
            </button>
          </div>
        </div>

        {/* Word List */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">Word List ({words.length})</h3>
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-hide">
            {words.map((w) => (
              <div 
                key={w.id} 
                className={`p-4 rounded-xl border flex items-center justify-between group transition-all duration-300 ${
                  w.status === "Mastered" 
                    ? "bg-green-50/50 border-green-100 hover:bg-green-50" 
                    : "bg-[#FCFAFF] border-purple-50 hover:border-dashboard-purple/20 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                    w.status === "Mastered" ? "bg-white text-green-500 shadow-sm" : "bg-white text-dashboard-purple shadow-sm"
                  }`}>
                    {w.status === "Mastered" ? <Check size={16} /> : <BookOpen size={16} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#14062B] text-sm">{w.word}</h4>
                    <p className="text-[9px] text-dashboard-text-muted mt-0.5 font-bold uppercase tracking-widest">{w.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                    w.status === "Mastered" 
                      ? "bg-green-100 text-green-700 border-green-200" 
                      : "bg-purple-100 text-dashboard-purple border-purple-200"
                  }`}>
                    {w.status}
                  </span>
                  <button 
                    onClick={() => handleDelete(w.id)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
