"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is Spell Wizards?",
    answer: "Spell Wizards is a game-based learning platform designed to help children think, spell, and express with clarity. We draw from India's rich learning traditions to build real-world capability in a fun, engaging way.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.5 1.5"></path>
        <path d="M14.5 3.5l1 1"></path>
      </svg>
    )
  },
  {
    question: "Who is this platform for?",
    answer: "Our platform is tailored for children who want to improve their spelling and vocabulary skills through interactive challenges, and for parents who want to actively participate and track their child's learning journey.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    question: "How does the Parents Portal work?",
    answer: "The Parents Portal provides a comprehensive dashboard where you can track your child's progress, view their strengths and areas for improvement, and get actionable insights to support their learning.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    )
  },
  {
    question: "Can we try it for free?",
    answer: "Yes! We offer a free trial period so you and your child can explore the platform, play the games, and see the benefits firsthand before committing to a subscription.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 8l-8 8"></path>
        <path d="M8 8l8 8"></path>
      </svg>
    )
  },
  {
    question: "What devices are supported?",
    answer: "Spell Wizards is accessible on any modern web browser. It is fully responsive and optimized for desktops, laptops, tablets, and mobile devices so your child can learn anywhere, anytime.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    )
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="w-full bg-white min-h-screen py-20 px-6 md:px-12 xl:px-24 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
      
      <div className="max-w-[1240px] w-full flex flex-col items-center gap-8 z-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[12px] font-bold font-syne uppercase tracking-[0.1em] mb-1">
            FAQ's
          </div>
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1A0533] font-syne tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#1A0533]/50 font-poppins text-[15px] max-w-[600px]">
            Quick answers to help you get started with Spell Wizards.
          </p>
        </div>

        <div className="w-full max-w-[900px] flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`w-full rounded-[16px] border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-white border-[#7C3AED]/30 shadow-[0_10px_30px_rgba(124,58,237,0.08)]" 
                    : "bg-[#FAFAFA] border-black/5 hover:border-[#7C3AED]/20 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-[#7C3AED] text-white" : "bg-white text-[#7C3AED] border border-black/5"
                    }`}>
                      {faq.icon}
                    </div>
                    <h3 className={`font-syne font-semibold text-[17px] md:text-[18px] transition-colors ${
                      isOpen ? "text-[#1A0533]" : "text-[#1A0533]/80"
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? "bg-[#7C3AED]/10 rotate-180" : "bg-white border border-black/5"
                  }`}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke={isOpen ? "#7C3AED" : "#1A0533"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] opacity-100 pb-5 px-5 pl-[72px]" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="font-poppins text-[#1A0533]/60 text-[14px] md:text-[15px] leading-[1.6]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact CTA */}
        <div className="w-full max-w-[900px] bg-[#7C3AED] rounded-[16px] p-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white relative overflow-hidden shadow-xl shadow-purple-500/10">
          <div className="flex flex-col gap-1 text-center md:text-left z-10">
            <h4 className="text-lg md:text-xl font-bold font-syne">Still have questions?</h4>
            <p className="text-white/80 font-poppins text-[14px]">
              Chat to our friendly team for personalized support.
            </p>
          </div>
          
          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-white text-[#7C3AED] font-bold font-syne text-[14px] rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg z-10"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
