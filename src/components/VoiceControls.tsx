"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { GeneratedPlan } from "@/types";

interface VoiceControlsProps {
    plan: GeneratedPlan;
}

export default function VoiceControls({ plan }: VoiceControlsProps) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSpeechSynthesis(window.speechSynthesis);
        }
    }, []);

    const generateSpeechText = () => {
        let text = "Here is your personalized fitness plan. ";
        text += "For your workout plan: ";
        plan.workoutPlan.forEach((day) => {
            text += `${day.day}. Focus on ${day.focus}. `;
            day.exercises.forEach((ex) => {
                text += `${ex.name}, ${ex.sets} sets of ${ex.reps} reps. `;
            });
        });
        text += "For your diet plan: ";
        plan.dietPlan.forEach((day) => {
            text += `${day.day}. Breakfast: ${day.breakfast.name}. Lunch: ${day.lunch.name}. Dinner: ${day.dinner.name}. `;
        });
        text += `Motivation: ${plan.motivation}`;
        return text;
    };

    const handleSpeak = () => {
        if (!speechSynthesis) return;

        if (isSpeaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const text = generateSpeechText();
        const newUtterance = new SpeechSynthesisUtterance(text);

        newUtterance.onend = () => setIsSpeaking(false);
        newUtterance.onerror = () => setIsSpeaking(false);

        speechSynthesis.speak(newUtterance);
        setIsSpeaking(true);
    };

    return (
        <button
            onClick={handleSpeak}
            className="fixed bottom-8 right-8 p-4 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity duration-300 z-40"
            aria-label="Voice controls"
        >
            {isSpeaking ? (
                <VolumeX className="w-5 h-5" />
            ) : (
                <Volume2 className="w-5 h-5" />
            )}
        </button>
    );
}
