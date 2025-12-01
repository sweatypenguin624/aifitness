"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import {
    Plus,
    Trash2,
    Dumbbell,
    Utensils,
    Scale,
    TrendingUp,
    Calendar,
    RotateCcw
} from "lucide-react";
import { WorkoutLog, MealLog, WeightLog } from "@/types";

export default function Tracker() {
    const [activeTab, setActiveTab] = useState<"workout" | "meal" | "weight">("workout");
    const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
    const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
    const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);

    // Form states
    const [workoutForm, setWorkoutForm] = useState({ exercise: "", sets: "", reps: "", weight: "" });
    const [mealForm, setMealForm] = useState({ name: "", calories: "", protein: "", carbs: "", fats: "" });
    const [weightForm, setWeightForm] = useState({ weight: "" });

    useEffect(() => {
        // Fetch logs from DB
        const fetchLogs = async () => {
            try {
                const [workouts, meals, weights] = await Promise.all([
                    fetch("/api/tracker?type=workout").then(res => res.json()),
                    fetch("/api/tracker?type=meal").then(res => res.json()),
                    fetch("/api/tracker?type=weight").then(res => res.json())
                ]);

                if (Array.isArray(workouts)) setWorkoutLogs(workouts);
                if (Array.isArray(meals)) setMealLogs(meals);
                if (Array.isArray(weights)) setWeightLogs(weights);
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        fetchLogs();
    }, []);

    const addWorkout = async () => {
        if (!workoutForm.exercise) return;
        const newLog = {
            date: new Date().toISOString().split("T")[0],
            exercise: workoutForm.exercise,
            sets: Number(workoutForm.sets) || 0,
            reps: Number(workoutForm.reps) || 0,
            weight: Number(workoutForm.weight) || 0,
        };

        try {
            const res = await fetch("/api/tracker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "workout", data: newLog }),
            });
            if (res.ok) {
                const savedLog = await res.json();
                setWorkoutLogs([savedLog, ...workoutLogs]);
                setWorkoutForm({ exercise: "", sets: "", reps: "", weight: "" });
            }
        } catch (error) {
            console.error("Error saving workout:", error);
            alert("Failed to save workout. Check console for details.");
        }
    };

    const addMeal = async () => {
        if (!mealForm.name) return;
        const newLog = {
            date: new Date().toISOString().split("T")[0],
            name: mealForm.name,
            calories: Number(mealForm.calories) || 0,
            protein: Number(mealForm.protein) || 0,
            carbs: Number(mealForm.carbs) || 0,
            fats: Number(mealForm.fats) || 0,
        };

        try {
            const res = await fetch("/api/tracker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "meal", data: newLog }),
            });
            if (res.ok) {
                const savedLog = await res.json();
                setMealLogs([savedLog, ...mealLogs]);
                setMealForm({ name: "", calories: "", protein: "", carbs: "", fats: "" });
            } else {
                alert("Failed to save meal. Server returned error.");
            }
        } catch (error) {
            console.error("Error saving meal:", error);
            alert("Failed to save meal. Check console for details.");
        }
    };

    const addWeight = async () => {
        if (!weightForm.weight) return;
        const today = new Date().toISOString().split("T")[0];
        const newLog = {
            date: today,
            weight: Number(weightForm.weight),
        };

        try {
            const res = await fetch("/api/tracker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "weight", data: newLog }),
            });
            if (res.ok) {
                const savedLog = await res.json();
                const filtered = weightLogs.filter(w => w.date.toString().split("T")[0] !== today);
                setWeightLogs([...filtered, savedLog].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
                setWeightForm({ weight: "" });
            } else {
                alert("Failed to save weight. Server returned error.");
            }
        } catch (error) {
            console.error("Error saving weight:", error);
            alert("Failed to save weight. Check console for details.");
        }
    };

    const flushWeightData = async () => {
        if (!confirm("Are you sure you want to delete ALL weight data? This cannot be undone.")) return;

        try {
            const res = await fetch("/api/tracker?type=weight&all=true", {
                method: "DELETE",
            });

            if (res.ok) {
                setWeightLogs([]);
                alert("All weight data flushed.");
            } else {
                alert("Failed to flush data.");
            }
        } catch (error) {
            console.error("Error flushing data:", error);
            alert("Error flushing data.");
        }
    };

    const deleteWorkout = (id: string) => {
        // TODO: Implement delete API
        setWorkoutLogs(workoutLogs.filter(w => w.id !== id));
    };

    const deleteMeal = (id: string) => {
        // TODO: Implement delete API
        setMealLogs(mealLogs.filter(m => m.id !== id));
    };

    // Calculate daily macros
    const today = new Date().toISOString().split("T")[0];
    const todaysMeals = mealLogs.filter(m => m.date === today);
    const dailyMacros = todaysMeals.reduce((acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex justify-center">
                <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 rounded-full p-1">
                    {[
                        { id: "workout", icon: Dumbbell, label: "Workout" },
                        { id: "meal", icon: Utensils, label: "Meals" },
                        { id: "weight", icon: Scale, label: "Weight" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                                ? "bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm"
                                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "workout" && (
                    <motion.div
                        key="workout"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Add Workout Form */}
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-purple-500" />
                                Log Workout
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    placeholder="Exercise Name"
                                    value={workoutForm.exercise}
                                    onChange={e => setWorkoutForm({ ...workoutForm, exercise: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Sets"
                                    value={workoutForm.sets}
                                    onChange={e => setWorkoutForm({ ...workoutForm, sets: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Reps"
                                    value={workoutForm.reps}
                                    onChange={e => setWorkoutForm({ ...workoutForm, reps: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Weight (kg)"
                                    value={workoutForm.weight}
                                    onChange={e => setWorkoutForm({ ...workoutForm, weight: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <button
                                onClick={addWorkout}
                                className="mt-4 w-full py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Add Entry
                            </button>
                        </div>

                        {/* Workout List */}
                        <div className="space-y-4">
                            {workoutLogs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex justify-between items-center"
                                >
                                    <div>
                                        <h4 className="font-bold text-lg">{log.exercise}</h4>
                                        <div className="text-sm text-neutral-500 flex gap-4">
                                            <span>{log.sets} sets</span>
                                            <span>{log.reps} reps</span>
                                            <span>{log.weight} kg</span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {log.date}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteWorkout(log.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                            {workoutLogs.length === 0 && (
                                <div className="text-center py-12 text-neutral-500">
                                    No workouts logged yet. Start training! 💪
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === "meal" && (
                    <motion.div
                        key="meal"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Daily Summary */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: "Calories", value: dailyMacros.calories, unit: "kcal", color: "text-blue-500" },
                                { label: "Protein", value: dailyMacros.protein, unit: "g", color: "text-green-500" },
                                { label: "Carbs", value: dailyMacros.carbs, unit: "g", color: "text-orange-500" },
                                { label: "Fats", value: dailyMacros.fats, unit: "g", color: "text-yellow-500" },
                            ].map((macro) => (
                                <div key={macro.label} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center">
                                    <div className={`text-2xl font-bold ${macro.color}`}>{macro.value}</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider">{macro.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Add Meal Form */}
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-green-500" />
                                Log Meal
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Meal Name"
                                    value={mealForm.name}
                                    onChange={e => setMealForm({ ...mealForm, name: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <input
                                    type="number"
                                    placeholder="Calories"
                                    value={mealForm.calories}
                                    onChange={e => setMealForm({ ...mealForm, calories: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Protein (g)"
                                    value={mealForm.protein}
                                    onChange={e => setMealForm({ ...mealForm, protein: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Carbs (g)"
                                    value={mealForm.carbs}
                                    onChange={e => setMealForm({ ...mealForm, carbs: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Fats (g)"
                                    value={mealForm.fats}
                                    onChange={e => setMealForm({ ...mealForm, fats: e.target.value })}
                                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <button
                                onClick={addMeal}
                                className="mt-4 w-full py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Add Meal
                            </button>
                        </div>

                        {/* Meal List */}
                        <div className="space-y-4">
                            {mealLogs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex justify-between items-center"
                                >
                                    <div>
                                        <h4 className="font-bold text-lg">{log.name}</h4>
                                        <div className="text-sm text-neutral-500 flex gap-4">
                                            <span className="text-blue-500">{log.calories} kcal</span>
                                            <span className="text-green-500">P: {log.protein}g</span>
                                            <span className="text-orange-500">C: {log.carbs}g</span>
                                            <span className="text-yellow-500">F: {log.fats}g</span>
                                            <span className="flex items-center gap-1 text-neutral-400">
                                                <Calendar className="w-3 h-3" /> {log.date}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteMeal(log.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                            {mealLogs.length === 0 && (
                                <div className="text-center py-12 text-neutral-500">
                                    No meals logged yet. Eat up! 🥗
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === "weight" && (
                    <motion.div
                        key="weight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Weight Chart */}
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm h-[400px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    Weight Progress
                                </h3>
                                <button
                                    onClick={flushWeightData}
                                    className="text-xs flex items-center gap-1 text-red-500 hover:text-red-600 px-3 py-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    Flush Data
                                </button>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weightLogs}>
                                    <defs>
                                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={['dataMin - 2', 'dataMax + 2']}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#888', marginBottom: '0.5rem' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="weight"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorWeight)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Add Weight Form */}
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-2 text-neutral-500">Current Weight (kg)</label>
                                <input
                                    type="number"
                                    placeholder="0.0"
                                    value={weightForm.weight}
                                    onChange={e => setWeightForm({ weight: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={addWeight}
                                className="py-3 px-8 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Log Weight
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
