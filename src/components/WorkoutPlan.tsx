"use client";

import { useState, useEffect } from "react";
import { DailyWorkout } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ImageIcon, Volume2, VolumeX } from "lucide-react";

interface WorkoutPlanProps {
    plan: DailyWorkout[];
}

export default function WorkoutPlan({ plan }: WorkoutPlanProps) {
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSpeechSynthesis(window.speechSynthesis);
        }
    }, []);

    const handleExerciseClick = async (exerciseName: string) => {
        setSelectedExercise(exerciseName);
        setImageUrl(null);
        setLoading(true);

        try {
            const res = await fetch("/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: `Minimalist black and white fitness photo of ${exerciseName} exercise, professional, clean` }),
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

        let text = "Here is your workout plan. ";
        plan.forEach((day) => {
            text += `${day.day}. Focus on ${day.focus}. `;
            day.exercises.forEach((ex) => {
                text += `${ex.name}, ${ex.sets} sets of ${ex.reps} reps. `;
            });
        });

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light">Workout Plan</h2>
                <button
                    onClick={handleSpeak}
                    className="p-2 hover:opacity-60 transition-opacity duration-300"
                    aria-label="Read workout plan"
                >
                    {isSpeaking ? (
                        <VolumeX className="w-5 h-5" />
                    ) : (
                        <Volume2 className="w-5 h-5" />
                    )}
                </button>
            </div>

            <AnimatePresence>
                {selectedExercise && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 dark:bg-white/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedExercise(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white dark:bg-black p-6 max-w-2xl w-full relative border border-neutral-200 dark:border-neutral-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedExercise(null)}
                                className="absolute top-4 right-4 p-2 hover:opacity-60 transition-opacity"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-light mb-4 pr-12">{selectedExercise}</h3>
                            <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
                                ) : imageUrl ? (
                                    <img src={imageUrl} alt={selectedExercise} className="w-full h-full object-cover" />
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
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-light">{day.day}</h3>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wider">{day.focus}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {day.exercises.map((exercise, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-200 cursor-pointer group"
                                onClick={() => handleExerciseClick(exercise.name)}
                            >
                                <div className="flex-1">
                                    <h4 className="text-sm font-light">{exercise.name}</h4>
                                    {exercise.notes && (
                                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{exercise.notes}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-neutral-500">
                                    <span>{exercise.sets} × {exercise.reps}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ImageIcon className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
