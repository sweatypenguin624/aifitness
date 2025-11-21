"use client";

import { useState, useEffect } from "react";
import { DailyDiet, Meal } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ImageIcon, Volume2, VolumeX } from "lucide-react";

interface DietPlanProps {
    plan: DailyDiet[];
}

export default function DietPlan({ plan }: DietPlanProps) {
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSpeechSynthesis(window.speechSynthesis);
        }
    }, []);

    const handleMealClick = async (mealName: string) => {
        setSelectedMeal(mealName);
        setImageUrl(null);
        setLoading(true);

        try {
            const res = await fetch("/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: `Minimalist food photography of ${mealName}, clean, modern plating` }),
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

    const MealCard = ({ meal, title }: { meal: Meal; title: string }) => (
        <div
            className="p-4 border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-200 cursor-pointer group"
            onClick={() => handleMealClick(meal.name)}
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{title}</p>
                    <h4 className="text-sm font-light">{meal.name}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{meal.description}</p>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-4 h-4 text-neutral-400" />
                </span>
            </div>
            <div className="flex gap-4 text-xs text-neutral-400 mt-2">
                <span>{meal.calories}</span>
                <span>P: {meal.protein}</span>
                <span>C: {meal.carbs}</span>
                <span>F: {meal.fats}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light">Diet Plan</h2>
                <button
                    onClick={handleSpeak}
                    className="p-2 hover:opacity-60 transition-opacity duration-300"
                    aria-label="Read diet plan"
                >
                    {isSpeaking ? (
                        <VolumeX className="w-5 h-5" />
                    ) : (
                        <Volume2 className="w-5 h-5" />
                    )}
                </button>
            </div>

            <AnimatePresence>
                {selectedMeal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 dark:bg-white/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedMeal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white dark:bg-black p-6 max-w-2xl w-full relative border border-neutral-200 dark:border-neutral-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMeal(null)}
                                className="absolute top-4 right-4 p-2 hover:opacity-60 transition-opacity"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-light mb-4 pr-12">{selectedMeal}</h3>
                            <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
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

            {plan.map((day, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border border-neutral-200 dark:border-neutral-800 p-6"
                >
                    <h3 className="text-lg font-light mb-6">{day.day}</h3>
                    <div className="space-y-0">
                        <MealCard meal={day.breakfast} title="Breakfast" />
                        <MealCard meal={day.lunch} title="Lunch" />
                        <MealCard meal={day.dinner} title="Dinner" />
                        {day.snacks.map((snack, i) => (
                            <MealCard key={i} meal={snack} title={`Snack ${i + 1}`} />
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
