"use client";

import React from "react";
import LearnerCard from "./LearnerCard";
import { useChildStats } from "@/hooks/use-child";
import { useChildInsights } from "@/hooks/use-insights";
import { ChildProfileResponse } from "@/services/child.service";

export default function LearnerCardWithData({
  child,
  idx,
}: {
  child: ChildProfileResponse;
  idx: number;
}) {
  const { data: stats } = useChildStats(child.child_id);
  const { data: insights } = useChildInsights(child.child_id);

  // Calculate Accuracy from insights (Personality Traits panel)
  const accuracyAttr = insights?.attributes?.find(
    (a) => a.name === "Accuracy"
  );
  const accuracy =
    accuracyAttr && accuracyAttr.maxScore > 0
      ? Math.round((accuracyAttr.score / accuracyAttr.maxScore) * 100)
      : 0; // Show 0 when no data

  // Calculate Quest Percent from realmProgress
  const totalQuests =
    insights?.realmProgress?.reduce((acc, curr) => acc + curr.questsTotal, 0) ||
    0;
  const completedQuests =
    insights?.realmProgress?.reduce(
      (acc, curr) => acc + curr.questsCompleted,
      0
    ) || 0;
  const questPercent =
    totalQuests > 0
      ? Math.round((completedQuests / totalQuests) * 100)
      : 0; // Show 0 instead of dummy data

  // For weekly practice, convert total_weekly_practice_minutes to hours
  const weeklyPractice = stats?.total_weekly_practice_minutes 
    ? (stats.total_weekly_practice_minutes / 60).toFixed(1)
    : 0;

  return (
    <LearnerCard
      name={child.name}
      grade={child.class_name}
      age={child.age}
      level={child.current_level}
      accuracy={accuracy}
      weeklyPractice={weeklyPractice}
      questPercent={questPercent}
      lastActive={idx === 0 ? "Yesterday, 4:30 PM" : "Today, 9:15 AM"}
      avatarColor={
        child.avatar_url?.startsWith("#")
          ? child.avatar_url
          : idx === 0
          ? "#F97316"
          : "#8B5CF6"
      }
      avatarUrl={!child.avatar_url?.startsWith("#") ? child.avatar_url : undefined}
    />
  );
}
