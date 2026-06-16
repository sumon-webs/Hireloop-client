import CompanyTable from "@/components/dashboard/admin/CompanyTable";
import { getCompanies } from "@/lib/api/company";

const CompaniesPage = async () => {
  const companies = await getCompanies();

  

  return (
    <div className="p-8  mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Companies Overview</h1>
        <p className="text-neutral-500 text-sm">Manage and approve registered companies.</p>
      </div>
      
      <CompanyTable 
        companies={companies} 
      />
    </div>
  );
};

export default CompaniesPage;