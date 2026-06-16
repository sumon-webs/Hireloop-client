import RecruiterJobAdd from "@/components/dashboard/RecruiterJobAdd"
import { getCompnay } from "@/lib/api/company"
import { userSession } from "@/lib/core/session"


const RecruiterNewJobPage = async() => {
  const user = await userSession()
  const id = user?.id
  const copmany= await getCompnay(id)
  return (
    <div>
      <RecruiterJobAdd company={copmany}/>
    </div>
  )
}

export default RecruiterNewJobPage
