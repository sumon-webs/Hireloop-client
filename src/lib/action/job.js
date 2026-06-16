"use server";

const uri = process.env.NEXT_PUBLIC_URI;

export const postJobs = async (jobData) => {
  try {
    const res = await fetch(`${uri}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
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