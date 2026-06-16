// lib/api/jobs.js
const uri = process.env.NEXT_PUBLIC_URI;

export const getJobs = async (companyId, status = "active") => {
  // যদি companyId থাকে তবেই কোয়েরি স্ট্রিং তৈরি হবে, নাহলে খালি থাকবে
  const companyQuery = companyId ? `companyId=${companyId}&` : "";
  
  const res = await fetch(
    `${uri}/api/jobs?${companyQuery}status=${status}`,
    { cache: "no-store" }
  );
  
  const data = await res.json();
  return data;
};

export const getJobDetials= async(id)=>{
     const res = await fetch(
    `${uri}/api/jobs/${id}`,
    { cache: "no-store" },
  );
  const data = await res.json();
  return data;
}