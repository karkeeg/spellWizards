"use client";

import { useEffect, useState } from "react";

import {
    Info,
    Shield,
    Globe,
    Lightbulb,
    AlertTriangle,
    Gavel,
    Settings,
    BookOpen,
} from "lucide-react";
import Navbar from "@/app/components/Header";
import BgBlur from "@/app/components/BgBlur";
import Footer from "@/app/components/Footer";
import { InfoIcon } from "../components/icons";

export default function TermsAndConditions() {
    const [activeSection, setActiveSection] = useState("intro");

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
        { id: "intro", label: "Intro" },
        { id: "acceptable-use", label: "Acceptable Use" },
        { id: "third-party", label: "Third Party Websites" },
        { id: "intellectual-property", label: "Intellectual Property" },
        { id: "liability", label: "Liability for the information provided" },
        { id: "indemnity", label: "Indemnity" },
        { id: "termination", label: "Termination" },
        { id: "general", label: "General" },
    ];

    const scrollTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const BulletItem = ({ children }: { children: React.ReactNode }) => (
        <li className="flex items-start gap-2.5 text-[13px] text-gray-500 leading-[1.75]">
            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>{children}</span>
        </li>
    );

    const SectionHeader = ({ id, icon: Icon, title }: { id: string, icon: any, title: string }) => (
        <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                <Icon className="w-4 h-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-syne text-[#1A0533]">{title}</h2>
        </div>
    );

    return (
        <main className="w-full bg-white relative overflow-x-hidden selection:bg-purple-100 selection:text-purple-900 min-h-screen flex flex-col font-poppins">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-[120px] pb-[60px] flex flex-col items-center justify-center overflow-hidden shrink-0">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <BgBlur className="w-full h-full min-w-[1400px] max-w-none object-cover" />
                </div>
                <div className="relative z-10 text-center  px-4">
                    <span className="text-[10px]  md:text-xs font-bold bg-white rounded-lg px-2 py-1 w-fit m-auto text-gray-400 uppercase tracking-[0.2em] mb-4 block">
                        · Last updated on 20 March 2026
                    </span>
                    <h1 className="text-4xl md:text-[52px] font-bold font-syne text-[#1A0533] mb-4 tracking-tight">
                        Terms and Conditions
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-4xl mb-8 max-w-3xl mx-auto text-start leading-relaxed">
                        For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this
                        page shall mean <b>YUGAYA HEALTH PRIVATE LIMITED</b>; "you", "your", "user", "visitor" shall mean any
                        natural or legal person who is visiting our website and/or Spell Wizards application and/or
                        agreed to purchase from us.
                    </p>

                    {/* Quick Nav Pills */}
                    <div className="flex flex-wrap justify-center max-w-6xl gap-2">
                        {sidebarLinks.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={scrollTo(link.id)}
                                className="bg-white/80 backdrop-blur-sm border border-purple-100 text-[#7C3AED] hover:border-purple-300 hover:text-purple-700 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm hover:shadow-md"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col md:flex-row gap-8 lg:gap-16 relative z-10 flex-1">

                {/* Sidebar */}
                <aside className="w-full md:w-[260px] shrink-0 order-2 md:order-1 mt-8 md:mt-0">
                    <div className="sticky top-[120px] flex flex-col p-4 rounded-3xl bg-[#F9F7FF]/80 backdrop-blur-sm border border-purple-100/50 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5427A9] px-4 pt-2">On This Page</p>
                        <div className="w-full h-[1px] border border-gray-200 my-2" />
                        <div className="flex flex-col gap-1.5">
                            {sidebarLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={scrollTo(link.id)}
                                    className={`px-4 py-3 rounded-2xl text-[13px] font-semibold transition-all duration-300 ${activeSection === link.id
                                        ? " text-[#5427A9]"
                                        : "text-violet-500 hover:text-[#7C3AED] hover:bg-purple-50/50"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Article */}
                <article className="flex-1 max-w-[800px] w-full order-1 md:order-2">

                    {/* ── Intro ── */}
                    <div id="intro" className="mb-14 scroll-mt-[130px]">
                        <div className="bg-[#FAF8FF] border-l-4 border-[#7C3AED] rounded-2xl p-6 text-[13px] text-gray-500 leading-[1.75] space-y-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 flex items-center justify-center text-[#7C3AED]">
                                    <InfoIcon className="w-6 h-6" />
                                </div>
                                <h2 className="text-base font-bold font-syne text-[#1A0533]">Intro</h2>
                            </div>
                            <p>
                                <strong className="text-[#1A0533]">These Terms and Conditions shall apply to Your use of the Spell Wizards websites and apps.</strong><br />
                                If You do not wish to be bound by these terms and conditions, you should not use the Spell Wizards application and website.
                            </p>
                            <p>
                                We may change these Terms and Conditions from time to time and so you should check these regularly. Your use of the Spell Wizards application and website will be deemed an acceptance of the terms existing at that time.
                            </p>
                            <p>
                                As part of our commitment to ensuring that you want to visit time and time again, we welcome your comments on any of the policies or rules set out below. To contact us please email info@thespellwizards.com.
                            </p>
                        </div>
                    </div>

                    {/* ── Acceptable Use ── */}
                    <div id="acceptable-use" className="mb-14 scroll-mt-[130px]">
                        <SectionHeader id="acceptable-use" icon={Shield} title="Acceptable Use" />
                        <p className="text-gray-500 text-[13px] leading-[1.75] mb-5 pl-4 md:pl-11">
                            You agree that use by You of the Spell Wizards application or website shall be in accordance with the following conditions:
                        </p>
                        <ul className="pl-4 md:pl-11 space-y-3">
                            <BulletItem>You will not post or transmit through the Spell Wizards application or website, any defamatory, threatening, obscene, harmful, pornographic or otherwise illegal material or material which would violate or infringe in any way upon our rights or those of others (including intellectual property rights, rights of confidentiality, or rights of privacy) or cause distress or inconvenience. You must not express opinions that are vulgar, crude, sexist, racist or otherwise offensive. Always treat other users with respect.</BulletItem>
                            <BulletItem>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website and/or Spell Wizards application for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly fully exclude liability for any such inaccuracies or errors permitted by law.</BulletItem>
                            <BulletItem>Your use of any information or materials on our website and/or and/or Spell Wizards application is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</BulletItem>
                            <BulletItem>You will not post or otherwise make available on the Spell Wizards application or website any material, which You do not own without the express permission of the owner of the material.</BulletItem>
                            <BulletItem>You will not copy, download, reproduce, republish, frame, broadcast, transmit in any manner whatsoever, any material on the Spell Wizards application or website except as is strictly necessary for your own personal non-commercial home use.</BulletItem>
                            <BulletItem>You will abide by the specific rules of any competition or promotion that you participate in on or via the Spell Wizards application or website.</BulletItem>
                            <BulletItem>You will not do anything that affects the operability or security of the Spell Wizards website or application or causes unreasonable inconvenience or offence or disruption to our staff.</BulletItem>
                            <BulletItem>All trademarks reproduced in our website which are not the property of, or licensed to, the operator is acknowledged on the website.</BulletItem>
                            <BulletItem>Unauthorised use of information provided by us shall give rise to a claim for damages and/or be a criminal offence.</BulletItem>
                            <BulletItem>You may not create a link to our website from another website or document without our prior written consent.</BulletItem>
                            <BulletItem>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</BulletItem>
                            <BulletItem>You accept full responsibility for and do warrant that all children's data that You Control and entered into the website will either be fully anonymised or that explicit parental or guardian consent will be gained and stored.</BulletItem>
                            <BulletItem>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorisation for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</BulletItem>
                        </ul>
                    </div>

                    {/* ── Third Party Websites ── */}
                    <div id="third-party" className="mb-14 scroll-mt-[130px]">
                        <SectionHeader id="third-party" icon={Globe} title="Third Party Websites" />
                        <p className="text-gray-500 text-[13px] leading-[1.75] mb-5 pl-4 md:pl-11">
                            We may provide you with vouchers and/or promotional codes to allow you to receive a discount against a monthly or annual Subscription.
                        </p>
                        <ul className="pl-4 md:pl-11 space-y-3">
                            <BulletItem>You acknowledge and agree that We are not responsible for the availability of any third party websites or material You access through the Spell Wizards website or application.</BulletItem>
                            <BulletItem>We do not endorse and shall not be held responsible or liable for any content, advertising, products or services available from such Websites, websites or materials.</BulletItem>
                            <BulletItem>Any dealings between You and any third-party advertisers or merchants found on or via the Spell Wizards website or application, including payment for and delivery of products, services and any other terms, conditions, warranties or representations associated with such dealings, are made between You and the relevant advertiser or merchant. Therefore, We are not responsible or liable for any loss or damage of any kind incurred as the result of any such dealings.</BulletItem>
                        </ul>
                    </div>

                    {/* ── Intellectual Property ── */}
                    <div id="intellectual-property" className="mb-14 scroll-mt-[130px]">
                        <SectionHeader id="intellectual-property" icon={Lightbulb} title="Intellectual Property" />
                        <ul className="pl-4 md:pl-11 space-y-3">
                            <BulletItem>All copyright, trademarks and all other intellectual property rights in all material or content supplied as part of the Spell Wizards application or website shall remain at all times vested in Us or Our licensors. You are permitted to use this material or content only as expressly authorised in writing by Us or Our licensors. You will not, and You will not assist or facilitate any third party to, copy, reproduce, transmit, distribute, frame, commercially exploit or create derivative works of such material or content.</BulletItem>
                            <BulletItem>If You become aware of any such distribution or commercial exploitation, you agree to notify Us immediately.</BulletItem>
                            <BulletItem>You acknowledge that by posting materials on the Spell Wizards application or website You grant to Us and Our licensors and assigns an irrevocable, perpetual, royalty free, worldwide licence to use the materials both within the Spell Wizards website and in any other manner. The licence extends to copying, distributing, broadcasting, and otherwise transmitting, and adapting and editing the materials.</BulletItem>
                        </ul>
                    </div>

                    {/* ── Liability ── */}
                    <div id="liability" className="mb-14 scroll-mt-[130px]">
                        <SectionHeader id="liability" icon={AlertTriangle} title="Liability for the information provided" />
                        <ul className="pl-4 md:pl-11 space-y-3">
                            <BulletItem>Material which is posted on by users on Spell Wizards website or application is written by Users and We are not responsible for and do not endorse such material. We reserve the right to monitor the contributions made and may respond to or comment upon communications made by You and edit, refuse to post, or remove any content from the bulletin boards and chat forums in our absolute discretion. Failure to remove particular material does not constitute an endorsement or acceptance of it by Us.</BulletItem>
                            <BulletItem>We will not be held responsible or liable for the content, accuracy, timing or reliability of any information or statements contained, or for statements, advice and/or opinions made or given by users on the bulletin boards and chat forums (except as required by law). If You have any claim arising from the actions or statements of another User, You agree to pursue such a claim only against that User and not from Us.</BulletItem>
                            <BulletItem>We will endeavour to provide the Spell Wizards application using all reasonable care. Except as required by law, We will not be responsible or liable for the quality, accuracy or fitness for a particular purpose of the Spell Wizards website or application and (in particular) that the material contained, or any of the functions contained, or its server will operate without interruption or delay or will be error free, free of viruses or bugs or is compatible with any other software or material.</BulletItem>
                        </ul>
                    </div>

                    {/* ── Indemnity ── */}
                    <div id="indemnity" className="mb-14 scroll-mt-[130px]">
                        <SectionHeader id="indemnity" icon={Gavel} title="Indemnity" />
                        <ul className="pl-4 md:pl-11 space-y-3">
                            <BulletItem>If you are a business User, You agree to indemnify Us, and/or any of Our affiliates and Our and their officers, directors and employees, immediately on demand, against all claims, liability, damages, costs and expenses, including legal fees, arising out of any breach of these terms and conditions by You or any other liabilities arising out of Your use of the Spell Wizards website or application.</BulletItem>
                        </ul>
                    </div>

                    {/* ── Termination ── */}
                    <div id="termination" className="mb-14 scroll-mt-[130px]">
                        <SectionHeader id="termination" icon={Settings} title="Termination" />
                        <ul className="pl-4 md:pl-11 space-y-3">
                            <BulletItem>We reserve the right immediately to terminate Your use of the Spell Wizards website or application if You breach or We have reasonable grounds to believe that You are likely to breach these terms and conditions or You otherwise engage in conduct which We determine in Our sole discretion to be unacceptable.</BulletItem>
                        </ul>
                    </div>

                    {/* ── General ── */}
                    <div id="general" className="mb-14 scroll-mt-[130px]">
                        <SectionHeader id="general" icon={BookOpen} title="General" />
                        <ul className="pl-4 md:pl-11 space-y-3">
                            <BulletItem>Governing law: These terms and conditions and the Spell Wizards website or application are governed by Indian law and subject to the exclusive jurisdiction of the Indian courts.</BulletItem>
                            <BulletItem>Third Party Rights: These terms and conditions apply between Us and Users. No other person is entitled to benefit under these Terms and Conditions.</BulletItem>
                        </ul>
                    </div>

                </article>
            </div>

            <Footer />
        </main>
    );
}