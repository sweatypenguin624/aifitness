"use client";

import { useState, useEffect } from "react";
import { DailyWorkout } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ImageIcon, Volume2, VolumeX, Zap } from "lucide-react";

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
                body: JSON.stringify({ prompt: `Minimalist fitness photo of ${exerciseName} exercise, professional, clean` }),
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold gradient-text">Workout Plan</h2>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSpeak}
                    className="p-3 rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-shadow"
                    aria-label="Read workout plan"
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
                {selectedExercise && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedExercise(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedExercise(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-bold mb-4 pr-12">{selectedExercise}</h3>
                            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center overflow-hidden">
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
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

            {/* Workout Days */}
            <div className="grid gap-6">
                {plan.map((day, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow"
                    >
                        {/* Day Header */}
                        <div className="relative p-6 gradient-primary">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white">{day.day}</h3>
                                <p className="text-white/90 text-sm uppercase tracking-wider mt-1 flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    {day.focus}
                                </p>
                            </div>
                        </div>

                        {/* Exercises */}
                        <div className="p-6 space-y-4">
                            {day.exercises.map((exercise, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + i * 0.05 }}
                                    onClick={() => handleExerciseClick(exercise.name)}
                                    className="group relative p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 cursor-pointer transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg group-hover:gradient-text transition-all">
                                                {i + 1}. {exercise.name}
                                            </h4>
                                            {exercise.notes && (
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{exercise.notes}</p>
                                            )}
                                            <div className="flex gap-4 mt-3 text-sm text-neutral-500 dark:text-neutral-500">
                                                <span className="font-medium">Sets: {exercise.sets}</span>
                                                <span className="font-medium">Reps: {exercise.reps}</span>
                                                <span className="font-medium">Rest: {exercise.rest}</span>
                                            </div>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                                            <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                                                <ImageIcon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
