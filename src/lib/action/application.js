'use server'

import { createPost } from "../core/postApi"

export const postApplication = async(postData)=>{
    return await createPost('/api/applications', postData)
}