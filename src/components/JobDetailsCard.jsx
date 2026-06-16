import {
  CircleDollar,
  Briefcase,
  Pin,
  ArrowLeft,
  Layers,
  Persons,
} from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";

export default async function JobDetails({ id, job }) {
  // যদি কোনো কারণে জব ডেটা লোড না হয়
  if (!job) {
    return (
      <div className="min-h-screen bg-black text-zinc-400 flex items-center justify-center">
        <p className="text-lg">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back to Jobs Link */}
        <Link
          href="/allJobs"
          className="text-zinc-400 hover:text-white flex items-center gap-2 mb-8 text-sm font-medium transition-colors group"
        >
          <ArrowLeft className="size-4 transform transition-transform group-hover:-translate-x-1" />
          Back to Open Positions
        </Link>

        {/* Main Job Details Card */}
        <Card className="w-full bg-[#121212] text-zinc-400 p-8 rounded-3xl border border-zinc-800/50 flex flex-col gap-8">
          {/* Header Section */}
          <Card.Header className="flex flex-col gap-3 items-start p-0">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  job.status === "active"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {job.status || "Active"}
              </span>
            </div>

            <Card.Title className="text-4xl sm:text-4xl font-bold text-white tracking-tight">
              {job.companyName || "Job Title"}
            </Card.Title>
            <h1>Position: {job?.title}</h1>
          </Card.Header>

          {/* Quick Info Badges / Meta Grid */}
          <div className="flex flex-wrap gap-3 p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/40">
            {/* Location */}
            {job.location && (
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-200 border border-zinc-800">
                <Pin className="text-pink-400 size-4" aria-hidden="true" />
                <span>{job.location}</span>
              </div>
            )}

            {/* Job Type */}
            {job.jobType && (
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-200 border border-zinc-800">
                <Briefcase
                  className="text-pink-400 size-4"
                  aria-hidden="true"
                />
                <span>{job.jobType}</span>
              </div>
            )}

            {/* Salary */}
            {job.salary && (
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-200 border border-zinc-800">
                <CircleDollar
                  className="text-pink-400 size-4"
                  aria-hidden="true"
                />
                <span>{job.salary}</span>
              </div>
            )}

            {/* Experience */}
            {job.experience && (
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-200 border border-zinc-800">
                <Layers className="text-pink-400 size-4" aria-hidden="true" />
                <span>{job.experience}</span>
              </div>
            )}

            {/* Vacancies */}
            {job.vacancies && (
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-200 border border-zinc-800">
                <Persons className="text-pink-400 size-4" aria-hidden="true" />
                <span>{job.vacancies} Vacancies</span>
              </div>
            )}
          </div>

          <hr className="border-zinc-800/80" />

          {/* Description Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-white">
              Job Description
            </h3>
            <Card.Description className="text-zinc-400 text-base leading-relaxed whitespace-pre-line">
              {job.description || "No description provided."}
            </Card.Description>
          </div>

          {/* Requirements Section */}
          {job.requirements && (
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-white">Requirements</h3>
              <p className="text-zinc-400 text-base leading-relaxed whitespace-pre-line">
                {job.requirements}
              </p>
            </div>
          )}

          {/* Footer Action Section */}
          <Card.Footer className="p-0 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-xs text-zinc-600">
              Company ID: {job.companyId}
            </div>

            <Link
              href={`/allJobs/${id}/apply`}
              className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-medium text-center transition-colors shadow-lg"
            >
              Apply For This Job
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
