"use client";

import React, { useState } from "react";
import Drawer from "./Drawer";
import { ArrowLeft, MoreHorizontal, Send, Sparkles } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm Wiz Bot. How can I help you today?",
    sender: "bot",
    time: "10:30 AM",
  },
];

interface AskWizDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskWizDrawer({ isOpen, onClose }: AskWizDrawerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing your request. One moment please!",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Ask Wiz">
      <div className="flex flex-col h-full bg-[#FCFAFF]">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-dashboard-border flex items-center justify-between sticky top-0 z-10 transition-shadow duration-200">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-dashboard-text-muted"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2 bg-[#F3E8FF] px-4 py-1.5 rounded-full border border-dashboard-purple/20 shadow-sm cursor-pointer hover:bg-[#EDE9FE] transition-colors">
            <span className="text-sm font-bold text-dashboard-purple tracking-tight">Get Wiz+</span>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-dashboard-text-muted">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-hide bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-dashboard-purple flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                    <Sparkles size={14} />
                  </div>
                )}
                <span className="text-[10px] font-bold text-dashboard-text-muted uppercase tracking-widest px-1">
                  {msg.sender === "bot" ? "Wiz Bot" : "You"}
                </span>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm" />
                )}
              </div>
              
              <div 
                className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed transition-all duration-300 transform hover:scale-[1.01] ${
                  msg.sender === "user" 
                    ? "bg-dashboard-purple text-white rounded-tr-none" 
                    : "bg-white text-[#14062B] border border-dashboard-border rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-2 px-1 tabular-nums">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-dashboard-border shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
          <div className="relative group">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="w-full bg-gray-50 border border-dashboard-border rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all placeholder:text-gray-400 shadow-inner group-hover:bg-gray-100/50"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-dashboard-purple text-white rounded-xl flex items-center justify-center hover:bg-[#6D28D9] transition-all shadow-md active:scale-95 group-hover:scale-105"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-dashboard-text-muted mt-3 font-medium opacity-60">
            Powered by SpellWizards AI
          </p>
        </div>
      </div>
    </Drawer>
  );
}
