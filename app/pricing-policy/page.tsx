"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import BgBlur from "../components/BgBlur";
import {
  BookOpen,
  Tag,
  Gift,
  CreditCard,
  Zap,
  XCircle,
  RotateCcw,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Info,
  Smartphone,
  Globe,
  Shield,
  CircleDollarSign,
  BadgeCheck,
  Landmark,
} from "lucide-react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("definition");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    const sections = document.querySelectorAll("article > div[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sidebarLinks = [
    { id: "definition", label: "Definition" },
    { id: "price", label: "Price" },
    { id: "vouchers", label: "Vouchers" },
    { id: "payments", label: "Payments" },
    { id: "subscriptions", label: "Subscription" },
    { id: "cancellation", label: "Cancellation" },
    { id: "refund", label: "Refund" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full bg-white relative overflow-x-hidden selection:bg-purple-100 selection:text-purple-900 min-h-screen flex flex-col font-poppins">
      <Navbar />
      <div className="absolute top-[20%] left-[0%] z-0 opacity-100">
        <svg
          width="1440"
          height="2291"
          viewBox="0 0 1440 2291"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-539.807 882.767C-819.438 1079.6 -553.286 504.358 120.679 534.499C963.135 572.175 316.853 -198.533 64.8195 75.5499C-187.214 349.633 -233.223 776.68 110.414 892.125C454.051 1007.57 779.879 703.477 883.13 1148.21C1164.59 2360.54 1325.8 356.474 1690.38 1693.47C1698.89 1724.68 970.375 2118.16 1387.74 2274.69"
            stroke="#7C3AED"
            strokeOpacity="0.04"
            strokeWidth="33"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <div className="relative pt-[120px] pb-[60px] flex flex-col items-center justify-center overflow-hidden shrink-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <BgBlur className="w-full h-full min-w-[1400px] max-w-none object-cover" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-4">
          <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 block">
            · Last updated on 20 March 2026
          </span>
          <h1 className="text-4xl md:text-[52px] font-bold font-syne text-[#1A0533] mb-4 tracking-tight">
            Pricing Policy
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about subscriptions, payments, cancellations, and refunds —
            written clearly for families.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {sidebarLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={scrollTo(link.id)}
                className="bg-white/80 backdrop-blur-sm border border-purple-100 text-gray-600 hover:border-purple-300 hover:text-purple-700 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm hover:shadow-md"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col md:flex-row gap-8 lg:gap-16 relative z-10 flex-1">

        {/* Sticky Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0 order-2 md:order-1 mt-8 md:mt-0">
          <div className="sticky top-[120px] flex flex-col p-4 rounded-3xl bg-[#F9F7FF]/80 backdrop-blur-sm border border-purple-100/50 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 mb-3">On This Page</p>
            <div className="flex flex-col gap-1.5">
              {sidebarLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={scrollTo(link.id)}
                  className={`px-4 py-3 rounded-2xl text-[13px] font-semibold transition-all duration-300 ${activeSection === link.id
                    ? "bg-[#7C3AED] text-white shadow-md shadow-purple-500/20 translate-x-1"
                    : "text-gray-500 hover:text-[#7C3AED] hover:bg-purple-50/50"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            {/* Need billing help? */}
            <div className="mt-5 p-4 bg-purple-600 rounded-2xl text-center">
              <p className="text-white text-xs font-bold mb-1">Need billing help?</p>
              <p className="text-purple-200 text-[11px]">billing@spellwizards.com</p>
            </div>
          </div>
        </aside>

        {/* Content Sections */}
        <article className="flex-1 max-w-[800px] w-full order-1 md:order-2">

          {/* ── Definition ── */}
          <div id="definition" className="mb-14 scroll-mt-[130px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8  flex items-center justify-center text-[#7C3AED]">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">Definition</h2>
            </div>

            <div className="bg-[#FAF8FF] border border-purple-100 rounded-2xl p-6 text-[13px] text-gray-500 leading-[1.75] space-y-4">
              <p>
                The term <strong className="text-[#1A0533]">"we"</strong>, <strong className="text-[#1A0533]">"us"</strong>, <strong className="text-[#1A0533]">"our"</strong>, <strong className="text-[#1A0533]">"our"</strong> used anywhere on this page shall mean <strong className="text-[#1A0533]">YUSAYA HEALTH PRIVATE LIMITED</strong>, whose registered/operational office is listed in our legal documentation.
              </p>

              <div>
                <p className="font-bold text-[#7C3AED] mb-1">"you" / "your" / "user" / "visitor"</p>
                <p>Any natural or legal person who is visiting our website and/or Spell Wizards application and/or agreed to purchase from us.</p>
              </div>

              <div>
                <p className="font-bold text-[#7C3AED] mb-1">"Pricing" / "Price"</p>
                <p>The amount charged by your bank account or debit/credit card on a monthly or annual recurring basis unless you cancel your Subscription.</p>
              </div>

              <div>
                <p className="font-bold text-[#7C3AED] mb-1">"Subscription"</p>
                <p>A plan to access and use the Spell Wizards application, subscribed to for a monthly or annual duration until cancelled.</p>
              </div>

              <div>
                <p className="font-bold text-[#7C3AED] mb-1">"Order"</p>
                <p>The purchase of a Subscription from Us.</p>
              </div>
            </div>
          </div>

          {/* ── Price ── */}
          <div id="price" className="mb-14 scroll-mt-[130px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                <CircleDollarSign className="w-6 h-6" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">Price</h2>
            </div>
            <p className="text-gray-500 text-[13px] md:text-sm leading-[1.7] mb-5 pl-4 md:pl-11">
              The price of our Subscriptions are as quoted on our site and are subject to change. We keep our pricing transparent and always notify you in advance of any changes.
            </p>
            <div className="pl-4 md:pl-11 flex flex-col gap-3">
              <div className="flex items-start gap-3 p-4 bg-[#F0F7FF] border border-[#D6EAF8] rounded-2xl">
                <Info className="w-4 h-4 text-[#3498DB] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#2874A6] leading-relaxed">
                  Subscription plans, features, and prices are liable to change at any time. We will keep you informed of changes via our Site and, if appropriate, via e-mail.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F0FFF4] border border-[#C6F6D5] rounded-2xl">
                <BadgeCheck className="w-4 h-4 text-[#27AE60] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#1E8449] leading-relaxed">
                  Subscription plans, features, and prices are liable to change at any time. We will keep you informed of changes via our Site and, if appropriate, via e-mail.
                </p>
              </div>
            </div>
          </div>

          {/* ── Vouchers ── */}
          <div id="vouchers" className="mb-14 scroll-mt-[130px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                <Gift className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">Vouchers and Promotional Codes</h2>
            </div>
            <p className="text-gray-500 text-[13px] md:text-sm leading-[1.7] mb-5 pl-4 md:pl-11">
              We may provide you with vouchers and/or promotional codes to allow you to receive a discount against a monthly or annual Subscription.
            </p>
            <div className="pl-4 md:pl-11 flex flex-col gap-3">
              {[
                { text: <>Vouchers and promotional codes are <strong className="text-[#1A0533]">for your use only</strong> and are non-transferable.</> },
                { text: <>Vouchers or promotional codes may be <strong className="text-[#1A0533]">usage or time-limited.</strong></> },
                { text: <>We reserve the right to <strong className="text-[#1A0533]">cancel any expired vouchers</strong> or promotional codes.</> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#FAF8FF] border border-purple-100 rounded-2xl">
                  <div className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Payment ── */}
          <div id="payments" className="mb-14 scroll-mt-[130px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                <Landmark className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">Payment</h2>
            </div>
            <p className="text-gray-500 text-[13px] md:text-sm leading-[1.7] mb-6 pl-4 md:pl-11">
              Payment for Subscriptions is taken monthly or annually in advance from your registered bank account or debit/credit card.
            </p>

            {/* Timeline */}
            <div className="pl-4 md:pl-11 mb-5">
              <div className="relative flex items-center justify-between bg-[#FAF8FF] border border-purple-100 rounded-2xl p-5 overflow-hidden">
                {/* connector line */}
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-1/2 h-0.5 bg-purple-200 -translate-y-1/2 z-0" />
                {[
                  { label: "Sign Up", sub: "Choose your subscription plan" },
                  { label: "First Payment", sub: "Payment taken on sign-up date" },
                  { label: "Auto Renewal", sub: "Billed monthly/annually recurring" },
                  { label: "Ongoing Access", sub: "Until subscription is cancelled" },
                ].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center gap-2 flex-1">
                    <div className="w-3 h-3 rounded-full bg-[#7C3AED] border-2 border-white shadow-md shadow-purple-300" />
                    <p className="text-[11px] font-bold text-[#1A0533]">{step.label}</p>
                    <p className="text-[10px] text-gray-400 hidden sm:block leading-tight max-w-[80px]">{step.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pl-4 md:pl-11">
              <div className="flex items-start gap-3 p-4 bg-[#FFF8F0] border border-[#FDEBD0] rounded-2xl">
                <AlertTriangle className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#935116] leading-relaxed">
                  Recurring payments will be taken automatically on the <strong>anniversary of your sign-up date</strong>, monthly or annually depending on your subscription type. Our payment methods may vary at times.
                </p>
              </div>
            </div>
          </div>

          {/* ── Subscriptions ── */}
          <div id="subscriptions" className="mb-14 scroll-mt-[130px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                <Zap className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">Subscriptions</h2>
            </div>
            <p className="text-gray-500 text-[13px] md:text-sm leading-[1.7] mb-5 pl-4 md:pl-11">
              We shall supply your Subscription to you until it expires or you cancel. Your Subscription will <strong className="text-[#1A0533]">renew automatically</strong> unless you notify us of your wish to cancel.
            </p>
            <div className="pl-4 md:pl-11 flex flex-col gap-3">
              <div className="flex items-start gap-3 p-4 bg-[#FAF8FF] border border-purple-100 rounded-2xl">
                <div className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  You must provide written notice to cancel us at least <strong className="text-[#1A0533]">30 days</strong> before you wish to end your current Subscription.
                </p>
              </div>
            </div>

            <p className="text-gray-500 text-[13px] md:text-sm leading-[1.7] my-5 pl-4 md:pl-11">
              We reserve the right to suspend or cancel the provision of your Subscription if payments are not due to be collected automatically from your registered payment method.
            </p>

            <div className="pl-4 md:pl-11">
              <div className="flex items-start gap-3 p-4 bg-[#F0FFF4] border border-[#C6F6D5] rounded-2xl">
                <BadgeCheck className="w-6 h-6 text-[#27AE60] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#1E8449] leading-relaxed">
                  <strong>Free Trial:</strong> If a free trial is offered, users will not be charged until the trial period ends. You may cancel at any time during the trial to avoid being charged. If not cancelled, the subscription automatically converts to a paid plan at the end of the trial.
                </p>
              </div>
            </div>
          </div>

          {/* ── Cancellation ── */}
          <div id="cancellation" className="mb-14 scroll-mt-[130px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                <XCircle className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">Cancellation Policy</h2>
            </div>
            <p className="text-gray-500 text-[13px] md:text-sm leading-[1.7] mb-6 pl-4 md:pl-11">
              Users may cancel their subscription at any time. The method of cancellation depends on how you originally purchased your subscription.
            </p>

            <div className="pl-4 md:pl-11 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF8FF] border border-purple-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-[#7C3AED]" />
                  <h3 className="font-bold text-[#4C1D95] text-sm">App Store Purchases</h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  For purchases made on Google Play or Apple App Store, cancellations must be managed directly through the respective platform's subscription management settings.
                </p>
              </div>
              <div className="bg-[#FAF8FF] border border-purple-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-[#7C3AED]" />
                  <h3 className="font-bold text-[#4C1D95] text-sm">Website Purchases</h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  For purchases made on our website, you may cancel by accessing your account settings or by contacting our support team directly.
                </p>
              </div>
            </div>
          </div>

          {/* ── Refund ── */}
          <div id="refund" className="mb-14 scroll-mt-[130px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">Refund Policy</h2>
            </div>
            <p className="text-gray-500 text-[13px] md:text-sm leading-[1.7] mb-6 pl-4 md:pl-11">
              All purchases are generally <strong className="text-[#1A0533]">non-refundable.</strong> However, refunds may be considered in specific exceptional circumstances.
            </p>

            <div className="pl-4 md:pl-11 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Not Eligible */}
              <div className="bg-[#FFF4F2] border border-[#FADBD8] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-[#E74C3C] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">✕</span>
                  </div>
                  <h3 className="font-bold text-[#943126] text-sm">Not Eligible for Refund</h3>
                </div>
                <p className="text-[13px] text-[#B03A2E] leading-relaxed">
                  Duplicate transactions, or technical issues preventing access to core features where the issue cannot be resolved within 10 working days.
                </p>
              </div>
              {/* Eligible */}
              <div className="bg-[#F0FFF4] border border-[#C6F6D5] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-[#27AE60] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                  <h3 className="font-bold text-[#1E8449] text-sm">Eligible for Refund</h3>
                </div>
                <p className="text-[13px] text-[#1E8449] leading-relaxed">
                  Duplicate transactions, or technical issues preventing access to core features where the issue cannot be resolved within 10 working days.
                </p>
              </div>
            </div>

            <div className="pl-4 md:pl-11 flex flex-col gap-3">
              <div className="flex items-start gap-3 p-4 bg-[#FFF8F0] border border-[#FDEBD0] rounded-2xl">
                <AlertTriangle className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#935116] leading-relaxed">
                  Refund requests with supporting documents must be submitted within <strong>7 days of the transaction date.</strong> For technical issues, written communication of the issue is required.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F0F7FF] border border-[#D6EAF8] rounded-2xl">
                <Info className="w-4 h-4 text-[#3498DB] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#2874A6] leading-relaxed">
                  For purchases made through <strong>third-party platforms (e.g., app stores)</strong>, refunds will be subject to the policies of those platforms and must be requested through them directly.
                </p>
              </div>
            </div>
          </div>

          {/* ── Contact / Bottom CTA ── */}
          <div id="contact" className="scroll-mt-[130px]">
            <div className="mt-8 w-full rounded-[30px] bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-purple-500/20">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/20 rounded-full blur-3xl mix-blend-overlay" />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl mix-blend-overlay" />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-syne text-white mb-4">
                  Need Help with Billing?
                </h3>
                <p className="text-white/80 text-[14px] md:text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
                  For any billing, cancellation, or refund-related queries, our support team
                  is here to help. Reach out to us and we'll get back to you as soon as possible.
                </p>
                <a
                  href="mailto:info@spellwizards.com"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#5B21B6] px-8 py-3.5 rounded-full text-[15px] font-bold hover:bg-gray-50 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                  info@spellwizards.com
                </a>
              </div>
            </div>
          </div>

        </article>
      </div>

      <Footer />
    </main>
  );
}