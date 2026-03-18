import { NextPage } from "next";
import Image from "next/image";

const Hero: NextPage = () => {
  return (
    <div className="w-full relative bg-white flex flex-col items-center isolation-auto gap-12 md:gap-[60px] text-center font-syne overflow-x-hidden pb-12 md:pb-18">
      {/* GRADIENT BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* LEFT PURPLE BLOB */}
        <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[140px] opacity-70" />

        {/* RIGHT RED/ORANGE BLOB */}
        <div className="absolute top-[50px] right-[-150px] w-[500px] h-[500px] bg-red-500 rounded-full blur-[140px] opacity-70" />

        {/* CENTER ORANGE MIX */}
        <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-400 rounded-full blur-[160px] opacity-70" />
      </div>

      <div className="w-full max-w-[1265px] flex flex-col items-center pt-12 md:pt-[40px] z-[1] shrink-0 px-4 md:px-0">
        <div className="w-full max-w-[1075px] flex flex-col items-center gap-2 md:gap-[18px]">
          <div className="self-stretch flex flex-col items-center gap-2 md:gap-[12px]">
            <h1 className="self-stretch relative text-[32px] sm:text-[40px] md:text-[54px] leading-[1.1] md:leading-[114%] font-semibold text-[#1A0533] tracking-tight">
              Turn Spelling Practice <br className="hidden sm:block" />
              Into An Epic Adventure
            </h1>
            <p className="self-stretch relative text-sm md:text-[16px] leading-relaxed md:leading-[150%] font-poppins text-black/50 max-w-[900px] mx-auto">
              Spell Wizards combines game-based learning with proven educational
              methods to help children master spelling while having fun. Track
              progress, add custom words, and watch your child's confidence
              soar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[16px] text-black font-poppins w-full sm:w-auto">
            <a
              href="/signup"
              className="w-full sm:w-[150px] rounded-[10px] bg-white border border-black/10 hover:border-black flex items-center justify-center px-6 py-3 font-medium transition-all duration-300"
            >
              Try for Free
            </a>
            <a
              href="/login"
              className="w-full sm:w-[180px] rounded-[10px] bg-[#7c3aed] text-white hover:bg-[#6d28d9] flex items-center justify-center px-6 py-3 font-medium shadow-xl shadow-purple-500/20 transition-all duration-300"
            >
              Parents Portal
            </a>
          </div>
        </div>

        {/* Visual Mockup Area */}
        <div className="self-stretch h-[250px] sm:h-[350px] md:h-[500px] relative shrink-0 mt-4">
          {/* Main Preview - Scales responsively */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[740px] aspect-[740/470]">
            <Image
              src="/herocards/Centerpreview.svg"
              alt="Center Preview"
              fill
              className="object-cover"
            />
          </div>

          {/* Floating Card 1 (Left) - Hidden on small mobile, floating on desktop */}
          <div className="hidden lg:block absolute top-[16%] left-[5%] xl:left-[65.5px] w-[32%] xl:w-[408.7px] aspect-[408.7/297.3] animate-float">
            <Image
              src="/herocards/leftCard.svg"
              alt="Left Card"
              fill
              className="object-contain drop-shadow-[0_10px_20px_rgba(255,116,56,0.3)]"
            />
          </div>

          {/* Floating Card 2 (Right) - Hidden on small mobile, floating delayed */}
          <div className="hidden lg:block absolute top-[25%] right-[5%] xl:left-[912.5px] w-[16%] xl:w-[202.7px] aspect-[202.7/189.2] animate-float-delayed">
            <Image
              src="/herocards/Streak.svg"
              alt="Streak Card"
              fill
              className="object-contain drop-shadow-[0_10px_20px_rgba(255,116,56,0.3)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
