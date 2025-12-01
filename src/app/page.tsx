"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Dumbbell, Brain, TrendingUp, Zap, Target, Award, Clock, Smartphone, Heart, Activity, Trophy, Flame, Timer, Scale, Apple, Footprints, Bike, Utensils, Image as ImageIcon, Download, Gift, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import { useState } from "react";

export default function LandingPage() {
  const [showPricingModal, setShowPricingModal] = useState(false);

  const handlePricingClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowPricingModal(true);
    setTimeout(() => setShowPricingModal(false), 3000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      <Navbar />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Icons */}
        {[
          { Icon: Dumbbell, top: "15%", left: "10%", delay: 0, duration: 8, color: "text-purple-500" },
          { Icon: Activity, top: "25%", right: "15%", delay: 2, duration: 10, color: "text-pink-500" },
          { Icon: Heart, bottom: "20%", left: "15%", delay: 1, duration: 9, color: "text-red-500" },
          { Icon: Zap, top: "40%", left: "25%", delay: 3, duration: 7, color: "text-yellow-500" },
          { Icon: Trophy, bottom: "30%", right: "10%", delay: 4, duration: 11, color: "text-amber-500" },
          { Icon: Flame, top: "60%", right: "25%", delay: 2.5, duration: 8.5, color: "text-orange-500" },
          { Icon: Timer, top: "10%", left: "40%", delay: 1.5, duration: 9.5, color: "text-blue-500" },
          { Icon: Scale, bottom: "15%", right: "35%", delay: 3.5, duration: 10.5, color: "text-green-500" },
          { Icon: Apple, top: "50%", right: "5%", delay: 0.5, duration: 8, color: "text-red-400" },
          { Icon: Footprints, bottom: "40%", left: "5%", delay: 2, duration: 12, color: "text-stone-500" },
          { Icon: Bike, top: "5%", right: "30%", delay: 4, duration: 11, color: "text-cyan-500" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            className={`absolute ${item.color} opacity-20 dark:opacity-10`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom
            }}
          >
            <item.Icon className="w-12 h-12 sm:w-16 sm:h-16" />
          </motion.div>
        ))}

        {/* SVG Pulse Pattern */}
        <svg className="absolute top-1/2 left-0 w-full h-64 opacity-5 dark:opacity-10 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="none" stroke="currentColor" strokeWidth="2" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,165.3C1248,171,1344,117,1392,90.7L1440,64" className="text-purple-500" />
          <path fill="none" stroke="currentColor" strokeWidth="2" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,197.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96" className="text-pink-500" style={{ transform: 'translateY(20px)' }} />
        </svg>

        {/* Gradient Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

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

            {/* CTA Buttons */}
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



              <button
                onClick={handlePricingClick}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-medium rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                View Pricing
              </button>
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
              Why Choose <span className="gradient-text">AIthlete</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Advanced AI technology meets fitness expertise to deliver results that matter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Workouts",
                description: "Personalized workout plans tailored to your goals—whether it's weight loss, muscle gain, or endurance.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Utensils,
                title: "AI Dietitian",
                description: "Get expert nutrition advice and meal plans generated at your convenience to fuel your body right.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: ImageIcon,
                title: "Rich Content",
                description: "Visual guides, delicious recipes, and detailed workout tutorials to ensure you perform every move correctly.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Scale,
                title: "Weight Tracker",
                description: "Log your weight daily and visualize your progress with intuitive charts and graphs.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Gift,
                title: "Completely Free",
                description: "Enjoy full access to all features without any hidden fees or subscriptions (at least till now!).",
                gradient: "from-yellow-500 to-amber-500"
              },
              {
                icon: Download,
                title: "Export to PDF",
                description: "Download your personalized workout and diet plans as PDFs to take them with you anywhere.",
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

      {/* Story Section */}
      <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Wanna know the story behind?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Discover how a gym enthusiast with no time and no money built an AI to solve his own problem.
            </p>
            <Link
              href="/about"
              className="inline-block px-10 py-4 border-2 border-neutral-300 dark:border-neutral-700 text-black dark:text-white text-lg font-medium rounded-full hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105"
            >
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing Modal */}
      <AnimatePresence>
        {showPricingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setShowPricingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-neutral-200 dark:border-neutral-800"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-4 gradient-text">It's Free!</h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                AIthlete is Free!! (atleast right now) Use it as much as you can.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main >
  );
}
