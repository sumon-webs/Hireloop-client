import JobDetails from "@/components/JobDetailsCard"
import { getJobDetials } from "@/lib/api/jobs"


const JobDetailsPage = async({params}) => {
const {id} = await params
const job = await getJobDetials(id)
  return (
    <div>
      <JobDetails id={id} job={job}/>
    </div>
  )
}

export default JobDetailsPage
