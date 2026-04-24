import React from "react";
import Image from "next/image";

interface UserAvatarProps {
  name?: string;
  avatarUrl?: string | null;
  fallbackColor?: string;
  className?: string;
}

export default function UserAvatar({
  name = "",
  avatarUrl,
  fallbackColor = "#D8B4FE", // Default purple fallback
  className = "w-10 h-10 text-base", // Default size
}: UserAvatarProps) {
  // Helper to get initials
  const getInitials = (userName: string) => {
    if (!userName) return "U"; // Default initial
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Determine if avatarUrl is a valid image URL or just a hex color
  // Some parts of the codebase might pass a hex color as avatarUrl
  // NOTE: User requested to ONLY show fixed color initials for now because images are not ready.
  // const isImageUrl = avatarUrl && (avatarUrl.startsWith("http") || avatarUrl.startsWith("/") || avatarUrl.includes(".png") || avatarUrl.includes(".jpg"));

  /*
  if (isImageUrl) {
    return (
      <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`}>
        <Image
          src={avatarUrl as string}
          alt={name || "User Avatar"}
          fill
          className="object-cover"
        />
      </div>
    );
  }
  */

  // If no image (or disabled), render initials with fallback color
  // Ensure the fallback color is used
  const bgColor = avatarUrl?.startsWith("#") ? avatarUrl : fallbackColor;

  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <span>{getInitials(name)}</span>
    </div>
  );
}
