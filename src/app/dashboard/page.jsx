import { StatCard } from "@/components/dashboard/statsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  FileText,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";

const RecruiterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const statsData = [
    {
      label: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      label: "Total Applicants",
      value: "1,284",
      icon: Users,
    },
    {
      label: "Active Jobs",
      value: "18",
      icon: Zap,
    },
    {
      label: "Jobs Closed",
      value: "32",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-2 text-default-500">
          Here's an overview of your hiring activity.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default RecruiterPage;