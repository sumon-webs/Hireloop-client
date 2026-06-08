"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Bars } from "@gravity-ui/icons";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Browse Jobs", href: "/jobs" },
        { name: "Company", href: "/company" },
        { name: "Pricing", href: "/pricing" },
    ];

    return (
        <header className="w-full px-4 py-6">
            <nav className="mx-auto container">
                <div className="flex items-center justify-between rounded-3xl border border-white/10  px-6 py-4 backdrop-blur-xl">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <h1 className="text-3xl font-extrabold">
                            <span className="text-sky-500">hire</span>
                            <span className="text-orange-500">loop</span>
                        </h1>
                    </Link>

                    {/* Desktop Right Side */}
                    <div className="hidden items-center gap-4 md:flex">

                        {/* Nav Links Pill */}
                        <div className="flex items-center gap-8 rounded-2xl border border-white/5 bg-[#0F0F0F] px-8 py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-gray-300 transition hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Sign In Pill */}
                        <Link
                            href="/signin"
                            className="rounded-2xl border border-white/5 bg-[#0F0F0F] px-6 py-3 font-medium text-indigo-400 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition hover:text-indigo-300"
                        >
                            Sign In
                        </Link>

                        {/* CTA */}
                        <Button
                            radius="lg"
                            className="bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-6 font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.4)]"
                        >
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white md:hidden"
                    >
                        <Bars width={24} height={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mt-3 rounded-3xl border border-white/10 bg-[#151515]/95 p-5 backdrop-blur-xl md:hidden">
                        <div className="flex flex-col gap-4">

                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl bg-[#0F0F0F] px-4 py-3 text-gray-300"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <Link
                                href="/signin"
                                onClick={() => setIsOpen(false)}
                                className="rounded-xl bg-[#0F0F0F] px-4 py-3 text-indigo-400"
                            >
                                Sign In
                            </Link>

                            <Button
                                radius="lg"
                                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 py-6 font-semibold text-white"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}