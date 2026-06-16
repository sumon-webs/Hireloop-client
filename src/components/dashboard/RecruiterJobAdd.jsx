"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Fieldset, TextField, Label, Input, TextArea 
} from "@heroui/react";
import { 
  X, CheckCircle, AlertCircle, Clock 
} from "lucide-react";
import { postJobs } from "@/lib/action/job";

export default function RecruiterJobAdd({ company }) {
  const router = useRouter();
  
  // 1. Loading and Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    jobType: "Full-time",
    location: "",
    salary: "",
    experience: "Entry Level",
    vacancies: "",
    description: "",
    requirements: "",
    companyName: company?.companyName || ""
  });

  const isRemote = formData.jobType === "Remote";

  // 2. Pending Status Check (Professional Protection)
  if (company?.status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-4xl p-12 mx-auto rounded-3xl border border-neutral-800 bg-[#121214] text-center shadow-2xl">
        <div className="p-4 rounded-full bg-amber-500/10 mb-4">
          <Clock className="text-amber-500" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-white">Approval Pending</h2>
        <p className="mt-2 text-neutral-400 max-w-md">
          Your company profile is currently under review by our team. 
          You will be able to post jobs once your company is verified.
        </p>
      </div>
    );
  }

  // 3. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Simple Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await postJobs({ ...formData, status: "active", companyId: company._id });
      setSuccessMsg("Job posted successfully!");
      setTimeout(() => router.push("/dashboard/recruiter/job"), 1500);
    } catch (err) {
      setErrors({ form: "Failed to post job. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-neutral-800 bg-[#121214] text-neutral-200 shadow-2xl overflow-hidden">
      <div className="flex items-start justify-between p-6 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-semibold text-white">Create New Job Opening</h2>
          <p className="mt-1 text-xs text-neutral-500">Professional job posting interface</p>
        </div>
        <button onClick={() => router.back()} className="text-neutral-500 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {successMsg && (
          <div className="flex items-center gap-2 p-3 text-xs text-emerald-400 bg-emerald-950/40 rounded-xl border border-emerald-800/50">
            <CheckCircle size={16} /> {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField className="flex flex-col gap-1.5">
            <Label className="text-xs text-neutral-400">Company Name</Label>
            <Input name="companyName" value={formData.companyName} onChange={handleChange} readOnly className="opacity-60" />
          </TextField>

          <TextField className="flex flex-col gap-1.5">
            <Label className="text-xs text-neutral-400">Job Title</Label>
            <Input name="title" value={formData.title} onChange={handleChange} required />
          </TextField>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-neutral-400">Job Type</label>
            <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full rounded-xl border border-neutral-800 bg-[#1c1c1f] px-3 py-2.5 text-sm">
              {["Full-time", "Part-time", "Remote", "Hybrid", "Contract", "Internship"].map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <TextField className="flex flex-col gap-1.5">
            <Label className="text-xs text-neutral-400">Salary</Label>
            <Input name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. 20k - 40k" />
          </TextField>
        </div>

        <TextArea name="description" label="Description" value={formData.description} onChange={handleChange} rows={4} placeholder="Detailed job description..." />

        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 text-xs border rounded-xl hover:bg-neutral-800">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-xs font-semibold text-black bg-white rounded-xl hover:bg-neutral-200 disabled:opacity-50">
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </button>
        </div>
      </form>
    </div>
  );
}