import Link from 'next/link';
import { AlertCircle } from 'lucide-react'; // Optional: Use an icon from your icon library

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      
      <h2 className="text-3xl font-bold  mb-4">Access Denied</h2>
      <p className="text-lg text-gray-400 mb-8 max-w-md">
        You do not have the necessary permissions to view this page. 
        Please check your account settings or contact an administrator if you believe this is an error.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Return Home
        </Link>
        <Link 
          href="/sign-in"
          className="px-6 py-3 border border-gray-300 text-gray-300 rounded-lg  transition-colors font-medium"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}