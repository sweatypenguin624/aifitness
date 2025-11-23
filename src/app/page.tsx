"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Dumbbell, Brain, TrendingUp, Zap, Target, Award } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 py-4 max-w-7xl flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold gradient-text"
          >
            AI Fitness Coach
          </motion.div>
          <ModeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-primary opacity-10 dark:opacity-5"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              Transform Your
              <br />
              <span className="gradient-text">Fitness Journey</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-3xl mx-auto mb-12"
            >
              AI-powered personalized workout and diet plans tailored to your goals,
              fitness level, and lifestyle.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/app"
                className="px-10 py-4 bg-white text-black text-lg font-medium rounded-full border border-neutral-300 hover:bg-neutral-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Your Journey
              </Link>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 border-2 border-neutral-300 dark:border-neutral-700 text-black dark:text-white text-lg font-medium rounded-full hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300"
              >
                Learn More
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-neutral-400 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 px-4 bg-neutral-50 dark:bg-neutral-950">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">AI Fitness Coach</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Advanced AI technology meets fitness expertise to deliver results that matter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Plans",
                description: "Advanced algorithms create plans tailored to your unique goals, fitness level, and dietary preferences",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Target,
                title: "Personalized Goals",
                description: "Whether it's weight loss, muscle gain, or endurance - we customize everything for your success",
                gradient: "from-pink-500 to-rose-500"
              },
              {
                icon: Award,
                title: "Track Progress",
                description: "Voice playback, image generation, and PDF export to keep you motivated and on track",
                gradient: "from-violet-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="h-full bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-800">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-white dark:text-black" />
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-black dark:text-white">{feature.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "10K+", icon: Dumbbell },
              { label: "Plans Created", value: "50K+", icon: Target },
              { label: "Success Rate", value: "95%", icon: TrendingUp },
              { label: "Countries", value: "25+", icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-block p-4 rounded-full bg-black dark:bg-white mb-4">
                  <stat.icon className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Ready to Start Your
              <br />
              <span className="gradient-text">Transformation?</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
              Join thousands of fitness enthusiasts who are achieving their goals with AI-powered coaching
            </p>

            <Link
              href="/app"
              className="inline-block px-12 py-5 bg-white text-black text-lg font-medium rounded-full border border-neutral-300 hover:bg-neutral-50 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
