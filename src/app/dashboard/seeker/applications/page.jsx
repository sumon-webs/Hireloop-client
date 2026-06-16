import ApplicationsTable from "@/components/dashboard/seeker/ApplicationsTable";
import { getApplications } from "@/lib/api/applications";
import { userSession } from "@/lib/core/session";

const ApplicationsPage = async () => {
  const user = await userSession();
  const applications = await getApplications(user?.id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default ApplicationsPage;