"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Code, Dumbbell, Coffee, Brain, Wallet, Clock } from "lucide-react";
import { useRef } from "react";

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main ref={containerRef} className="bg-white dark:bg-black text-black dark:text-white">
            {/* Navigation */}
            <Navbar />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-[65px] left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Chapter 1: The Intro */}
            <section className="min-h-screen flex items-center justify-center px-4 sticky top-0 bg-white dark:bg-black z-10">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                            <span className="text-6xl">👋</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-bold mb-6">
                            Hi, I'm <span className="gradient-text">Abhay</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            A robotics enthusiast and full-stack developer with a story to tell.
                        </p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="mt-12 text-neutral-400"
                        >
                            Scroll to see how it started ↓
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Chapter 2: The Gym Phase */}
            <section className="min-h-screen flex items-center justify-center px-4 relative z-20 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-6xl sm:text-8xl mb-6">💪</div>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                The <span className="text-purple-500">Gym Phase</span>
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                It all started when I hit the gym. I was pumping iron, feeling the burn, and looking in the mirror thinking...
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl shadow-xl border border-neutral-200 transform rotate-2"
                        >
                            <div className="text-center text-black">
                                <p className="text-2xl font-bold italic mb-4">"My mooscles are getting bigger!"</p>
                                <p className="text-sm text-neutral-500">- Me (probably), looking at a 1mm gain</p>
                                <div className="mt-4 flex justify-center gap-2">
                                    <img src="/mooscles.png" alt="Mooscles" className="w-64 h-auto rounded-lg mx-auto" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Chapter 3: The Struggle */}
            <section className="min-h-screen flex items-center justify-center px-4 relative z-20 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            But then... <span className="text-red-500">Reality Hit</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                        >
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400">
                                <Clock className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">No Time</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Between coding, robotics projects, and debugging infinite loops, who has time to research diet plans?
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                        >
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 dark:text-orange-400">
                                <Wallet className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">No Money</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Personal trainers and dieticians? In this economy? My wallet started crying just thinking about it. 💸
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Chapter 4: The Epiphany */}
            <section className="min-h-screen flex items-center justify-center px-4 relative z-20 bg-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Brain className="w-24 h-24 mx-auto mb-8 text-purple-500 animate-pulse" />
                        <h2 className="text-5xl sm:text-7xl font-bold mb-8">
                            "Fine, I'll do it myself."
                        </h2>
                        <p className="text-2xl text-neutral-300 max-w-2xl mx-auto">
                            I realized I had the power of code (and AI) on my side. Why pay for a coach when I can build one?
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Chapter 5: The Solution */}
            <section className="min-h-screen flex items-center justify-center px-4 relative z-20 bg-white dark:bg-black">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-4">Introducing</div>
                        <h2 className="text-6xl sm:text-8xl font-bold mb-8 gradient-text">
                            AIthlete
                        </h2>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
                            My personal solution to getting fit without the hassle. Smart, personalized, and free (for me, and now for you).
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/app"
                                className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
                            >
                                Start Your Journey
                            </Link>
                            <Link
                                href="/"
                                className="px-10 py-4 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white text-lg font-medium rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-300"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </main >
    );
}
