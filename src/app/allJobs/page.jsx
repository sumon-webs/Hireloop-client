import JobSection from '@/components/home/JobSecion'
import { getJobs } from '@/lib/api/jobs'
import React from 'react'

const JobsPage = async() => {
  const jobs = await getJobs()
  return (
    <div>
      <JobSection jobs={jobs}/>
    </div>
  )
}

export default JobsPage
