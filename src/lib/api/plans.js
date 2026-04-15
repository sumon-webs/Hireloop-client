const uri = process.env.NEXT_PUBLIC_URI;

export const getPlans = async (planId) => {
  const res = await fetch(
    `${uri}/api/plans?planId=${planId}`,
    { cache: "no-store" }
  );

  return res.json();
};