"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/app", label: "AI Trainer" },
        { href: "/tracker", label: "Tracker" },
        { href: "/about", label: "About" },
    ];

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-2xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg px-6 py-3">
            <div className="flex items-center justify-between gap-8">
                <Link href="/" className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:opacity-80 transition-opacity whitespace-nowrap">
                    AIthlete
                </Link>

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

                {/* Mobile Menu / Actions */}
                <div className="flex items-center gap-4">
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
                    {/* <ModeToggle /> */}
                </div>
            </div>
        </nav>
    );
}
