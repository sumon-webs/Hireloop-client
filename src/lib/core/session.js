import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const userSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;
  return user;
};

export const checkRole = async (role) => {
  const user = await userSession();

  if (user?.role !== role) {
    redirect("/unauthorized");
  }
};
