"use client";

import React, { useState } from "react";
import Drawer from "./Drawer";
import { ArrowLeft, ChevronDown, MoreHorizontal, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import { useChildren } from "@/hooks/use-child";
import { useChatbot } from "@/hooks/use-chatbot";
import toast from "react-hot-toast";

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
  const { data: children } = useChildren();
  const { mutate: sendMessage, isPending } = useChatbot();
  
  const [selectedChildId, setSelectedChildId] = useState<string>("general");
  const [messagesByContext, setMessagesByContext] = useState<Record<string, Message[]>>({});
  const [inputText, setInputText] = useState("");

  const currentMessages = messagesByContext[selectedChildId] || initialMessages;

  // Set default child if children are loaded
  React.useEffect(() => {
    if (children && children.length > 0 && !selectedChildId) {
      setSelectedChildId("general");
    }
  }, [children, selectedChildId]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    if (!selectedChildId) {
      toast.error("Please select a chat mode");
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessagesByContext(prev => ({
      ...prev,
      [selectedChildId]: [...(prev[selectedChildId] || initialMessages), userMessage]
    }));
    setInputText("");
    
    sendMessage({
      childId: selectedChildId === "general" ? null : selectedChildId,
      data: { parent_input: inputText }
    }, {
      onSuccess: (data) => {
        const botResponse: Message = {
          id: Date.now().toString(),
          text: data.generated_response,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessagesByContext(prev => ({
          ...prev,
          [selectedChildId]: [...(prev[selectedChildId] || initialMessages), botResponse]
        }));
      },
      onError: (error) => {
        console.error("Chat error:", error);
        toast.error("Failed to get response from Wiz Bot");
      }
    });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Ask Wiz">
      <div className="flex flex-col h-full bg-[#FCFAFF]">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-dashboard-border flex items-center justify-between sticky top-0 z-10 transition-shadow duration-200">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-dashboard-text-muted"
            >
              <ArrowLeft size={20} />
            </button>
            
            {/* Child Selector */}
            <div className="relative group">
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value)}
                className="appearance-none bg-[#F3E8FF] border border-dashboard-purple/20 rounded-full px-4 py-1.5 pr-8 text-sm font-bold text-dashboard-purple cursor-pointer focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 transition-all hover:bg-[#EDE9FE]"
              >
                <option value="general">General Chat</option>
                {children?.map((child) => (
                  <option key={child.child_id} value={child.child_id}>
                    {child.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-dashboard-purple pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform">
            <Sparkles size={14} className="text-white" />
            <span className="text-sm font-bold text-white tracking-tight">Wiz+</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto scrollbar-hide bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent">
          {currentMessages.map((msg) => (
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
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {selectedChildId === "general" 
                        ? "P" 
                        : children?.find(c => c.child_id === selectedChildId)?.name[0] || "U"}
                    </div>
                  </div>
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

          {isPending && (
            <div className="flex flex-col items-start animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-dashboard-purple/50 flex items-center justify-center text-white shadow-lg">
                  <Sparkles size={14} />
                </div>
                <span className="text-[10px] font-bold text-dashboard-text-muted uppercase tracking-widest px-1">
                  Wiz Bot is typing...
                </span>
              </div>
              <div className="bg-white text-[#14062B] border border-dashboard-border rounded-2xl rounded-tl-none px-5 py-3.5 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-dashboard-purple/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-dashboard-purple/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-dashboard-purple/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-dashboard-border shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
          <div className="relative group">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isPending && handleSend()}
              placeholder={isPending ? "Waiting for Wiz Bot..." : "Type a message..."}
              disabled={isPending}
              className="w-full bg-gray-50 border border-dashboard-border rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-dashboard-purple/20 focus:border-dashboard-purple transition-all placeholder:text-gray-400 shadow-inner group-hover:bg-gray-100/50 disabled:opacity-50"
            />
            <button 
              onClick={handleSend}
              disabled={isPending || !inputText.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-dashboard-purple text-white rounded-xl flex items-center justify-center hover:bg-[#6D28D9] transition-all shadow-md active:scale-95 group-hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
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
