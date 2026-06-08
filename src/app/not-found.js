import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-bold text-white">404</h1>

                <h2 className="mt-4 text-3xl font-semibold text-white">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-400">
                    Sorry, the page you are looking for doesn't exist or has
                    been moved.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
