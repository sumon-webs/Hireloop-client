
import RegisterCompanyForm from "@/components/dashboard/CompanyAddForm";
import CompanyCard from "@/components/dashboard/CompnayCard";
import { getCompnay } from "@/lib/api/company";
import { userSession } from "@/lib/core/session";

const ProfilePage = async () => {
  const recruiter = userSession();
  const recruiterId = recruiter?.id;
  
  // Fetch companies array
  const companys = await getCompnay(recruiterId);

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Check if companys array exists and has at least one company */}
      {companys && companys.length > 0 ? (
        <div>
          {
            companys.map(company=><CompanyCard company={company}/>)
          }
        </div>
      ) : (
        <RegisterCompanyForm recruiterId={recruiterId} />
      )}
    </div>
  );
};

export default ProfilePage;