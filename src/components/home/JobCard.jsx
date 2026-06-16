"use client" 
import { CircleDollar, Briefcase, Pin, ArrowRight } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";

export function JobCard({ job }) {
  return (
    <Card className="w-full text-zinc-400 p-6 rounded-3xl border border-zinc-800/50 flex flex-col justify-between gap-6 hover:border-zinc-700 transition-all duration-300">
      <div>
        {/* Header Section */}
        <Card.Header className="flex flex-col gap-2 items-start p-0">
          <Card.Title className="text-3xl font-medium text-white tracking-tight">
            {job?.companyName || "Job Title"}
          </Card.Title>
          <h1>Position: {job?.title}</h1>
          <Card.Description className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
            {job?.description || "No description available for this role."}
          </Card.Description>
        </Card.Header>

        {/* Badges / Meta Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {/* Location */}
          {job?.location && (
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1 rounded-full text-xs font-medium text-zinc-300 border border-zinc-800">
              <Pin className="text-pink-400 size-3.5" aria-hidden="true" />
              <span>{job.location}</span>
            </div>
          )}

          {/* Job Type (Full-time, Hybrid, etc.) */}
          {job?.jobType && (
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1 rounded-full text-xs font-medium text-zinc-300 border border-zinc-800">
              <Briefcase className="text-pink-400 size-3.5" aria-hidden="true" />
              <span>{job.jobType}</span>
            </div>
          )}

          {/* Salary */}
          {job?.salary && (
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1 rounded-full text-xs font-medium text-zinc-300 border border-zinc-800">
              <CircleDollar className="text-pink-400 size-3.5" aria-hidden="true" />
              <span>{job.salary}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Action Section */}
      <Card.Footer className="p-0">
        <Link
          aria-label={`Apply Now for ${job?.title || "this position"}`}
          href={`/allJobs/${job?._id}`}
          className="text-white hover:text-zinc-300 text-sm font-medium flex items-center gap-2 transition-colors group"
        >
          Apply Now
          <ArrowRight className="size-4 transform transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Card.Footer>
    </Card>
  );
}