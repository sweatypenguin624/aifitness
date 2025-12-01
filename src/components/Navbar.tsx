"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/app", label: "AI Trainer" },
        { href: "/tracker", label: "Tracker" },
        { href: "/about", label: "About" },
    ];

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <motion.div
                layout
                className={`w-full max-w-2xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-lg overflow-hidden ${isOpen ? 'rounded-3xl' : 'rounded-full'}`}
            >
                <div className="px-6 py-3 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:opacity-80 transition-opacity whitespace-nowrap">
                        AIthlete
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-purple-500 ${pathname === link.href
                                    ? "text-black dark:text-white"
                                    : "text-neutral-500 dark:text-neutral-400"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-purple-500 transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-1 text-neutral-600 dark:text-neutral-300 hover:text-purple-500 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden border-t border-neutral-200 dark:border-neutral-800"
                        >
                            <div className="px-6 py-4 flex flex-col gap-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-lg font-medium transition-colors hover:text-purple-500 ${pathname === link.href
                                            ? "text-black dark:text-white"
                                            : "text-neutral-500 dark:text-neutral-400"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                    <span className="text-sm text-neutral-500">Account</span>
                                    <div className="flex items-center gap-4">
                                        <SignedOut>
                                            <SignInButton mode="modal">
                                                <button className="text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
                                                    Sign In
                                                </button>
                                            </SignInButton>
                                        </SignedOut>
                                        <SignedIn>
                                            <UserButton afterSignOutUrl="/" />
                                        </SignedIn>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </nav>
    );
}
