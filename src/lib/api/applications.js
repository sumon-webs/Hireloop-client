'use server'

const uri = process.env.NEXT_PUBLIC_URI;

export const getApplications = async (seekerId = '', jobId = '') => {
  try {
    // URL কনস্ট্রাক্ট করা
    const url = `${uri}/api/applications?seekerId=${seekerId}&jobId=${jobId}`;
    
    const res = await fetch(url, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return []; // এরর হলে খালি লিস্ট রিটার্ন করুন
    }

    const data = await res.json();
    return data || []; // ডেটা না থাকলে খালি অ্যারে
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // ক্র্যাশ এড়াতে খালি লিস্ট
  }
}