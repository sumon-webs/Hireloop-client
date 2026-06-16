"use client";

import React, { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import { postApplication } from "@/lib/action/application";
import { useRouter } from "next/navigation";

const JobApplyForm = ({ job, user }) => {
  const router = useRouter();
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", type: "" });

    const formData = new FormData(e.target);
    const applyData = Object.fromEntries(formData);
    const applicationData = {
      ...applyData,
      seekerId: user.id,
      jobId: job?._id,
      compnayName: job?.companyName,
      jobTitle: job?.title,
      jobType: job?.jobType,
    };
    
    try {
      const data = await postApplication(applicationData);
      if (data?.acknowledged) {
        setStatus({
          loading: false,
          message: "Application submitted successfully!",
          type: "success",
        });
        alert("Application submitted successfully!");
        router.refresh();
      } else {
        throw new Error(data?.error || "Failed to submit application");
      }
    } catch (err) {
      setStatus({
        loading: false,
        message: err.message || "Something went wrong.",
        type: "error",
      });
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <div className="p-6">
        {status.type === "error" && (
          <div className="mb-4 p-3 bg-danger-50 text-danger text-sm rounded-lg border border-danger-200">
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Changed 'isRequired' to 'isRequired={true}' or ensured component support */}
          <Input
            isRequired={true}
            label="Full Name"
            name="fullName"
            placeholder="Enter your name"
            defaultValue={user.name || ""}
          />

          <Input
            isRequired={true}
            type="email"
            label="Email"
            name="email"
            defaultValue={user.email || ""}
          />

          <Input
            isRequired={true}
            label="Portfolio URL"
            name="portfolio"
            placeholder="https://your-portfolio.com"
          />

          <Input
            isRequired={true}
            label="Resume Link"
            name="resume"
            placeholder="https://your-resume-link.com"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-default-700">
              Cover Letter
            </label>
            <textarea
              required
              name="coverLetter"
              placeholder="Tell us why you are a great fit..."
              className="w-full min-h-[120px] rounded-lg border-2 border-default-200 bg-default-100 p-3 outline-none focus:border-primary transition-colors"
            />
          </div>

          <Button 
            type="submit" 
            color="primary" 
            className="mt-2"
            isLoading={status.loading}
          >
            Submit Application
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default JobApplyForm;