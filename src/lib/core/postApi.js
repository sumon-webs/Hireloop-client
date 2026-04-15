"use server";

const uri = process.env.NEXT_PUBLIC_URI;

export const createPost = async (path,postData) => {
  console.log("Hit", postData)
  try {
    const res = await fetch(`${uri}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("getJobs error:", error);
    return { success: false, message: error.message };
  }
};