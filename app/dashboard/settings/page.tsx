"use client";

import React, { useState } from "react";
import { User, Lock, Sliders, Bell, Save, ShieldCheck, Zap, Mail, Trophy, ChevronRight, AlertTriangle, Trash2, Power, LockOpen, ArrowLeft, ChevronDown, UserCircle } from "lucide-react";
import { useParentProfile, useUpdateParentProfile } from "@/hooks/use-parent-profile";
import { useChildren, useUpdateChild } from "@/hooks/use-child";
import { useAvatars } from "@/hooks/use-avatar";
import Link from "next/link";
import Image from "next/image";
import UserAvatar from "@/app/components/UserAvatar";

export default function SettingsPage() {
  const { data: profile, isLoading } = useParentProfile();
  const { data: children } = useChildren();
  const { data: avatars } = useAvatars();
  const updateParentMutation = useUpdateParentProfile();
  const updateChildMutation = useUpdateChild();

  const [activeTab, setActiveTab] = useState("profile");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const [childForm, setChildForm] = useState({
    name: "",
    username: "",
    level: "Beginner Level (Age 6-8)",
    newPassword: "",
    confirmPassword: "",
    avatarUrl: "",
  });

  React.useEffect(() => {
    if (selectedChildId && children) {
      const child = children.find(c => c.child_id === selectedChildId);
      if (child) {
        setChildForm({
          name: child.name || "",
          username: `${child.name.toLowerCase().replace(" ", "_")}_wizard`,
          level: child.current_spelling_level || "Beginner Level (Age 6-8)",
          newPassword: "",
          confirmPassword: "",
          avatarUrl: child.avatar_url || "",
        });
      }
    }
  }, [selectedChildId, children]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    if (profile) {
      setProfileForm({
        firstName: profile.parent_name?.split(" ")[0] || "",
        lastName: profile.parent_name?.split(" ").slice(1).join(" ") || "",
        phone: "+99 987651243",
        gender: "Female",
      });
    }
  }, [profile]);

  // When changing tabs, clear child selection
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedChildId(null);
  };

  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: UserCircle },
    { id: "security", label: "Security Options", icon: LockOpen },
    { id: "manage", label: "Manage Child Profile", icon: Sliders },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-4 animate-fade-in">
            {/* Profile Header */}
            <div className="flex items-center justify-between px-4 py-2 mb-4 border-b-3 border-gray-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D8B4FE] flex items-center justify-center text-white text-2xl font-black shadow-inner">
                  {profile?.parent_name ? profile.parent_name[0].toUpperCase() : "M"}
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#14062B]">
                    {isLoading ? "Loading..." : profile?.parent_name || "Meena Kumar"}
                  </h4>
                  <p className="text-sm text-[#8E78B3] font-medium">
                    {profile?.email || "meena.kumar@email.com"}
                  </p>
                </div>
              </div>
              {isEditingProfile ? (
                <button
                  onClick={() => {
                    updateParentMutation.mutate({
                      parent_name: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
                      phone_number: profileForm.phone,
                      gender: profileForm.gender,
                    });
                    setIsEditingProfile(false);
                  }}
                  className="bg-green-500 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-all shadow-sm active:scale-95"
                >
                  {updateParentMutation.isPending ? "Saving..." : "Save Profile"}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-dashboard-purple text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#6D28D9] transition-all shadow-sm active:scale-95"
                >
                  Edit
                </button>
              )}
            </div>

            {/* Personal Details Section */}
            <section>
              <h3 className="text-lg font-bold text-[#14062B] font-syne mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#8E78B3] ml-1">First Name</label>
                  {isEditingProfile ? (
                    <input
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm(p => ({ ...p, firstName: e.target.value }))}
                      className="w-full bg-white border border-purple-100/50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all shadow-sm"
                    />
                  ) : (
                    <div className="bg-[#F9F7FD] border border-purple-100/30 rounded-2xl px-6 py-4 text-sm font-bold text-[#14062B]">
                      {profileForm.firstName || "Meena"}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#8E78B3] ml-1">Last Name</label>
                  {isEditingProfile ? (
                    <input
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm(p => ({ ...p, lastName: e.target.value }))}
                      className="w-full bg-white border border-purple-100/50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all shadow-sm"
                    />
                  ) : (
                    <div className="bg-[#F9F7FD] border border-purple-100/30 rounded-2xl px-6 py-4 text-sm font-bold text-[#14062B]">
                      {profileForm.lastName || "Kumar"}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#8E78B3] ml-1">Email</label>
                  <div className="bg-[#F9F7FD] border border-purple-100/30 rounded-2xl px-6 py-4 text-sm font-bold text-gray-400">
                    {profile?.email || "meena.kumar@email.com"}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#8E78B3] ml-1">Phone</label>
                  {isEditingProfile ? (
                    <input
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-white border border-purple-100/50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all shadow-sm"
                    />
                  ) : (
                    <div className="bg-[#F9F7FD] border border-purple-100/30 rounded-2xl px-6 py-4 text-sm font-bold text-[#14062B]">
                      {profileForm.phone}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#8E78B3] ml-1">Gender</label>
                  {isEditingProfile ? (
                    <div className="relative">
                      <select
                        value={profileForm.gender}
                        onChange={(e) => setProfileForm(p => ({ ...p, gender: e.target.value }))}
                        className="w-full bg-white border border-purple-100/50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all shadow-sm appearance-none"
                      >
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  ) : (
                    <div className="bg-[#F9F7FD] border border-purple-100/30 rounded-2xl px-6 py-4 text-sm font-bold text-[#14062B]">
                      {profileForm.gender}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Address Section */}
            <section className="pt-4 border-t border-gray-50">
              <h3 className="text-lg font-bold text-[#14062B] font-syne mb-6">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#8E78B3] ml-1">Country</label>
                  <div className="bg-[#F9F7FD] border border-purple-100/30 rounded-2xl px-6 py-4 text-sm font-bold text-gray-400">
                    India
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#8E78B3] ml-1">City</label>
                  <div className="bg-[#F9F7FD] border border-purple-100/30 rounded-2xl px-6 py-4 text-sm font-bold text-gray-400">
                    India
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case "security":
        return (
          <div className="animate-fade-in relative min-h-[500px] flex flex-col">
            {/* Background Wizard Image */}
            <div className="absolute bottom-[0%] right-[0%] w-[800px] h-[800px]  pointer-events-none z-0">
              <Image
                src="/security.svg"
                alt="Wizard Illustration"
                fill
                className="object-contain object-right-bottom"
              />
            </div>

            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#14062B] font-syne mb-1">Security Details</h3>
                <p className="text-base text-[#8E78B3]">Manage your account access and safety controls.</p>
              </div>

              {/* Change Password Card */}
              <div className="bg-[#F1EFFF] rounded-[2rem] p-4 max-w-sm shadow-sm border border-purple-100/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl  flex text-purple items-center justify-center ">
                    <LockOpen size={30} fill="none" color="#5c3998" />
                  </div>
                  <h4 className="text-xl font-bold text-dashboard-purple font-syne">Change Password</h4>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#8E78B3] ml-1 ">Current Password *</label>
                    <input
                      type="password"
                      value={securityForm.currentPassword}
                      onChange={(e) => setSecurityForm(s => ({ ...s, currentPassword: e.target.value }))}
                      className="w-full bg-white rounded-2xl px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#8E78B3] ml-1">New Password</label>
                    <input
                      type="password"
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm(s => ({ ...s, newPassword: e.target.value }))}
                      className="w-full bg-white rounded-2xl px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#8E78B3] ml-1">Confirm Password *</label>
                    <input
                      type="password"
                      value={securityForm.confirmPassword}
                      onChange={(e) => setSecurityForm(s => ({ ...s, confirmPassword: e.target.value }))}
                      className="w-full bg-white rounded-2xl px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all shadow-sm"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => {
                        if (securityForm.newPassword !== securityForm.confirmPassword) {
                          alert("Passwords do not match");
                          return;
                        }
                        updateParentMutation.mutate({
                          current_password: securityForm.currentPassword,
                          new_password: securityForm.newPassword,
                        });
                        setSecurityForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      }}
                      disabled={updateParentMutation.isPending}
                      className="bg-dashboard-purple text-white px-8 py-3.5 rounded-2xl font-semibold text-lg hover:bg-[#6D28D9] transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                      {updateParentMutation.isPending ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-[1.2rem] p-4 border border-red-100 shadow-sm max-w-lg">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="text-red-500" size={24} />
                  <h4 className="text-xl font-bold text-red-500 font-syne">Danger Zone</h4>
                </div>
                <p className="text-sm text-[#8E78B3] mb-8 font-medium">
                  These actions are permanent and cannot be undone. Please be certain.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-3 rounded-2xl border-2 border-red-500 text-red-500 font-bold hover:bg-red-50 transition-all active:scale-95 flex items-center gap-2">
                    Deactivate Account
                  </button>
                  <button className="px-4 py-3 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-md active:scale-95 flex items-center gap-2">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "manage":
        if (selectedChildId) {
          const child = children?.find(c => c.child_id === selectedChildId);
          if (!child) return null;

          return (
            <div className="animate-fade-in space-y-8 max-w-3xl pb-10">
              {/* Back button */}
              <button
                onClick={() => setSelectedChildId(null)}
                className="flex items-center gap-2 text-dashboard-purple font-bold hover:underline mb-2"
              >
                <ArrowLeft size={18} />
                Back to child list
              </button>

              {/* Profile Header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative w-24 h-24 group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D8B4FE] to-[#8B5CF6] rounded-full shadow-md" />
                  <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    {childForm.avatarUrl ? (
                      <Image src={childForm.avatarUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#FFB820] flex items-center justify-center text-white text-3xl font-black font-syne">
                        {child.name[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#14062B] font-syne mb-1">{childForm.name || child.name}</h3>
                  <p className="text-sm font-bold text-dashboard-purple">
                    @{childForm.username}
                  </p>
                </div>
              </div>

              {/* Avatar Selection */}
              {avatars && avatars.length > 0 && (
                <div className="space-y-3 mt-4 mb-8 bg-purple-50/50 p-4 rounded-[1.2rem]">
                  <label className="text-sm font-semibold text-[#8E78B3] ml-1">Choose Avatar</label>
                  <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => setChildForm(s => ({ ...s, avatarUrl: avatar.image_url }))}
                        className={`relative w-16 h-16 rounded-full shrink-0 border-4 transition-all ${childForm.avatarUrl === avatar.image_url ? "border-dashboard-purple scale-110" : "border-transparent hover:border-purple-200"
                          }`}
                      >
                        <Image src={avatar.image_url} alt={avatar.name} fill className="object-cover rounded-full" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Forms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#8E78B3] ml-1">Display Name</label>
                  <input
                    type="text"
                    value={childForm.name}
                    onChange={(e) => setChildForm(s => ({ ...s, name: e.target.value }))}
                    className="w-full bg-white border border-[#D8D4FF] rounded-[1.2rem] px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-dashboard-purple/10 focus:border-dashboard-purple transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#8E78B3] ml-1">Username (Login ID)</label>
                  <input
                    type="text"
                    value={childForm.username}
                    onChange={(e) => setChildForm(s => ({ ...s, username: e.target.value }))}
                    className="w-full bg-white border border-[#D8D4FF] rounded-[1.2rem] px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-dashboard-purple/10 focus:border-dashboard-purple transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 max-w-sm mt-6">
                <label className="text-sm font-semibold text-[#8E78B3] ml-1">Learning Level</label>
                <div className="relative">
                  <select
                    value={childForm.level}
                    onChange={(e) => setChildForm(s => ({ ...s, level: e.target.value }))}
                    className="w-full bg-white border border-[#D8D4FF] rounded-[1.2rem] px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-dashboard-purple/10 focus:border-dashboard-purple transition-all shadow-sm appearance-none"
                  >
                    <option>Beginner Level (Age 6-8)</option>
                    <option>Intermediate Level (Age 9-11)</option>
                    <option>Advanced Level (Age 12+)</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#14062B]">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-[#F1EFFF] rounded-[1.5rem] p-8 shadow-sm border border-purple-100/30 mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-dashboard-purple">
                    <Lock size={24} fill="currentColor" className="text-dashboard-purple" />
                  </div>
                  <h4 className="text-xl font-bold text-dashboard-purple font-syne">Change Password</h4>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#8E78B3] ml-1">New Password</label>
                    <input
                      type="password"
                      value={childForm.newPassword}
                      onChange={(e) => setChildForm(s => ({ ...s, newPassword: e.target.value }))}
                      className="w-full bg-white rounded-[1.2rem] px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-dashboard-purple/10 focus:border-dashboard-purple transition-all shadow-sm border border-purple-100/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#8E78B3] ml-1">Confirm Password *</label>
                    <input
                      type="password"
                      value={childForm.confirmPassword}
                      onChange={(e) => setChildForm(s => ({ ...s, confirmPassword: e.target.value }))}
                      className="w-full bg-white rounded-[1.2rem] px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-dashboard-purple/10 focus:border-dashboard-purple transition-all shadow-sm border border-purple-100/50"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={() => {
                    if (childForm.newPassword && childForm.newPassword !== childForm.confirmPassword) {
                      alert("Passwords do not match");
                      return;
                    }
                    updateChildMutation.mutate({
                      childId: selectedChildId,
                      data: {
                        name: childForm.name,
                        email: childForm.username, // using email as username payload per api mapping
                        current_spelling_level: childForm.level,
                        avatar_url: childForm.avatarUrl,
                        ...(childForm.newPassword ? { password: childForm.newPassword } : {})
                      }
                    });
                  }}
                  disabled={updateChildMutation.isPending}
                  className="flex-1 w-full bg-dashboard-purple text-white py-4 rounded-[1.2rem] font-bold text-lg hover:bg-[#6D28D9] transition-all shadow-lg shadow-purple-200 active:scale-[0.98] disabled:opacity-50"
                >
                  {updateChildMutation.isPending ? "Saving..." : "Save Profile"}
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-[1.2rem] border-2 border-red-400 text-red-500 font-bold hover:bg-red-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  <Trash2 size={18} />
                  Delete child Profile
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6 animate-fade-in">

            {/* Heading */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#14062B] font-syne">
                  Child Profiles
                </h2>
                <p className="text-gray-500 text-lg mt-1">
                  Manage profiles for each of your little wizards.
                </p>
              </div>

              <button className="bg-[#7B61FF] text-white px-4 py-2 rounded-xl  text-lg shadow-md hover:opacity-90 transition">
                + Add Child
              </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {children?.map((child) => (
                <div
                  key={child.child_id}
                  className="bg-white border-2 border-[#D8D4FF] rounded-[2rem] p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl"
                >
                  <UserAvatar
                    name={child.name}
                    avatarUrl={child.avatar_url?.startsWith("#") ? undefined : child.avatar_url}
                    fallbackColor={child.avatar_url?.startsWith("#") ? child.avatar_url : "#FFB820"}
                    className="w-16 h-16 text-3xl text-white font-black font-syne mb-6"
                  />

                  <h4 className="text-lg md:text-xl font-black text-[#14062B]  font-syne">
                    {child.name}
                  </h4>

                  <p className="text-lg md:text-xl font-semibold text-[#7B61FF] mb-2">
                    @{child.name.toLowerCase().replace(" ", "_")}
                  </p>

                  <button
                    onClick={() => setSelectedChildId(child.child_id)}
                    className="w-full bg-[#EFEEFF] text-[#7C3AED] py-3 rounded-[1rem] text-lg hover:bg-[#7B61FF] hover:text-white"
                  >
                    Manage Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "notifications":
        const notificationItems = [
          { id: "1", title: "Email Notifications", desc: `Receive summaries to ${profile?.email || "meena.kumar@email.com"}`, icon: Mail },
          { id: "2", title: "Push Notifications", desc: "Real-time alerts on your devices", icon: Bell },
          { id: "3", title: "Learning Progress", desc: "Get updates when children complete lessons or milestones.", icon: Trophy },
          { id: "4", title: "Security Alerts", desc: "Get notified about password changes or new logins.", icon: ShieldCheck },
          { id: "5", title: "Daily Activity Summary", desc: "A consolidated view of the day's performance.", icon: Zap },
        ];

        return (
          <div className="space-y-4 animate-fade-in h-full flex flex-col">
            <div className="bg-white rounded-[2rem] flex-1 flex flex-col">
              <div>
                <h3 className="text-2xl font-black text-[#14062B] font-syne mb-1">Notification Settings</h3>
                <p className="text-base text-[#8E78B3] mb-4">Choose how you want to be notified about activity.</p>
                <div className="h-px bg-gray-200 w-full mb-4" />
              </div>

              <div className="space-y-4 flex-1">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-[1.2rem] border-2 border-gray-100 hover:border-dashboard-purple/20 transition-all group">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-[#14062B]">{item.title}</h4>
                      <p className="text-sm text-[#8E78B3]">{item.desc}</p>
                    </div>
                    <button className="w-16 h-8 bg-dashboard-purple rounded-full relative px-1 flex items-center transition-all shadow-inner">
                      <div className="w-6 h-6 bg-white rounded-full translate-x-8 shadow-md" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-10">
                <button className="bg-dashboard-purple text-white px-6 py-3 rounded-[1.2rem]  text-lg hover:bg-[#6D28D9] transition-all shadow-lg active:scale-95">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-100px)] animate-fade-in pb-4">
      {/* Settings Sidebar */}
      <div className="w-full lg:w-[300px] flex shrink-0">
        <div className="bg-white rounded-[1.2rem] border border-dashboard-border p-4 shadow-sm w-full flex flex-col h-full">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-[#14062B] font-syne tracking-tight">Account Settings</h3>
            <p className="text-sm text-[#8E78B3] mt-2 font-medium">You can find all the settings here</p>
          </div>

          <nav className="space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-base ${activeTab === item.id
                  ? "bg-[#F3E8FF] text-dashboard-purple shadow-md shadow-purple-100/50"
                  : "text-[#8E78B3] hover:bg-gray-50 hover:text-[#14062B]"
                  }`}
              >
                <item.icon size={20} className={activeTab === item.id ? "text-dashboard-purple " : "text-[#8E78B3]"} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <div className="bg-white rounded-[1.2rem] border border-dashboard-border p-4 shadow-sm flex-1 overflow-y-auto custom-scrollbar relative">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
