'use server'

import { createPost } from "../core/postApi"


export const postSubscription = async(postData)=>{
    return await createPost('/api/subscriptions', postData)
}