import React from "react";
import { getJobs } from "@/lib/api/jobs";
import JobsTable from "@/components/dashboard/JobTable";
import { getCompnay } from "@/lib/api/company"; // আপনার ফাইলের বানান অনুযায়ী রাখলাম
import { session } from "@/lib/core/session";

const JobsPage = async () => {
  const user = await session();
  const id = user?.id;
  
  // কোম্পানির ডেটা নিয়ে আসা হচ্ছে
  const companies = await getCompnay(id);
  
  // কোম্পানিজ যদি অ্যারে হয়, তবে প্রথম কোম্পানির আইডি নেওয়া হচ্ছে (fallback হিসেবে null)
  const companyId = companies && companies.length > 0 ? companies[0]._id : null;

  // শুধু তখনই জব ফেচ হবে যদি বৈধ কোম্পানি আইডি পাওয়া যায়
  let jobs = [];
  if (companyId) {
    jobs = await getJobs(companyId);
  }

  return (
    <div className="p-6 mx-auto text-white bg-black min-h-screen"> 
      {/* আপনার ডার্ক মুডের সাথে সামঞ্জস্য রাখতে টেক্সট ও ব্যাকগ্রাউন্ড কালার যোগ করা হয়েছে */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Job Postings</h1>
        <p className="text-sm text-zinc-500">
          Manage and view all job positions listed for your company.
        </p>
      </div>

      {/* HeroUI টেবিল কম্পোনেন্টে জবের ডেটা পাস করা হচ্ছে */}
      <JobsTable jobs={jobs} />
    </div>
  );
};

export default JobsPage;