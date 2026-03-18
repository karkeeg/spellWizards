"use client";
import Image from "next/image";

const StepCircle = ({ number }: { number: string }) => (
  <div className="w-16 h-16 rounded-full border-[3px] border-purple-600 bg-white flex items-center justify-center text-purple-600 font-extrabold text-2xl shadow-xl shadow-purple-200">
    {number}
  </div>
);

const StepText = ({ title, desc }: { title: string; desc: string }) => (
  <div>
    <h3 className="text-2xl font-semibold text-[#1a0533] mb-2">{title}</h3>
    <p className="text-gray-700">{desc}</p>
  </div>
);

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Parent Account",
      desc: "Sign up for free and access your parent portal dashboard.",
    },
    {
      number: "2",
      title: "Add Your Children",
      desc: "Create profiles and get unique invite codes for each child.",
    },
    {
      number: "3",
      title: "Start Learning!",
      desc: "Kids enter the code in the app and begin their magical spelling journey.",
    },
  ];

  return (
    <section className="w-full bg-[#f3eeff] py-8 md:py-12 relative overflow-hidden">
      {/* DESKTOP DECORATIVE CURVE (Lg and above) */}
      <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
        <img
          src="/curveline.svg"
          alt=""
          className="absolute top-0 left-[35%] -translate-x-1/2 w-[550px] h-auto opacity-80"
        />

        {/* Number Bubbles on Curve - Perfectly positioned relative to curve */}
        <div className="absolute top-[200px] left-[47%] -translate-x-1/2 -translate-y-1/2 z-20">
          <StepCircle number="1" />
        </div>
        <div className="absolute top-[385px] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20">
          <StepCircle number="2" />
        </div>
        <div className="absolute top-[610px] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20">
          <StepCircle number="3" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
          {/* LEFT: Branding & Illustration */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-10 lg:mb-16">
              <span className="px-4 py-1.5 font-bold uppercase  text-[14px] ">
                How It Works
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1a0533] tracking-tight">
                Get Started in 3 Easy Steps
              </h2>
            </div>

            <div className="relative group max-w-[320px] md:max-w-[480px]">
              {/* Dynamic background glow */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-purple-400/20 to-fuchsia-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative transform group-hover:scale-105 transition-transform duration-500 ease-out">
                <Image
                  src="/howitWorks.svg"
                  alt="Wizard Magic"
                  width={500}
                  height={500}
                  className="object-contain w-full drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Responsive Steps */}
          <div className="relative">
            {/* MOBILE & TABLET LAYOUT (< LG) */}
            <div className="lg:hidden relative">
              {/* Vertical Connecting Line */}
              <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-purple-200 dashed-path" />

              <div className="flex flex-col gap-12 sm:gap-16">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="relative flex items-start gap-6 sm:gap-8 group"
                  >
                    {/* Circle Wrapper */}
                    <div className="relative z-10 shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-16 h-16 rounded-full border-[3px] border-purple-600 bg-white flex items-center justify-center text-purple-600 font-extrabold text-2xl shadow-xl shadow-purple-200">
                        {step.number}
                      </div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="pt-2">
                      <h3 className="text-xl sm:text-2xl font-black text-[#1a0533] mb-2 group-hover:text-purple-700 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium max-w-lg">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP LAYOUT (>= LG) */}
            <div className="hidden lg:block relative h-[750px] w-full">
              <div className="absolute top-[150px] left-0 -translate-y-1/2 max-w-[580px] p-6 hover:bg-white/40 rounded-3xl transition-all duration-300 border border-transparent hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-200/50 group">
                <h3 className="text-3xl font-black text-[#1a0533] mb-3 group-hover:text-purple-700 transition-colors">
                  {steps[0].title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {steps[0].desc}
                </p>
              </div>

              <div className="absolute top-[335px] left-[10%] -translate-y-1/2 max-w-[580px] p-6 hover:bg-white/40 rounded-3xl transition-all duration-300 border border-transparent hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-200/50 group">
                <h3 className="text-3xl font-black text-[#1a0533] mb-3 group-hover:text-purple-700 transition-colors">
                  {steps[1].title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {steps[1].desc}
                </p>
              </div>

              <div className="absolute top-[560px] left-[12%] -translate-y-1/2 max-w-[580px] p-6 hover:bg-white/40 rounded-3xl transition-all duration-300 border border-transparent hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-200/50 group">
                <h3 className="text-3xl font-black text-[#1a0533] mb-3 group-hover:text-purple-700 transition-colors">
                  {steps[2].title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {steps[2].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashed-path {
          background-image: linear-gradient(
            to bottom,
            #d8b4fe 50%,
            transparent 50%
          );
          background-size: 2px 12px;
          background-repeat: repeat-y;
        }
      `}</style>
    </section>
  );
}
