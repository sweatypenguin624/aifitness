"use client";

import { useState, useEffect } from "react";
import UserForm from "@/components/UserForm";
import WorkoutPlan from "@/components/WorkoutPlan";
import DietPlan from "@/components/DietPlan";
import { GeneratedPlan, UserData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Utensils, RefreshCw, Download, Sparkles } from "lucide-react";
import { exportToPDF } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";

export default function AppPage() {
    const [plan, setPlan] = useState<GeneratedPlan | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"workout" | "diet">("workout");
    const [dailyQuote, setDailyQuote] = useState<string>("");

    useEffect(() => {
        const savedPlan = localStorage.getItem("ai-fitness-plan");
        if (savedPlan) {
            setPlan(JSON.parse(savedPlan));
        }

        // Fetch daily quote
        fetch("/api/quote")
            .then(res => res.json())
            .then(data => setDailyQuote(data.quote))
            .catch(() => setDailyQuote("Your only limit is you."));
    }, []);

    useEffect(() => {
        if (plan) {
            localStorage.setItem("ai-fitness-plan", JSON.stringify(plan));
        }
    }, [plan]);

    const handleGenerate = async (userData: UserData) => {
        setLoading(true);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!res.ok) throw new Error("Failed to generate plan");

            const data = await res.json();
            setPlan(data);
        } catch (error) {
            console.error(error);
            alert("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-6xl relative">
                <div className="absolute top-4 sm:top-8 right-4 sm:right-6 z-50">
                    <ModeToggle />
                </div>

                <header className="text-center mb-8 sm:mb-16 mt-12 sm:mt-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-light mb-3 tracking-tight"
                    >
                        AI Fitness Coach
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light tracking-wide"
                    >
                        Personalized. Intelligent. Minimal.
                    </motion.p>
                </header>

                <AnimatePresence mode="wait">
                    {!plan ? (
                        <UserForm onSubmit={handleGenerate} isLoading={loading} />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <button
                                        onClick={() => setActiveTab("workout")}
                                        className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 text-sm font-light tracking-wide transition-all duration-300 ${activeTab === "workout"
                                            ? "bg-black dark:bg-white text-white dark:text-black"
                                            : "bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Dumbbell className="w-4 h-4" />
                                            <span>Workout</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("diet")}
                                        className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 text-sm font-light tracking-wide transition-all duration-300 ${activeTab === "diet"
                                            ? "bg-black dark:bg-white text-white dark:text-black"
                                            : "bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Utensils className="w-4 h-4" />
                                            <span>Diet</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => exportToPDF(plan, "fitness-plan")}
                                        className="px-6 py-3 text-sm font-light tracking-wide bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300"
                                        aria-label="Export to PDF"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => setPlan(null)}
                                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-light border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>New Plan</span>
                                </button>
                            </div>
                            <div id="plan-content">
                                <AnimatePresence mode="wait">
                                    {activeTab === "workout" ? (
                                        <WorkoutPlan key="workout" plan={plan.workoutPlan} />
                                    ) : (
                                        <DietPlan key="diet" plan={plan.dietPlan} />
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-16 p-8 border border-neutral-200 dark:border-neutral-800 text-center"
                            >
                                <p className="text-sm font-light text-neutral-600 dark:text-neutral-400 italic">
                                    "{plan.motivation}"
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Daily Motivation Quote - Always visible at bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 sm:mt-16 p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-neutral-400" />
                        <h3 className="text-xs font-light uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Daily Motivation
                        </h3>
                        <Sparkles className="w-4 h-4 text-neutral-400" />
                    </div>
                    <p className="text-sm sm:text-base font-light text-neutral-700 dark:text-neutral-300">
                        {dailyQuote || "Loading inspiration..."}
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
