'use server'

const uri = process.env.NEXT_PUBLIC_URI;

export const getCompnay = async (recruiterId) => {
  try {
    const res = await fetch(`${uri}/api/my/company?recruiterId=${recruiterId}`, {
      cache: "no-store",
    });

    // যদি রেসপন্স ওকে না হয়, তবে এরর থ্রো করুন
    if (!res.ok) {
      console.error("API Error Status:", res.status);
      return null; 
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to parse JSON or fetch error:", error);
    return null; // এরর হলে null রিটার্ন করুন যাতে UI ভেঙে না যায়
  }
};

export const getCompanies = async () => {
  try {
    const res = await fetch(`${uri}/api/companies`, {
      cache: "no-store",
    });

    // যদি রেসপন্স ওকে না হয়, তবে এরর থ্রো করুন
    if (!res.ok) {
      console.error("API Error Status:", res.status);
      return null; 
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to parse JSON or fetch error:", error);
    return null; // এরর হলে null রিটার্ন করুন যাতে UI ভেঙে না যায়
  }
};