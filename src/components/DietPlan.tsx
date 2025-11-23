"use client";

import { useState, useEffect } from "react";
import { DailyDiet, Meal } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ImageIcon, Volume2, VolumeX, Coffee, Sun, Moon, ExternalLink, BookOpen } from "lucide-react";

interface DietPlanProps {
    plan: DailyDiet[];
}

export default function DietPlan({ plan }: DietPlanProps) {
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [selectedRecipeUrl, setSelectedRecipeUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSpeechSynthesis(window.speechSynthesis);
        }
    }, []);

    const handleMealClick = async (mealName: string, recipeUrl?: string) => {
        setSelectedMeal(mealName);
        setSelectedRecipeUrl(recipeUrl || null);
        setImageUrl(null);
        setLoading(true);

        try {
            const res = await fetch("/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: `Beautiful food photography of ${mealName}, Indian cuisine, clean, modern plating` }),
            });
            const data = await res.json();
            setImageUrl(data.imageUrl);
        } catch (error) {
            console.error("Failed to generate image", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSpeak = () => {
        if (!speechSynthesis) return;

        if (isSpeaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        let text = "Here is your diet plan. ";
        plan.forEach((day) => {
            text += `${day.day}. Breakfast: ${day.breakfast.name}. Lunch: ${day.lunch.name}. Dinner: ${day.dinner.name}. `;
        });

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const MealCard = ({ meal, title, icon: Icon }: { meal: Meal; title: string; icon: any }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => handleMealClick(meal.name, meal.recipeUrl)}
            className="group p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700">
                        <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        {title}
                    </span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-5 h-5 text-neutral-500" />
                </div>
            </div>

            <h4 className="text-lg font-bold mb-2 text-black dark:text-white">{meal.name}</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{meal.description}</p>

            <div className="flex flex-wrap gap-2 text-xs mb-2">
                <span className="px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium">
                    {meal.calories}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium">
                    P: {meal.protein}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium">
                    C: {meal.carbs}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium">
                    F: {meal.fats}
                </span>
            </div>

            {meal.recipeUrl && (
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                    <BookOpen className="w-3 h-3" />
                    <span>Recipe available</span>
                </div>
            )}
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold gradient-text">Diet Plan</h2>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSpeak}
                    className="p-3 rounded-full gradient-primary shadow-lg hover:shadow-xl transition-shadow"
                    aria-label="Read diet plan"
                >
                    {isSpeaking ? (
                        <VolumeX className="w-5 h-5" />
                    ) : (
                        <Volume2 className="w-5 h-5" />
                    )}
                </motion.button>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedMeal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedMeal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMeal(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-bold mb-4 pr-12">{selectedMeal}</h3>

                            {/* Recipe Link Button */}
                            {selectedRecipeUrl && (
                                <a
                                    href={selectedRecipeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    View Recipe
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}

                            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center overflow-hidden">
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
                                ) : imageUrl ? (
                                    <img src={imageUrl} alt={selectedMeal} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-neutral-500 text-sm">Failed to load</span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Diet Days */}
            <div className="grid gap-6">
                {plan.map((day, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow"
                    >
                        {/* Day Header - matching WorkoutPlan style */}
                        <div className="p-6 bg-neutral-100 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-700 border-b border-neutral-200 dark:border-neutral-700">
                            <h3 className="text-xl font-bold text-black dark:text-white">{day.day}</h3>
                        </div>

                        {/* Meals */}
                        <div className="p-6 space-y-4">
                            <MealCard meal={day.breakfast} title="Breakfast" icon={Coffee} />
                            <MealCard meal={day.lunch} title="Lunch" icon={Sun} />
                            <MealCard meal={day.dinner} title="Dinner" icon={Moon} />

                            {day.snacks.map((snack, i) => (
                                <MealCard key={i} meal={snack} title={`Snack ${i + 1}`} icon={Coffee} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
