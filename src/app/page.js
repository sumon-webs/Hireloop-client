// app/page.js
import Hero from "@/components/home/Hero";
import JobSecion from "@/components/home/JobSecion";
import StatsSection from "@/components/home/Stats";
import { getJobs } from "@/lib/api/jobs";

export default async function Home() {
  // এখানে আপনার কাঙ্খিত কোম্পানির ID পাস করুন
  const jobs = await getJobs();
  
  
  return (
    <div>
      <Hero />
      <StatsSection/>
      <JobSecion jobs={jobs}/>
    </div>
  );
}