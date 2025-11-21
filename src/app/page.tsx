"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Dumbbell, Zap, Brain, TrendingUp } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="absolute top-8 right-6 z-50">
          <ModeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col justify-center items-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl md:text-7xl font-light mb-6 tracking-tight"
          >
            AI Fitness Coach
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light max-w-2xl mb-12"
          >
            Personalized workout and diet plans powered by artificial intelligence.
            Minimal. Intelligent. Effective.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href="/app"
              className="inline-block px-12 py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-light tracking-wide hover:opacity-80 transition-opacity duration-300"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 max-w-4xl"
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Brain className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-sm font-light uppercase tracking-wider mb-2">AI-Powered</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                Advanced algorithms create plans tailored to your goals and fitness level
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Dumbbell className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-sm font-light uppercase tracking-wider mb-2">Complete Plans</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                7-day workout routines and meal suggestions designed for your lifestyle
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-sm font-light uppercase tracking-wider mb-2">Track Progress</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                Voice playback, image generation, and PDF export to keep you motivated
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
