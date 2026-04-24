"use client";

import React, { useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { useRealmSubtopics } from "@/hooks/use-insights";

interface RealmCardProps {
  childId: string;
  realm: {
    id: string;
    name: string;
    description: string;
    topics: string[];
    percent: number;
    questsDone: number;
    questsTotal: number;
    status: string;
    barColor: string;
  };
}

export default function RealmProgressCard({ childId, realm }: RealmCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch subtopics only when expanded
  const { data: subtopicsData, isLoading } = useRealmSubtopics(
    isExpanded ? childId : null,
    isExpanded ? realm.id : null
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm transition-all duration-300">
      {/* Title + % */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-bold text-[#14062B]">{realm.name}</h4>
        <span className="text-base font-bold text-[#7C3AED]">
          {realm.percent}%
        </span>
      </div>

      {/* Description */}
      {realm.description && (
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          {realm.description}
        </p>
      )}

      {/* Topics as tags */}
      {realm.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {realm.topics.map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-100"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${realm.percent}%`,
            backgroundColor: realm.barColor,
          }}
        />
      </div>

      {/* Quest info */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-400 font-medium">
          {realm.questsDone} / {realm.questsTotal} XP
        </p>
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            realm.status === "completed"
              ? "bg-green-50 text-green-600"
              : realm.status === "in_progress"
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-50 text-gray-400"
          }`}
        >
          {realm.status === "not_started"
            ? "Not Started"
            : realm.status === "in_progress"
            ? "In Progress"
            : realm.status === "completed"
            ? "Completed"
            : realm.status.replace(/_/g, " ")}
        </span>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 border-dashed animate-fade-in">
          {/* Strengths / To Improve (Null values for now as requested) */}
          <div className="flex items-start gap-3 mb-3">
            <span className="px-2 py-0.5 text-[10px] font-bold text-green-700 bg-green-100 rounded-md whitespace-nowrap">
              Strengths
            </span>
            <p className="text-[11px] text-gray-500 leading-relaxed flex-1">
              --
            </p>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <span className="px-2 py-0.5 text-[10px] font-bold text-yellow-700 bg-yellow-100 rounded-md whitespace-nowrap">
              To Improve
            </span>
            <p className="text-[11px] text-gray-500 leading-relaxed flex-1">
              --
            </p>
          </div>

          <h5 className="text-sm font-bold text-[#14062B] mb-3">
            Sub-Topics Progress
          </h5>

          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-50 rounded-xl" />
              ))}
            </div>
          ) : subtopicsData?.subtopics && subtopicsData.subtopics.length > 0 ? (
            <div className="space-y-3">
              {subtopicsData.subtopics.map((st) => {
                const isMastered =
                  st.masteryStatus?.toLowerCase() === "mastered";
                return (
                  <div
                    key={st.subtopicId}
                    className={`p-4 rounded-xl border-2 ${
                      isMastered ? "border-[#84CC16]" : "border-gray-200"
                    } bg-white`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {isMastered ? (
                        <CheckCircle
                          size={18}
                          className="text-[#84CC16] fill-[#84CC16]/20"
                        />
                      ) : (
                        <Star
                          size={18}
                          className="text-gray-400 fill-gray-100"
                        />
                      )}
                      <h6 className="text-[13px] font-bold text-[#14062B] flex-1">
                        {st.name}
                      </h6>
                      <div className="text-[11px] font-bold text-[#7C3AED]">
                        {st.questsCompleted}{" "}
                        <span className="text-gray-400 font-medium">
                          / {st.questsTotal}
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full ${
                          isMastered ? "bg-[#84CC16]" : "bg-[#3D85FD]"
                        }`}
                        style={{ width: `${st.percentProgress}%` }}
                      />
                    </div>

                    <div className="text-right mb-3">
                      <span
                        className={`text-[10px] font-bold ${
                          isMastered ? "text-[#84CC16]" : "text-gray-400"
                        }`}
                      >
                        {st.masteryStatus || "In Progress"}
                      </span>
                    </div>

                    <button className="w-full py-2 border border-[#E5E7EB] text-[#7C3AED] font-semibold text-[11px] rounded-lg hover:bg-purple-50 transition-colors">
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">
              No sub-topics available.
            </p>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[11px] font-bold text-[#14062B] hover:text-[#7C3AED] transition-colors mt-3"
      >
        {isExpanded ? "View Less" : "View Topic breakdown"}
      </button>
    </div>
  );
}
