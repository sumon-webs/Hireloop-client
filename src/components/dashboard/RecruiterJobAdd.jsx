"use client";

import React, { useState } from "react";
import { Fieldset, TextField, Label, Input, TextArea } from "@heroui/react";
import {
  X,
  MapPin,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Briefcase,
} from "lucide-react";

export default function RecruiterJobAdd() {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "Full-time",
    location: "",
    salary: "",
    experience: "Entry Level",
    vacancies: "",
    description: "",
    requirements: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const isRemote = formData.jobType === "Remote";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "jobType" && value === "Remote" ? { location: "" } : {}),
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMsg("");

    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";

    if (formData.jobType !== "Remote" && !formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.salary.trim()) newErrors.salary = "Salary range is required";

    if (!formData.vacancies.trim())
      newErrors.vacancies = "Vacancy count is required";

    if (!formData.description.trim())
      newErrors.description = "Job description is required";

    if (!formData.requirements.trim())
      newErrors.requirements = "Requirements are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    console.log(formData);
    setTimeout(() => {
      setSuccessMsg("Job posted successfully!");

      setFormData({
        title: "",
        jobType: "Full-time",
        location: "",
        salary: "",
        experience: "Entry Level",
        vacancies: "",
        description: "",
        requirements: "",
      });

      setErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-neutral-800 bg-[#121214] text-neutral-200 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Create New Job</h2>

          <p className="mt-1 text-xs text-neutral-500">
            Fill in the details below to publish a new job opening.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      <hr className="border-neutral-800" />

      {/* Alerts */}
      {successMsg && (
        <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-emerald-800/50 bg-emerald-950/40 p-3 text-xs text-emerald-400">
          <CheckCircle size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-rose-800/50 bg-rose-950/40 p-3 text-xs text-rose-400">
          <AlertCircle size={16} />
          <span>Please complete all required fields.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Fieldset className="p-6">
          <Fieldset.Group className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Job Title */}
            <TextField
              isInvalid={!!errors.title}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs text-neutral-400">Job Title</Label>

              <div className="flex items-center rounded-xl border border-neutral-800 bg-[#1c1c1f] px-3">
                <Briefcase size={16} className="mr-2 text-neutral-500" />

                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  className="w-full bg-transparent py-2.5"
                />
              </div>

              {errors.title && (
                <span className="pl-1 text-[11px] text-rose-400">
                  {errors.title}
                </span>
              )}
            </TextField>

            {/* Job Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400">Job Type</label>

              <div className="relative">
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-neutral-800 bg-[#1c1c1f] px-3 py-2.5 text-sm"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />
              </div>
            </div>

            {/* Location */}
            <TextField
              isInvalid={!!errors.location}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs text-neutral-400">Location</Label>

              <div
                className={`flex items-center rounded-xl border px-3 ${
                  isRemote
                    ? "border-neutral-900 bg-neutral-900 opacity-60"
                    : "border-neutral-800 bg-[#1c1c1f]"
                }`}
              >
                <MapPin size={16} className="mr-2 text-neutral-500" />

                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={isRemote}
                  placeholder={
                    isRemote
                      ? "Location not required for remote jobs"
                      : "Dhaka, Bangladesh"
                  }
                  className="w-full bg-transparent py-2.5"
                />
              </div>

              {!isRemote && errors.location && (
                <span className="pl-1 text-[11px] text-rose-400">
                  {errors.location}
                </span>
              )}
            </TextField>

            {/* Salary */}
            <TextField
              isInvalid={!!errors.salary}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs text-neutral-400">Salary Range</Label>

              <Input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="$800 - $1200"
                className="rounded-xl border border-neutral-800 bg-[#1c1c1f]"
              />

              {errors.salary && (
                <span className="pl-1 text-[11px] text-rose-400">
                  {errors.salary}
                </span>
              )}
            </TextField>

            {/* Experience */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400">
                Experience Level
              </label>

              <div className="relative">
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-neutral-800 bg-[#1c1c1f] px-3 py-2.5 text-sm"
                >
                  <option>Entry Level</option>
                  <option>Junior</option>
                  <option>Mid Level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />
              </div>
            </div>

            {/* Vacancies */}
            <TextField
              isInvalid={!!errors.vacancies}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs text-neutral-400">Vacancies</Label>

              <Input
                type="number"
                min="1"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleChange}
                placeholder="5"
                className="rounded-xl border border-neutral-800 bg-[#1c1c1f]"
              />

              {errors.vacancies && (
                <span className="pl-1 text-[11px] text-rose-400">
                  {errors.vacancies}
                </span>
              )}
            </TextField>
          </Fieldset.Group>

          {/* Job Description */}
          <div className="mt-6">
            <TextField
              isInvalid={!!errors.description}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs text-neutral-400">
                Job Description
              </Label>

              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe responsibilities, duties, and expectations..."
                className="rounded-xl border border-neutral-800 bg-[#1c1c1f]"
              />

              {errors.description && (
                <span className="pl-1 text-[11px] text-rose-400">
                  {errors.description}
                </span>
              )}
            </TextField>
          </div>

          {/* Requirements */}
          <div className="mt-5">
            <TextField
              isInvalid={!!errors.requirements}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs text-neutral-400">Requirements</Label>

              <TextArea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={5}
                placeholder="Required skills, experience, and qualifications..."
                className="rounded-xl border border-neutral-800 bg-[#1c1c1f]"
              />

              {errors.requirements && (
                <span className="pl-1 text-[11px] text-rose-400">
                  {errors.requirements}
                </span>
              )}
            </TextField>
          </div>
        </Fieldset>

        {/* Footer */}
        <hr className="border-neutral-800" />

        <Fieldset.Actions className="flex justify-end gap-3 bg-[#141416] p-4">
          <button
            type="button"
            className="rounded-xl border border-neutral-800 px-4 py-2 text-xs font-medium text-neutral-300 transition hover:bg-neutral-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-neutral-200 disabled:bg-neutral-600 disabled:text-neutral-400"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </button>
        </Fieldset.Actions>
      </form>
    </div>
  );
}
