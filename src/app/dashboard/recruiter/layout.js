import { userSession, require, checkRole } from "@/lib/core/session";

const recruiterLayout = async ({ children }) => {
  const user = await userSession();
  await checkRole('recruiter')

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default recruiterLayout;
