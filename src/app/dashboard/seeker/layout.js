import {  checkRole } from "@/lib/core/session";

const recruiterLayout = async ({ children }) => {
  await checkRole('seeker')

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default recruiterLayout;
