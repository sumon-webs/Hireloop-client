import React from "react";

const STATS_DATA = [
  {
    id: 1,
    number: "50K",
    label: "Active Jobs",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    number: "12K",
    label: "Companies",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: 3,
    number: "2M",
    label: "Job Seekers",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    number: "97%",
    label: "Satisfaction Rate",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.381-1.24.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
];

const StatsSection = () => {
  return (
    <section className="relative w-full py-24  text-white flex flex-col items-center justify-end pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-80 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('/images/globe.png')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030303] pointer-events-none" />

      <div className="relative z-10 w-full container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-zinc-300 max-w-2xl mx-auto mb-16 leading-snug">
          Assisting over{" "}
          <span className="text-white font-medium">15,000 job seekers</span>
          <br className="hidden sm:inline" /> find their dream positions.
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="p-6 h-48 rounded-2xl bg-zinc-950/40 border border-zinc-900 backdrop-blur-md shadow-lg hover:border-zinc-800 transition flex flex-col justify-between text-left"
            >
              <div className="p-2.5 w-fit rounded-xl bg-zinc-900/50 border border-zinc-800">
                {stat.icon}
              </div>

              <div className="mt-4">
                <div className="text-4xl sm:text-5xl font-semibold text-white">
                  {stat.number}
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
