"use client";

import React, { useState } from "react";
import { Card, TextField, Label, Input, Select, ListBox } from "@heroui/react";
import {
  X,
  MapPin,
  Upload,
  ChevronDown,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { postCompnay } from "@/lib/action/compnanys";
import { useRouter } from "next/navigation";

export default function RegisterCompanyForm({company, recruiterId }) {
  const router = useRouter()
  // Form input states
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "technology",
    websiteUrl: "",
    location: "",
    employeeCount: "1-10",
    description: "",
    logoUrl: "", // Stores the hosted Imgbb URL string
  });

  // UI feedback states
  const [logoUploading, setLogoUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: "success" | "error", text: string }
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic handler for regular text input and textarea changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for HeroUI dropdown selections
  const handleSelectChange = (key, name) => {
    setFormData((prev) => ({ ...prev, [name]: key }));
  };

  // Image upload handler using Imgbb API
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Restrict file size locally to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({
        type: "error",
        text: "Image is too large. Max size allowed is 5MB.",
      });
      return;
    }

    setLogoUploading(true);
    setStatusMessage(null);

    const uploadPayload = new FormData();
    uploadPayload.append("image", file);

    try {
      // Replace 'YOUR_IMGBB_API_KEY_HERE' with your actual token from imgbb.com
      const IMGBB_API_KEY = "d594d0c9bfdf17d819730deeb1b08f55";
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: uploadPayload,
        },
      );

      const data = await response.json();

      if (data.success) {
        const directUrl = data.data.url;
        setFormData((prev) => ({ ...prev, logoUrl: directUrl }));
        setStatusMessage({
          type: "success",
          text: "Logo uploaded successfully!",
        });
      } else {
        throw new Error(data.error?.message || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Imgbb Upload Error:", error);
      setStatusMessage({
        type: "error",
        text: error.message || "Something went wrong uploading the image.",
      });
    } finally {
      setLogoUploading(false);
    }
  };

  // Form submission handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    // Basic required field verification
    if (!formData.companyName || !formData.location) {
      setStatusMessage({
        type: "error",
        text: "Please complete required fields (Company Name & Location).",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Compiled JSON payload log
      const companyData = {
        ...formData,
        recruiterId: recruiterId,
        status:company && company.status ? company.status : 'pending'
      };
      const data = await postCompnay(companyData);
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if(data.acknowledged){
        setStatusMessage({
        type: "success",
        text: "Company register successfull",
        
      });
      router.push("/dashboard/recruiter/profile")
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatusMessage({
        type: "error",
        text: "Failed to submit registration. Try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-xl p-6 relative">
        {/* Header Section */}
        <button
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-200 transition-colors"
          aria-label="Close modal"
          type="button"
        >
          <X className="size-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Register New Company
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Enter your business details to start hiring on HireLoop.
          </p>
        </div>

        {/* Status Alerts */}
        {statusMessage && (
          <div
            className={`mb-6 flex items-start gap-3 p-4 rounded-lg border text-sm ${
              statusMessage.type === "success"
                ? "bg-emerald-950/30 border-emerald-800 text-emerald-400"
                : "bg-rose-950/30 border-rose-800 text-rose-400"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="size-5 shrink-0" />
            ) : (
              <AlertCircle className="size-5 shrink-0" />
            )}
            <div>{statusMessage.text}</div>
          </div>
        )}

        <hr className="border-zinc-800 mb-6" />

        {/* Form Body */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Row 1: Company Name & Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField className="w-full">
              <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">
                Company Name
              </Label>
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Acme Corp"
                className="bg-zinc-800/50 border border-zinc-700/60 text-zinc-200 placeholder-zinc-600 rounded-lg focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 w-full px-3 py-2 text-sm"
                required
              />
            </TextField>

            <Select
              className="w-full"
              placeholder="Select one"
              selectedKey={formData.industry}
              onSelectionChange={(key) => handleSelectChange(key, "industry")}
            >
              <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">
                Industry / Category
              </Label>
              <Select.Trigger className="bg-zinc-800/50 border border-zinc-700/60 text-zinc-200 rounded-lg px-3 py-2 text-sm flex items-center justify-between w-full">
                <Select.Value />
                <ChevronDown className="size-4 text-zinc-400" />
              </Select.Trigger>
              <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl text-zinc-200 mt-1">
                <ListBox>
                  <ListBox.Item
                    id="technology"
                    textValue="Technology"
                    className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm"
                  >
                    Technology
                  </ListBox.Item>
                  <ListBox.Item
                    id="finance"
                    textValue="Finance"
                    className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm"
                  >
                    Finance
                  </ListBox.Item>
                  <ListBox.Item
                    id="healthcare"
                    textValue="Healthcare"
                    className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm"
                  >
                    Healthcare
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Row 2: Website URL & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField className="w-full">
              <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">
                Website URL
              </Label>
              <div className="flex rounded-lg overflow-hidden border border-zinc-700/60 bg-zinc-800/50 focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500">
                <span className="bg-zinc-800 text-zinc-400 px-3 py-2 text-sm select-none border-r border-zinc-700/60 flex items-center">
                  https://
                </span>
                <Input
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="www.company.com"
                  className="bg-transparent text-zinc-200 placeholder-zinc-600 w-full px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </TextField>

            <TextField className="w-full">
              <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">
                Location
              </Label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 size-4 text-zinc-400" />
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="bg-zinc-800/50 border border-zinc-700/60 text-zinc-200 placeholder-zinc-600 rounded-lg focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 w-full pl-9 pr-3 py-2 text-sm"
                  required
                />
              </div>
            </TextField>
          </div>

          {/* Row 3: Employee Count Range & Logo Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              className="w-full"
              placeholder="Select scale"
              selectedKey={formData.employeeCount}
              onSelectionChange={(key) =>
                handleSelectChange(key, "employeeCount")
              }
            >
              <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">
                Employee Count Range
              </Label>
              <Select.Trigger className="bg-zinc-800/50 border border-zinc-700/60 text-zinc-200 rounded-lg px-3 py-2 text-sm flex items-center justify-between w-full">
                <Select.Value />
                <ChevronDown className="size-4 text-zinc-400" />
              </Select.Trigger>
              <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl text-zinc-200 mt-1">
                <ListBox>
                  <ListBox.Item
                    id="1-10"
                    textValue="1-10 employees"
                    className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm"
                  >
                    1-10 employees
                  </ListBox.Item>
                  <ListBox.Item
                    id="11-50"
                    textValue="11-50 employees"
                    className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm"
                  >
                    11-50 employees
                  </ListBox.Item>
                  <ListBox.Item
                    id="51-200"
                    textValue="51-200 employees"
                    className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm"
                  >
                    51-200 employees
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <div>
              <span className="text-zinc-300 font-medium text-sm mb-1.5 block">
                Company Logo
              </span>
              <label className="flex items-center gap-3 bg-transparent border border-dashed border-zinc-700 rounded-lg p-2.5 cursor-pointer hover:border-zinc-500 transition-colors group">
                <div className="bg-zinc-800 text-zinc-400 group-hover:text-zinc-200 p-2 rounded-md border border-zinc-700 flex items-center justify-center">
                  {logoUploading ? (
                    <Loader2 className="size-4 animate-spin text-zinc-400" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                </div>
                <div className="flex flex-col text-left truncate">
                  <span className="text-xs font-medium text-zinc-300">
                    {logoUploading
                      ? "Uploading to Imgbb..."
                      : formData.logoUrl
                        ? "Image Loaded Successfully"
                        : "Upload image"}
                  </span>
                  <span className="text-[10px] text-zinc-500 truncate max-w-[200px]">
                    {formData.logoUrl ? formData.logoUrl : "PNG, JPG up to 5MB"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleLogoUpload}
                  disabled={logoUploading}
                />
              </label>
            </div>
          </div>

          {/* Row 4: Brief Description */}
          <TextField className="w-full">
            <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">
              Brief Description
            </Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about your company's mission and culture..."
              className="bg-zinc-800/50 border border-zinc-700/60 text-zinc-200 placeholder-zinc-600 rounded-lg focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 w-full p-3 text-sm resize-none focus:outline-none"
            />
          </TextField>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800/40 border border-zinc-800 hover:bg-zinc-800 hover:text-white rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || logoUploading}
              className="px-4 py-2 text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Register Company
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
