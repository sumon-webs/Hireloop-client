import React from "react";

const TRENDING_POSITIONS = [
  { label: "Product Designer", href: "#" },
  { label: "AI Engineering", href: "#" },
  { label: "DevOps Engineer", href: "#" },
];

const Hero = () => {
  return (
    <section className="relative w-full  text-white overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        {/* badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/40 text-xs sm:text-sm text-zinc-400 mb-8">
          💼 <span className="text-white font-semibold">50,000+</span>
          <span className="uppercase tracking-widest text-[11px] text-zinc-500">
            New Jobs This Month
          </span>
        </div>

        {/* title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Find Your Dream Job Today
        </h1>

        {/* subtitle */}
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-lg mb-10">
          HireLoop connects top talent with world-class companies. Browse
          thousands of opportunities and land your next role faster.
        </p>

        {/* search box */}
        <div className="w-full max-w-3xl mx-auto bg-zinc-950/60 border border-zinc-800 rounded-2xl sm:rounded-full p-2 flex flex-col sm:flex-row gap-2 sm:gap-0 backdrop-blur-md">
          {/* job input */}
          <div className="flex items-center gap-2 px-4 py-3 sm:py-2 sm:border-r border-zinc-800 flex-1">
            🔍
            <input
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Job title, skill or company"
            />
          </div>

          {/* location input */}
          <div className="flex items-center gap-2 px-4 py-3 sm:py-2 flex-1">
            📍
            <input
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Location or Remote"
            />
          </div>

          {/* button */}
          <button className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 sm:py-2 rounded-xl sm:rounded-full text-sm font-medium flex items-center justify-center gap-2">
            🔍 Search
          </button>
        </div>

        {/* trending */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <span className="text-zinc-500">Trending:</span>

          <div className="flex flex-wrap justify-center gap-2">
            {TRENDING_POSITIONS.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="px-3 py-1 rounded-full border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
