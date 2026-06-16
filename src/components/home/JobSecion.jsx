"use client"
import React, { useState, useMemo } from "react";
import { MagnifyingGlass, ChevronDown } from "@gravity-ui/icons"; // সার্চের জন্য আইকন
import { JobCard } from "./JobCard";

const JobSection = ({ jobs = [] }) => {
  // স্টেট ম্যানেজমেন্ট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // ১. ডাইনামিক ফিল্টার অপশন তৈরি (জব লিস্ট থেকে ইউনিক টাইপ এবং লোকেশন স্বয়ংক্রিয়ভাবে বের করবে)
  const jobTypes = useMemo(() => {
    const types = jobs.map((job) => job?.jobType).filter(Boolean);
    return [...new Set(types)];
  }, [jobs]);

  const locations = useMemo(() => {
    const locs = jobs.map((job) => job?.location).filter(Boolean);
    return [...new Set(locs)];
  }, [jobs]);

  // ২. সার্চ এবং ফিল্টারিং লজিক
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job?.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedJobType ? job?.jobType === selectedJobType : true;
      const matchesLocation = selectedLocation ? job?.location === selectedLocation : true;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, searchQuery, selectedJobType, selectedLocation]);

  return (
    <section className="text-white py-16 px-4 container mx-auto">
      {/* Section Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 sm:text-4xl">
          Open Positions
        </h2>
        <p className="text-zinc-400 text-base">
          Explore current opportunities and take the next step in your professional journey.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 bg-[#121212] border border-zinc-800/60 rounded-2xl">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search jobs by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 text-zinc-200 pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-700 text-sm transition-all placeholder:text-zinc-600"
          />
          <span className="absolute left-3 top-3.5 text-zinc-600">
            {/* যদি MagnifyingGlass আইকন না থাকে, প্লেইন টেক্সট বা অন্য আইকন দিতে পারেন */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
            </svg>
          </span>
        </div>

        {/* Filter by Job Type */}
        <div className="w-full md:w-48">
          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="w-full bg-zinc-950 text-zinc-300 px-3 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-700 text-sm appearance-none cursor-pointer"
          >
            <option value="">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Location */}
        <div className="w-full md:w-48">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-zinc-950 text-zinc-300 px-3 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-700 text-sm appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs Grid Display */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-[#121212]/30">
          <p className="text-zinc-500 text-lg">No jobs match your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default JobSection;