export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 border-t border-gray-800">
            <div className="container mx-auto px-6 py-12">

                {/* Top */}
                <div className="grid md:grid-cols-4 gap-8">

                    {/* Logo */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            <span className="text-blue-500">hire</span>
                            <span className="text-orange-500">lop</span>
                        </h2>

                        <p className="mt-4 text-sm text-gray-500">
                            The AI-native career platform. Built for people who
                            take their work seriously.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Product
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <a href="#">Job Discovery</a>
                            </li>
                            <li>
                                <a href="#">Worker AI</a>
                            </li>
                            <li>
                                <a href="#">Companies</a>
                            </li>
                            <li>
                                <a href="#">Salary Data</a>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Navigation
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <a href="#">Help Center</a>
                            </li>
                            <li>
                                <a href="#">Career Library</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Resources
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <a href="#">Brand Guideline</a>
                            </li>
                            <li>
                                <a href="#">Newsroom</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-sm">
                        © 2026 Programming Hero. All rights reserved.
                    </p>

                    <div className="flex gap-4 text-sm">
                        <a href="#">Terms & Policy</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}