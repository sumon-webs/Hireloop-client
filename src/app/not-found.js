import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-4xl font-bold  mb-4">404 - Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been 
        removed, renamed, or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Return Home
      </Link>
    </div>
  );
}