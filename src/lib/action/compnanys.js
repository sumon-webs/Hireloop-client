"use server";

const uri = process.env.NEXT_PUBLIC_URI;

export const postCompnay = async (compnayData) => {
  try {
    const res = await fetch(`${uri}/api/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compnayData),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getJobs error:", error);
    return { success: false, message: error.message };
  }
};