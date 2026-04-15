import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react' // Recommended icon library
import Link from 'next/link'
import { postSubscription } from '@/lib/action/subscription'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) throw new Error('Invalid session')

  const session = await stripe.checkout.sessions.retrieve(session_id)
  
  if (session.status === 'open') return redirect('/')
  if (session.status !== 'complete') return <div>Something went wrong.</div>

  const subsInfo ={
    planId : session.metadata?.planId,
    email:session.customer_details?.email
  }
  console.log(subsInfo)
  const data = await postSubscription(subsInfo)

  console.log(data)

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md w-full text-center space-y-6">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight ">
            Payment Successful!
          </h1>
          <p className="text-gray-300">
            Thank you for your subscription. Your account has been upgraded.
          </p>
        </div>

        {/* Details Box */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
          <p>
            A confirmation receipt has been sent to <strong>{session.customer_details.email}</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Link 
            href="/" 
            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Go to Home
          </Link>
          <p className="text-xs text-gray-400">
            Questions? Contact support at{' '}
            <a href="mailto:support@yourdomain.com" className="underline">support@yourdomain.com</a>
          </p>
        </div>
      </div>
    </main>
  )
}