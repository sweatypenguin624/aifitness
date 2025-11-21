"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserData } from "@/types";
import { Loader2 } from "lucide-react";

interface UserFormProps {
    onSubmit: (data: UserData) => void;
    isLoading: boolean;
}

export default function UserForm({ onSubmit, isLoading }: UserFormProps) {
    const [formData, setFormData] = useState<UserData>({
        name: "",
        age: 25,
        gender: "Male",
        height: 170,
        weight: 70,
        goal: "Weight Loss",
        level: "Beginner",
        location: "Home",
        dietaryPreferences: "Veg",
        medicalHistory: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "age" || name === "height" || name === "weight" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Age</label>
                        <input
                            type="number"
                            name="age"
                            required
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            required
                            value={formData.height}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            required
                            value={formData.weight}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Fitness Goal</label>
                        <select
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        >
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Endurance">Endurance</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Fitness Level</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Location</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        >
                            <option value="Home">Home</option>
                            <option value="Gym">Gym</option>
                            <option value="Outdoor">Outdoor</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Diet Preference</label>
                        <select
                            name="dietaryPreferences"
                            value={formData.dietaryPreferences}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 text-sm"
                        >
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Keto">Keto</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Medical History (Optional)</label>
                    <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors duration-300 resize-none h-24 text-sm"
                        placeholder="Any injuries or medical conditions..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-light tracking-wide hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        "Generate Plan"
                    )}
                </button>
            </form>
        </motion.div>
    );
}
