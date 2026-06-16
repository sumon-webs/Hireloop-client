'use server'

import { revalidatePath } from "next/cache";
import { createPost } from "../core/postApi";

export const updateAproval = async (id, postData) => {
  const result = await createPost(
    `/api/companies/${id}`,
    postData,
    "PATCH"
  );
if(result.modifiedCount>0){
    revalidatePath('/dashboard/admin/companies')
}
  return result;
};