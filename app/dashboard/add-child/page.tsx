"use client";

import React, { useState } from "react";
import { ChevronRight, ShieldCheck, Link as LinkIcon, Star, User } from "lucide-react";

const avatars = [
  { id: "1", color: "bg-orange-400" },
  { id: "2", color: "bg-blue-400" },
  { id: "3", color: "bg-purple-400" },
  { id: "4", color: "bg-green-400" },
  { id: "5", color: "bg-red-400" },
  { id: "6", color: "bg-yellow-400" },
];

const colors = [
  "#F97316", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"
];

export default function AddChildPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 animate-fade-in">
      {/* Form Section */}
      <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-dashboard-border p-8 md:p-12 shadow-sm">
        <h3 className="text-2xl font-bold text-[#14062B] font-syne mb-2">Create Child Profile</h3>
        <p className="text-sm text-dashboard-text-muted mb-10">Set up your child&apos;s profile. They&apos;ll use the generated invite code to link the Spell Wizards app to your portal.</p>
        
        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
          {/* Avatar Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-[#14062B] uppercase tracking-wider">Choose Avatar</label>
            <div className="flex flex-wrap gap-4">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-14 h-14 rounded-full ${avatar.color} flex items-center justify-center border-4 transition-all duration-300 ${
                    selectedAvatar.id === avatar.id ? "border-dashboard-purple scale-110 shadow-lg shadow-purple-100" : "border-white hover:border-gray-100"
                  }`}
                >
                  <User size={24} className="text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-[#14062B] uppercase tracking-wider">Avatar Color</label>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    selectedColor === color ? "border-dashboard-purple scale-125 shadow-sm" : "border-white hover:border-gray-100"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#14062B] uppercase tracking-widest px-1">Full Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Arjun Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-dashboard-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#14062B] uppercase tracking-widest px-1">Age *</label>
              <input 
                type="text" 
                placeholder="e.g. 10"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-gray-50 border border-dashboard-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#14062B] uppercase tracking-widest px-1">Grade</label>
            <input 
              type="text" 
              placeholder="e.g. 5th"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-gray-50 border border-dashboard-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#14062B] uppercase tracking-widest px-1">Learning Goal (optional)</label>
            <input 
              type="text" 
              placeholder="e.g. Improve vocabulary for school exams"
              className="w-full bg-gray-50 border border-dashboard-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#14062B] uppercase tracking-widest px-1">Notes for Wiz+ (optional)</label>
            <textarea 
              placeholder="e.g. Has difficulty with silent letters, loves dinosaurs..."
              rows={3}
              className="w-full bg-gray-50 border border-dashboard-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all font-medium resize-none"
            />
          </div>

          <button className="w-full py-5 bg-dashboard-purple/20 text-dashboard-purple rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-dashboard-purple hover:text-white transition-all shadow-lg shadow-purple-50 group border border-dashboard-purple/10">
            Create Profile & Generate Invite Code
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="space-y-8">
        {/* Preview Card */}
        <div className="bg-white rounded-3xl border border-dashboard-border p-8 shadow-sm text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-0 transition-all duration-500 group-hover:scale-150" />
          <span className="text-[10px] font-bold text-dashboard-text-muted uppercase tracking-widest mb-6 block relative z-10">Preview</span>
          <div 
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white border-8 border-white shadow-xl relative z-10 mb-6 transition-transform group-hover:scale-110`}
            style={{ backgroundColor: selectedColor }}
          >
            <User size={48} />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center shadow-md">
              <Star size={14} className="text-white fill-white" />
            </div>
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-[#14062B] font-syne">{name || "Child Name"}</h4>
            <p className="text-sm text-dashboard-text-muted mt-1 font-medium italic">
              {grade ? `${grade} Grade` : "Grade"} • Age {age || "--"}
            </p>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-purple-100 text-dashboard-purple text-[10px] font-bold border border-purple-200 uppercase tracking-tighter inline-block shadow-sm">
              Level 1 - New Wizard
            </div>
          </div>
        </div>

        {/* Info Block 1 */}
        <div className="bg-white rounded-3xl border border-dashboard-border p-6 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-[#14062B] flex items-center gap-2">
            <LinkIcon size={18} className="text-dashboard-purple" />
            How Linking Works
          </h4>
          <ul className="space-y-3">
            {[
              "You create the profile here",
              "We generate a unique invite code",
              "Your child enters the code in the app",
              "Their account links — you see everything!",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-dashboard-purple mt-1.5 flex-shrink-0" />
                <span className="text-xs text-dashboard-text-muted leading-relaxed font-medium">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Block 2 */}
        <div className="bg-gradient-to-br from-dashboard-purple to-[#6D28D9] rounded-3xl p-8 text-white shadow-xl shadow-purple-200/50 relative overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-white/10 group-hover:bg-white transition-colors group-hover:text-dashboard-purple">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold font-syne mb-2">Safe & Private</h4>
              <p className="text-xs text-purple-100 leading-relaxed font-medium">
                No email or phone number needed for the child&apos;s account. Everything is managed through your parent portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
