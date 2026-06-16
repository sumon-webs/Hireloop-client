import JobSection from "@/components/home/JobSecion";
import { getJobs } from "@/lib/api/jobs";

const JobsPage = async () => {
  const jobs = await getJobs();
  return (
    <div>
      <JobSection jobs={jobs} />
    </div>
  );
};

export default JobsPage;
