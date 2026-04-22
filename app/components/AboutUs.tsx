"use client";

import { FC } from "react";
import Image from "next/image";
import { BookOpen, Brain, Sparkles, Star, BarChart3, CheckCircle2, FileText, PieChart, Users } from "lucide-react";
import BgBlur from "./BgBlur";


const AboutUs: FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden font-poppins"
    >
      {/* Subtle background blur to match design */}
      <div className="absolute top-2 left-1 opacity-40">
        <BgBlur className="w-full h-full min-w-[320px] sm:min-w-[800px] lg:min-w-[1600px] max-w-none object-contain" />
      </div>

      <div className="relative max-w-full mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="relative text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#1A0533] font-syne leading-[1.1] max-w-4xl mx-auto tracking-tight">
            Reimagine How <br className="hidden sm:block" />
            <span className="text-[#7C3AED]">Children Learn</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-[13px] sm:text-[14px] md:text-[16px] text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
            Spell Wizards was born from a simple but important belief: learning should be engaging,
            structured, and aligned with how children naturally grow.
          </p>
        </div>

        {/* Hero Stats Card */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-18">
          <div className="bg-white rounded-[12px] md:rounded-[16px] shadow-2xl p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 items-center">
              {/* Stat 1 */}
              <div className="text-center sm:border-r border-gray-300 px-4">
                <p className="text-[28px] sm:text-[32px] md:text-[42px] font-bold text-[#7C3AED] font-syne">50K+</p>
                <p className="text-gray-400 text-[12px] sm:text-[13px] md:text-[14px] mt-1 font-medium">Active Students</p>
              </div>
              {/* Stat 2 */}
              <div className="text-center sm:border-r border-gray-300 px-4">
                <p className="text-[28px] sm:text-[32px] md:text-[42px] font-bold text-[#7C3AED] font-syne">4.9★</p>
                <p className="text-gray-400 text-[12px] sm:text-[13px] md:text-[14px] mt-1 font-medium">Ratings</p>
              </div>
              {/* Stat 3 */}
              <div className="text-center px-4">
                <p className="text-[28px] sm:text-[32px] md:text-[42px] font-bold text-[#7C3AED] font-syne">2M+</p>
                <p className="text-gray-400 text-[12px] sm:text-[13px] md:text-[14px] mt-1 font-medium">Words Mastered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Built by Parents Section */}
        <div className="relative mt-10 md:mt-20">
          {/* Background Vector */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-50 z-0">
            <Image
              src="/AboutUsVector.svg"
              alt="Decorative Vector"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] aspect-[4/3] md:aspect-square mx-auto lg:mx-0">
                <Image
                  src="/AboutUsImage.svg"
                  alt="Spell Wizards Creator"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="text-left">
              <span className="inline-block bg-[#F3E8FF] text-[#7C3AED] text-[11px] sm:text-[12px] md:text-[13px] font-bold px-4 py-1.5 rounded-full mb-4 sm:mb-6">
                How we started
              </span>
              <h3 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A0533] font-syne leading-[1.15] mb-4 sm:mb-6">
                Built by <span className="text-[#7C3AED]">Parents</span>, for Parents
              </h3>
              <div className="space-y-4 sm:space-y-6 text-gray-500 text-[13px] sm:text-[14px] md:text-[16px] leading-relaxed">
                <p>
                  As parents, we saw the gap firsthand — tools were either overly
                  rigid or designed purely for entertainment, with limited focus on
                  real progress.
                </p>
                <p>
                  We set out to build something more balanced: a platform where
                  consistent practice leads to measurable learning, and
                  engagement supports long-term development — not just screen
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Inspiration Section */}
        <div className="relative py-6 md:py-12 bg-[#FAF8FF] -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 px-4 sm:px-6 md:px-8 lg:px-12 mt-10 md:mt-0">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-block bg-[#F3E8FF] text-[#7C3AED] text-[11px] sm:text-[12px] md:text-[13px] font-bold px-4 py-1.5 rounded-full mb-4 sm:mb-6 uppercase tracking-wider">
                Our Inspiration
              </span>
              <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A0533] font-syne leading-[1.15] mb-6 sm:mb-8">
                Inspired by <span className="text-[#7C3AED]">Indian Learning Tradition.</span>
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-500 text-[13px] sm:text-[14px] md:text-[16px] leading-relaxed">
                <p>
                  India has a rich tradition of learning that goes beyond
                  memorisation — one that values practice, reflection, and gradual
                  mastery over time.
                </p>
                <p>
                  We complement these timeless ideas with modern design and
                  technology, creating a learning experience that is both relevant
                  and effective for today's learners.
                </p>
              </div>
            </div>

            {/* Right: Cards Stack */}
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  title: "Consistent Practice",
                  desc: "Regular, structured repetition that builds lasting knowledge rather than cramming.",
                },
                {
                  icon: <Brain className="w-5 h-5" />,
                  title: "Reflection & Understanding",
                  desc: "Going beyond rote learning to develop genuine comprehension and application.",
                },
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  title: "Gradual Mastery",
                  desc: "Progressive skill development that feels natural and builds confidence over time.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] p-4 sm:p-6 flex gap-4 sm:gap-5 border border-purple-100/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-x-1"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] md:text-[18px] font-bold text-[#1A0533] font-syne mb-1 sm:mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parents First Design Section */}
        <div className="relative py-10 sm:py-12 md:py-18 bg-white">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
              {/* Left Block */}
              <div className="xl:col-span-7">
                <span className="inline-block bg-[#F3E8FF] text-[#7C3AED] text-[11px] sm:text-[12px] md:text-[13px] font-bold px-4 py-1.5 rounded-full mb-4 sm:mb-6">
                  Parents First Design
                </span>
                <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A0533] font-syne leading-[1.15] mb-4 sm:mb-6">
                  Designed for <span className="text-[#7C3AED]">Visibility & Guidance</span>
                </h2>
                <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[16px] leading-relaxed mb-6 sm:mb-8">
                  We believe parents should play an active, informed role in their child's learning journey.
                </p>

                <div className="space-y-3 sm:space-y-4 max-w-xl">
                  {[
                    { icon: <BookOpen className="w-4 h-4" />, text: "Add words from homework, books, or topics you're exploring together for personalized learning." },
                    { icon: <BarChart3 className="w-4 h-4" />, text: "Track progress across different skill areas with clear visual dashboards" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Identify where a child is improving and where additional support is needed" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-[16px] border border-gray-100 bg-white hover:border-purple-200 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <p className="text-gray-500 text-[12px] sm:text-[13px] md:text-[14px]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Block */}
              <div className="xl:col-span-5 space-y-8 sm:space-y-12">
                {/* Premium AI Card */}
                <div className="relative rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] p-6 sm:p-8 md:p-10 text-white overflow-hidden shadow-2xl shadow-purple-500/20">
                  <div className="absolute right-[20%] bottom-[10%] w-108 h-108 opacity-50 pointer-events-none">
                    <Image src="/AboutUsImage.svg" alt="wizard" fill className="object-contain object-right-bottom" />
                  </div>
                  <h4 className="text-[18px] sm:text-[20px] md:text-[24px] font-bold font-syne mb-3 sm:mb-4 z-10 text-center">AI-Powered Insights</h4>
                  <p className="text-white/80 text-[13px] sm:text-[14px] md:text-[15px] text-center leading-relaxed relative z-10">
                    Surface improvement areas, interpret learning patterns, and receive simple, actionable recommendations — all in one place, designed for parents, not data scientists.
                  </p>
                </div>

                {/* Coming Soon Teaser */}
                <div className="text-center">
                  <span className="inline-block bg-[#F3E8FF] text-[#7C3AED] text-[12px] font-bold px-4 py-1 rounded-full mb-4 sm:mb-6">
                    Coming Soon
                  </span>
                  <h3 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold text-[#1A0533] font-syne mb-3 sm:mb-4 leading-tight">
                    An <span className="text-[#7C3AED]">Intelligent Assistant</span> Layer
                  </h3>
                  <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto">
                    Beyond dashboards, we are building an intelligent assistant layer — an AI-powered guide that helps parents interpret progress and recommend next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thoughtful Design Section */}
        <div className="relative py-6 md:py-10 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 text-center">
            <span className="inline-block bg-[#F3E8FF] text-[#7C3AED] text-[11px] sm:text-[12px] md:text-[13px] font-bold px-4 py-1.5 rounded-full mb-4 sm:mb-6">
              What we bring together
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A0533] font-syne leading-[1.1] mb-4 sm:mb-6 max-w-4xl mx-auto tracking-tight">
              Where Learning Meets <span className="text-[#7C3AED]">Thoughtful Design</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-[13px] sm:text-[14px] md:text-[16px] text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-10">
              The focus is not just on making learning engaging, but on making it effective, consistent, and transparent.
            </p>

            <div className="max-w-3xl mx-auto mb-10">
              <div className="bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[48px] shadow-[0_30px_70px_rgba(0,0,0,0.08)] border border-gray-50 p-3 sm:p-4 md:p-6">
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[18px] sm:rounded-[24px]">
                  <Image
                    src="/features/GameBased.svg"
                    alt="Game-Based Engagement"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="max-w-xl mx-auto mt-4 sm:mt-6">
                  <h4 className="text-[18px] sm:text-[20px] md:text-[24px] font-bold text-[#1A0533] font-syne mb-2 sm:mb-3">Game-Based Engagement</h4>
                  <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed">
                    Sustain interest and motivation through carefully designed play that never sacrifices learning outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Roadmap Section */}
        <div className="relative py-10 md:py-16 bg-[#FAF8FF] -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
          <div className="max-w-[1200px] mx-auto text-center">
            <span className="inline-block bg-[#F3E8FF] text-[#7C3AED] text-[11px] sm:text-[12px] md:text-[13px] font-bold px-4 py-1.5 rounded-full mb-4 sm:mb-6 uppercase tracking-wider">
              Our Roadmap
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A0533] font-syne leading-[1.15] mb-2">
              Focused Today. <span className="text-[#7C3AED]">Expanding Tomorrow.</span>
            </h2>
            <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[16px] leading-relaxed max-w-2xl mx-auto mb-6 md:mb-8 px-2">
              We are starting with spelling, reading, and foundational language skills — areas that shape early academic development. Over time, we aim to expand into broader areas of learning.
            </p>

            {/* Timeline Visual */}
            <div className="relative max-w-4xl mx-auto py-6 px-4">
              {/* Horizontal Line */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent -translate-y-1/2" />
              <div className="relative flex justify-between items-center px-2 sm:px-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative group">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-2 border-[#7C3AED] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#7C3AED]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 z-0">
            <BgBlur className="w-full h-full min-w-[320px] sm:min-w-[800px] lg:min-w-[1200px] max-w-none object-cover" />
          </div>

          <div className="relative max-w-[1200px] mx-auto text-center z-10">
            <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A0533] font-syne leading-[1.15] mb-4 sm:mb-6">
              Our Commitment to You
            </h2>
            <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[16px] leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-16 px-2">
              We are building Spell Wizards with a long-term perspective — real learning outcomes, thoughtful product design, and tools that support both children and parents
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <FileText className="w-6 h-6" />,
                  title: "Real Learning Outcomes",
                  desc: "Over superficial engagement — every feature is designed to drive genuine progress.",
                },
                {
                  icon: <PieChart className="w-6 h-6" />,
                  title: "Thoughtful Product Design",
                  desc: "Over short-term trends — we build for longevity and lasting educational value.",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Family-Centered Tools",
                  desc: "That support both children and parents in their learning journey together.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 border border-purple-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(124,58,237,0.1)] transition-all duration-500 flex flex-col items-center group cursor-default"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h4 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#1A0533] font-syne mb-3 sm:mb-4">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;