"use client";

const stats = [
  {
    value: "50K+",
    label: "Active Students",
  },
  {
    value: "4.9★",
    label: "Ratings",
  },
  {
    value: "2M+",
    label: "Words Mastered",
  },
];

export default function StatsSection() {
  return (
    <section className="w-full  pb-10 md:pb-18 ">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex-1">
            <h2 className="text-3xl md:text-5xl font-semibold text-purple-900">
              {item.value}
            </h2>
            <p className="mt-2 text-sm md:text-base text-purple-700">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
