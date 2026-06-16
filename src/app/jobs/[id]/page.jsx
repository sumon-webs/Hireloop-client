import React from 'react';
import { getJobDetials } from '@/lib/api/jobs';
import JobDetails from '@/components/JobDetailsCard';

const JobsDetailPage = async ({ params }) => {
    // Next.js-এর নিয়ম অনুযায়ী params অ্যাওয়েট (await) করে আইডি বের করা হচ্ছে
    const { id } = await params;

    // এপিআই থেকে নির্দিষ্ট জবের ডিটেইলস ডাটা ফেচ করা হচ্ছে
    const job = await getJobDetials(id);
    
    // আপনার বোঝার সুবিধার্থে সার্ভার কনসোলে ডাটা লগ হবে
    console.log("Fetched Job Data:", job);

    return (
        <main className="bg-black min-h-screen">
            {/* ফেচ করা 'job' ডাটাটি প্রপস আকারে চাইল্ড কম্পোনেন্টে পাস করা হচ্ছে */}
            <JobDetails job={job} />
        </main>
    );
};

export default JobsDetailPage;