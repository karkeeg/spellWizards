import React from "react";
import BgBlur from "./BgBlur";

type Plan = {
  name: string;
  price: string;
  duration: string;
  price2?: string;
  duration2?: string;
  features: string[];
  button: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    duration: "/forever",
    features: [
      "1 child profile",
      "Basic progress tracking",
      "Access to 2 realms",
      "100 practice words",
      "Weekly reports",
    ],
    button: "Start Free",
  },
  {
    name: "Pro",
    price: "₹299",
    duration: "/per month",
    price2: "₹2499",
    duration2: "/per year",
    features: [
      "Access to custom words",
      "Weekly reports & alerts",
      "Access to Brain Lab",
      "Add Wiz",
    ],
    button: "Start 14-Day Trial",
    popular: true,
  },
  {
    name: "Institution (Reach out for more details)",
    price: "",
    duration: "",
    features: [
      "Access to custom words",
      "Weekly reports & alerts",
      "Access to Brain Lab",
      "Add Wiz",
    ],
    button: "Start 14-Day Trial",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 px-6 flex justify-center bg-white overflow-hidden">
      {/* Blur Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
        <BgBlur className="w-full h-full min-w-[1200px] max-w-none object-cover" />
      </div>

      <div className="relative max-w-6xl w-full text-center">
        {/* Title */}
        <p className="text-sm font-medium text-gray-600">Pricing</p>
        <h2 className="text-4xl font-semibold text-[#1a0533] mt-2 mb-12">
          Choose Your Plan
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 text-left bg-white 
              ${plan.popular
                  ? "border-4 border-purple-600 shadow-xl scale-105 py-12"
                  : "border border-purple-200 shadow-md"
                }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-4 py-1 rounded-full font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-extrabold text-[#1a0533]">
                {plan.name}
              </h3>

              {/* Price */}
              {plan.price && (
                <div className="mt-3 text-purple-700 font-bold font-syne text-5xl">
                  {plan.price}
                  <span className="text-sm text-gray-500 font-medium ml-1">
                    {plan.duration}
                  </span>
                </div>
              )}

              {/* Second price (Pro plan) */}
              {plan.price2 && (
                <div className="mt-2 text-purple-700 font-bold font-syne text-5xl">
                  {plan.price2}
                  <span className="text-sm text-gray-500 font-medium ml-1">
                    {plan.duration2}
                  </span>
                </div>
              )}

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}

              <a href="/signup"
                className={`mt-8 w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center
                ${plan.popular
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 text-purple-700 border border-purple-200"
                  }`}
              >
                {plan.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}