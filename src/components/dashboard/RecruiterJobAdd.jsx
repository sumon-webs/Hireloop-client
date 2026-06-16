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
import { postJobs } from "@/lib/action/job";
import { useRouter } from "next/navigation";

export default function RecruiterJobAdd({company}) {
  const router = useRouter();
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

  const handleSubmit = async (e) => {
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

    // ✅ এখানে default fields add করা হলো
    const payload = {
      ...formData,
      status: "active",
      companyId: company._id,
    };

    await postJobs(payload);

    setTimeout(() => {
      setSuccessMsg("Job posted successfully!");
      router.push("/dashboard/recruiter/job");
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

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <Fieldset className="p-6">
          <Fieldset.Group className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TextField className="flex flex-col gap-1.5">
              <Label className="text-xs text-neutral-400">Job Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </TextField>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-800 bg-[#1c1c1f] px-3 py-2.5 text-sm"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <TextField className="flex flex-col gap-1.5">
              <Label className="text-xs text-neutral-400">Location</Label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isRemote}
                placeholder={isRemote ? "Not required" : "Dhaka, Bangladesh"}
              />
            </TextField>

            <TextField className="flex flex-col gap-1.5">
              <Label className="text-xs text-neutral-400">Salary</Label>
              <Input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </TextField>

            <TextField className="flex flex-col gap-1.5">
              <Label className="text-xs text-neutral-400">Vacancies</Label>
              <Input
                type="number"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleChange}
              />
            </TextField>
          </Fieldset.Group>

          <TextArea
            className="mt-5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Job description..."
          />

          <TextArea
            className="mt-5"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={4}
            placeholder="Requirements..."
          />
        </Fieldset>

        {/* FOOTER */}
        <Fieldset.Actions className="flex justify-end gap-3 p-4">
          <button type="button" className="rounded-xl border px-4 py-2 text-xs">
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </button>
        </Fieldset.Actions>
      </form>
    </div>
  );
}
