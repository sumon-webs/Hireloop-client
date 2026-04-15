import JobApplyForm from "@/components/JobApplyForm";
import { getApplications } from "@/lib/api/applications";
import { redirect } from "next/navigation";
import Link from "next/link";
import { userSession } from "@/lib/core/session";
import { getPlans } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await userSession();

  // ১. ইউজার লগইন না থাকলে সাইন-ইন পেজে রিডাইরেক্ট
  if (!user) {
    redirect(`/sign-in?redirect=/allJobs/${id}/apply`);
  }

  // ২. রোল চেক: ইউজার যদি 'seeker' না হয়, তবে তাকে অ্যাক্সেস দেওয়া হবে না
  if (user.role !== "seeker") {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-white">
        <h1 className="text-2xl font-bold text-red-400">Access Denied</h1>
        <p className="mt-2 text-slate-300">
          Only job seekers are allowed to apply for jobs.
        </p>
        <Link
          href="/allJobs"
          className="mt-6 inline-block bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-6 rounded-lg border border-zinc-700 transition-colors"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  const plan = await getPlans(user?.plan);
  const seekerId = user.id;
  console.log(user?.plan)
console.log(plan)
  // ৩. ইউজারের বর্তমান অ্যাপ্লিকেশন সংখ্যা ফেচ করা
  const applications = await getApplications(seekerId);

  // ৪. লিমিট চেক (৩টি বা তার বেশি হলে রেস্ট্রিক্ট করবে)
  if (applications && applications.length >= plan.MaxApplicationPerMonth) {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-white">
        <h1 className="text-2xl font-bold text-amber-400">
          Application Limit Reached
        </h1>
        <p className="mt-2 text-slate-300">
          You have already submitted 3 applications. Please upgrade your plan to
          apply for more jobs.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Get Plan
        </Link>
      </div>
    );
  }

  // ৫. সব ঠিক থাকলে ফর্ম রেন্ডার করা
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="border-b border-zinc-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Job Application</h1>
        <p className="text-sm text-zinc-400 mt-2">
          You have applied{" "}
          <span className="text-blue-400 font-semibold">
            {applications.length}
          </span>{" "}
          of <span className="text-zinc-300 font-semibold">{plan.MaxApplicationPerMonth}</span> available
          slots
        </p>
      </div>

      <JobApplyForm  jobId={id} user={user} />
    </div>
  );
};

export default ApplyPage;
