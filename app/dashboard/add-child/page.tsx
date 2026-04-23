"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Lock, User } from "lucide-react";
import { useCreateChildren } from "@/hooks/use-child";
import { useAvatars } from "@/hooks/use-avatar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";



const GRADE_OPTIONS = [
  "Pre-K",
  "Kindergarten",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
];

const SPELLING_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function AddChildPage() {
  const router = useRouter();
  const { mutate: createChildren, isPending } = useCreateChildren();
  const { data: avatars, isLoading: isLoadingAvatars } = useAvatars();
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (avatars && avatars.length > 0 && !selectedAvatarUrl) {
      setSelectedAvatarUrl(avatars[0].image_url);
    }
  }, [avatars, selectedAvatarUrl]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spellingLevel, setSpellingLevel] = useState("Beginner");
  const [learningGoal, setLearningGoal] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !grade || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    createChildren(
      {
        children: [
          {
            name,
            email,
            age: parseInt(age) || 0,
            class_name: grade,
            current_spelling_level: spellingLevel,
            interests: [],
            password,
            avatar_url: selectedAvatarUrl,
          },
        ],
      },
      {
        onSuccess: () => {
          toast.success(`${name}'s profile created! 🧙‍♂️`);
          router.push("/dashboard/children");
        },
        onError: () => {
          toast.error("Failed to create profile. Please try again.");
        },
      },
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8 animate-fade-in">
      {/* Left: Form */}
      <div className="lg:col-span-2 bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
        <p className="text-sm text-dashboard-text-muted mb-4 leading-relaxed">
          Set up your child&apos;s profile. They&apos;ll use the generated
          invite code to link the Spell Wizards app to your portal.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Avatar circles */}
          <div>
            <label className="text-sm font-semibold text-[#14062B] block mb-3">
              Choose Avatar
            </label>
            {isLoadingAvatars ? (
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />)}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {avatars?.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatarUrl(avatar.image_url)}
                    className={`relative shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                      selectedAvatarUrl === avatar.image_url
                        ? "ring-4 ring-offset-2 ring-dashboard-purple scale-110 shadow-lg"
                        : "opacity-60 hover:opacity-100 hover:scale-105 hover:ring-2 hover:ring-purple-200"
                    }`}
                  >
                    <Image src={avatar.image_url} alt={avatar.name} fill className="object-cover rounded-full bg-purple-50" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Name + Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-[#14062B] block mb-2">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Arjun Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F5F3FF] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/30 focus:border-dashboard-purple/40 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#14062B] block mb-2">
                Age *
              </label>
              <input
                type="number"
                placeholder="e.g. 10"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#F5F3FF] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/30 focus:border-dashboard-purple/40 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          {/* Grade */}
          <div>
            <label className="text-sm font-semibold text-[#14062B] block mb-2">
              Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-[#F5F3FF] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/30 focus:border-dashboard-purple/40 transition-all text-gray-700 font-medium"
            >
              <option value="">Select grade...</option>
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Email + Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-[#14062B] block mb-2">
                Child&apos;s Email *
              </label>
              <input
                type="email"
                placeholder="e.g. arjun@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F3FF] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/30 focus:border-dashboard-purple/40 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#14062B] block mb-2">
                Child&apos;s Password *
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F3FF] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/30 focus:border-dashboard-purple/40 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          {/* Spelling Level */}
          <div>
            <label className="text-sm font-semibold text-[#14062B] block mb-2">
              Spelling Level
            </label>
            <div className="flex gap-3 flex-wrap">
              {SPELLING_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpellingLevel(level)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${
                    spellingLevel === level
                      ? "bg-dashboard-purple text-white border-dashboard-purple shadow-md shadow-purple-100"
                      : "bg-[#F5F3FF] text-dashboard-text-muted border-transparent hover:border-dashboard-purple/20"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Goal */}
          <div>
            <label className="text-sm font-semibold text-[#14062B] block mb-2">
              Learning Goal (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Improve vocabulary for school exams"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              className="w-full bg-[#F5F3FF] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/30 focus:border-dashboard-purple/40 transition-all placeholder:text-gray-400 font-medium"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-semibold text-[#14062B] block mb-2">
              Notes for Wiz+ (optional)
            </label>
            <textarea
              placeholder="e.g. Has difficulty with silent letters, loves dinosaurs..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F5F3FF] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/30 focus:border-dashboard-purple/40 transition-all placeholder:text-gray-400 font-medium resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-2xl font-bold text-dashboard-purple text-sm flex items-center justify-center gap-2 transition-all border border-dashboard-purple/20 bg-[#EDE9FE] hover:bg-dashboard-purple hover:text-white disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {isPending
              ? "Creating Profile..."
              : "Create Profile & Generate Invite Code →"}
            {!isPending && (
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>
      </div>

      {/* Right: Preview + Info */}
      <div className="flex flex-col gap-5">
        {/* Preview Card */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm text-center">
          <p className="text-[10px] font-bold text-dashboard-text-muted uppercase tracking-widest mb-5">
            Preview
          </p>
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg mb-5 transition-all duration-300 relative overflow-hidden bg-purple-100"
          >
            {selectedAvatarUrl ? (
              <Image src={selectedAvatarUrl} alt="Preview Avatar" fill className="object-cover" />
            ) : name ? (
              <div className="w-full h-full bg-[#FFB820] flex items-center justify-center text-white">
                <span className="text-4xl font-bold font-syne">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            ) : (
              <User size={40} className="text-purple-300" />
            )}
          </div>
          <h4 className="text-xl font-bold text-[#14062B] font-syne">
            {name || "Child Name"}
          </h4>
          <p className="text-sm text-dashboard-text-muted mt-1 font-medium">
            {grade ? `${grade} Grade` : "5th Grade"} · Age {age || "—"}
          </p>
          <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-[#F3E8FF] text-dashboard-purple text-[10px] font-bold border border-purple-100">
            Level 1 · New Wizard
          </div>
        </div>

        {/* How Linking Works */}
        <div className="bg-white rounded-[2rem] border border-dashboard-border p-6 shadow-sm">
          <h4 className="text-sm font-bold text-[#14062B] mb-4">
            How Linking Works
          </h4>
          <ul className="space-y-3">
            {[
              "You create the profile here",
              "We generate a unique invite code",
              "Your child enters the code in the app",
              "Their account links — you see everything!",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-dashboard-purple mt-1.5 flex-shrink-0" />
                <span className="text-xs text-dashboard-text-muted leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>

       {/* Safe & Private */}
<div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden">
  <div className="absolute -bottom-25 -right-5 w-60 h-60">
    <Image
      src="/intro-wizzard.svg"
      alt="Safe & Private"
      width={220}
      height={220}
      className="object-contain object-right-bottom"
    />
  </div>

  <div className="relative z-10">
    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
      <Lock size={22} />
    </div>
    <h4 className="text-base font-bold font-syne mb-2">
      Safe &amp; Private
    </h4>
    <p className="text-xs text-purple-100 leading-relaxed">
      No email or phone number needed for the child&apos;s account.
      Everything is managed through your parent portal.
    </p>
  </div>
</div>
      </div>
    </div>
  );
}
