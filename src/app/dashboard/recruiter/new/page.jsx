import RecruiterJobAdd from "@/components/dashboard/RecruiterJobAdd"
import { getCompnay } from "@/lib/api/company"
import { userSession } from "@/lib/core/session"


const RecruiterNewJobPage = async() => {
  const user = await userSession()
  const id = user?.id
  const copmanys= await getCompnay(id)
  return (
    <div>
        {
          copmanys.map(company =><RecruiterJobAdd company={company}/>)
        }
    </div>
  )
}

export default RecruiterNewJobPage
