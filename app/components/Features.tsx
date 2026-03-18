import { FC } from 'react';
import Image from 'next/image';

const Features: FC = () => {
    return (
        <section className="w-full bg-white py-4 md:py-8 font-poppins">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <span className="text-[12px] md:text-[14px] font-semibold text-[#1A0533] uppercase tracking-[0.2em] mb-2 block">
                        Powerful Features
                    </span>
                    <h2 className="text-[24px] md:text-[36px] font-bold text-[#1A0533] font-syne leading-[1.1] max-w-4xl mx-auto">
                        Everything You Need to Support Your Child's Learning
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                    
                    {/* Feature 1: Game-Based Learning */}
                    <div className="md:col-span-2 bg-gradient-to-br from-white to-[#F9F7FF] rounded-[18px] border border-[#E5E7EB] p-2 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:border-purple-100 transition-all duration-500 overflow-hidden min-h-[320px]">
                        <div className="relative w-[150%] aspect-[2/1] transition-transform duration-700">
                            <Image 
                                src="/features/GameBased.svg" 
                                alt="Game-Based Learning" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="">
                            <h3 className="text-[18px] md:text-[22px] font-bold text-[#1A0533] font-syne mb-1">Game-Based Learning</h3>
                            <p className="text-gray-500 text-[13px] md:text-[14px] max-w-[320px] font-medium leading-tight">
                                Engaging spelling games across multiple realms keep children motivated and excited to practice.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Parent Dashboard */}
                    <div className="md:col-span-3 bg-gradient-to-br from-white to-[#F9F7FF] rounded-[18px] border border-[#E5E7EB] p-2 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:border-purple-100 transition-all duration-500 overflow-hidden min-h-[320px]">
                        <div className="relative w-[130%] aspect-[2.5/1] transition-transform duration-700">
                            <Image 
                                src="/features/ParentDashboard.svg" 
                                alt="Parent Dashboard" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="pb-2">
                            <h3 className="text-[18px] md:text-[22px] font-bold text-[#1A0533] font-syne mb-1">Parent Dashboard</h3>
                            <p className="text-gray-500 text-[13px] md:text-[14px] max-w-[400px] font-medium leading-tight">
                                Track progress, view detailed statistics, and understand exactly where your child excels or needs support.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Custom Word Lists (Bigger) */}
                    <div className="md:col-span-3 md:h-[432px] bg-gradient-to-br from-white to-[#F9F7FF] rounded-[18px] border border-[#E5E7EB] p-2 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:border-purple-100 transition-all duration-500 overflow-hidden">
                        <div className="relative w-[120%] h-[300px] transition-transform duration-700">
                            <Image 
                                src="/features/CustomWord.svg" 
                                alt="Custom Word Lists" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="pb-4 ">
                            <h3 className="text-[20px] md:text-[26px] font-bold text-[#1A0533] font-syne mb-2">Custom Word Lists</h3>
                            <p className="text-gray-500 text-[14px] md:text-[16px] max-w-[480px] font-medium leading-relaxed">
                                Add words from homework, books, or topics you're exploring together for personalized learning.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4: Streak System (Smaller) */}
                    <div className="md:col-span-2 md:h-[432px] bg-gradient-to-br from-white to-[#F9F7FF] rounded-[18px] border border-[#E5E7EB] p-2 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:border-purple-100 transition-all duration-500 overflow-hidden">
                        <div className="relative w-[130%] h-[300px]  transition-transform duration-700">
                            <Image 
                                src="/features/StreakSystem.svg" 
                                alt="Streak System" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="pb-4">
                            <h3 className="text-[20px] md:text-[26px] font-bold text-[#1A0533] font-syne mb-2">Streak System</h3>
                            <p className="text-gray-500 text-[14px] md:text-[16px] max-w-[320px] font-medium leading-relaxed">
                                Daily practice streaks build consistency and create positive learning habits that stick.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-8 text-center text-gray-400">
                    <p className="font-bold text-[16px] md:text-[18px]">and a lot more ...</p>
                </div>
            </div>
        </section>
    );
};

export default Features;
