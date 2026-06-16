import RegisterCompanyForm from "@/components/dashboard/CompanyAddForm";
import CompanyCard from "@/components/dashboard/CompnayCard";
import { getCompnay } from "@/lib/api/company";
import { userSession } from "@/lib/core/session";

const ProfilePage = async () => {
  const user = await userSession();
  const recruiterId = user?.id;
  
  // Fetch company
  const company = await getCompnay(recruiterId);
  console.log(company);

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[80vh]">
      {/* 1. If company exists, show the card. Otherwise, show the registration form. */}
      {company ? (
        <CompanyCard company={company} />
      ) : (
        <div className="text-center">
          <p className="text-xl pb-4">
            You haven't registered any company yet. Please register a company.
          </p>
          <RegisterCompanyForm company={company} recruiterId={recruiterId} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;