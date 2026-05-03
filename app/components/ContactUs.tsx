"use client";

import { useState } from "react";
import BgBlur from "./BgBlur";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="w-full bg-[#FAFAFA] min-h-screen py-20 px-6 md:px-12 xl:px-24 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-20">
        <BgBlur className="w-full h-full min-w-[1400px] max-w-none object-cover" />
      </div>

      <div className="max-w-[1240px] w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 z-10 items-center">
        {/* Left: Text Info */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[12px] font-bold font-syne uppercase tracking-[0.1em]">
              Contact Us
            </div>
            <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1A0533] font-syne tracking-tight leading-tight">
              Let's Build Magic Together
            </h2>
            <p className="text-[#1A0533]/50 font-poppins text-[15px] leading-[1.6] max-w-[500px]">
              Have a question about our platform? Drop us a message and our team will get back to you shortly.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center shrink-0 text-[#7C3AED]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-[12px] text-[#1A0533]/40">Call Us</span>
                <span className="font-syne font-semibold text-[#1A0533] text-base">+977-9841000000</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center shrink-0 text-[#7C3AED]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-[12px] text-[#1A0533]/40">Email Us</span>
                <span className="font-syne font-semibold text-[#1A0533] text-base">support@spellwizards.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full max-w-[500px] justify-self-end bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_40px_rgba(124,58,237,0.06)] border border-black/5 relative z-[1]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-poppins text-[13px] font-medium text-[#1A0533]">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="spell Wizard"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 transition-all outline-none font-poppins text-sm placeholder:text-gray-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-poppins text-[13px] font-medium text-[#1A0533]">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="spell@example.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 transition-all outline-none font-poppins text-sm placeholder:text-gray-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-poppins text-[13px] font-medium text-[#1A0533]">Message</label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 transition-all outline-none font-poppins text-sm placeholder:text-gray-300 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full mt-1 rounded-xl bg-[#7C3AED] hover:bg-[#6d28d9] text-white font-bold font-syne text-[15px] py-3.5 transition-all duration-300 shadow-lg shadow-purple-500/20 disabled:opacity-70 flex justify-center items-center h-[50px]"
            >
              {status === "submitting" ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : status === "success" ? (
                "Message Sent!"
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
