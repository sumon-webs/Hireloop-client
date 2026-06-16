'use server'

const uri = process.env.NEXT_PUBLIC_URI;
export const getCompnay = async(recruiterId)=>{
     const res = await fetch(
    `${uri}/api/companies?recruiterId=${recruiterId}`,
    { cache: "no-store" },
  );
  const data = await res.json();
  return data;
}

