'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, BadgeCheck, CreditCard, Timer, Zap, Sparkles, ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingTier {
    name: string;
    price: string;
    frequency: string;
    description: string;
    highlight?: boolean;
    metrics: {
        timeToMarket: string;
        valueProposition: string;
        conversionQuality: string;
        revenueDescription: string;
    };
}

// Pricing data with value propositions
const pricingTiers: PricingTier[] = [
    {
        name: 'StudyZoom (Free & $9.99 Pro)',
        price: '$0',
        frequency: 'start free',
        description: 'All-in-one AI study platform with free tier and affordable Pro upgrade',
        highlight: true,
        metrics: {
            timeToMarket: 'Instant access',
            valueProposition: 'Premium AI tools',
            conversionQuality: 'Exceptional',
            revenueDescription: 'Optimized for learning'
        }
    },
    {
        name: 'Typical Study Tools',
        price: '$20-$40',
        frequency: '/month',
        description: 'Limited features, significantly higher price',
        metrics: {
            timeToMarket: 'Setup & switching headaches',
            valueProposition: 'Standard tools',
            conversionQuality: 'Basic',
            revenueDescription: 'Limited outcomes'
        }
    }
];

// Value comparison component
function ValueComparison() {
    const [activeTab, setActiveTab] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="w-full max-w-4xl mx-auto px-3 sm:px-4"
        >
            {/* Tab navigation */}
            <div className="flex mb-6 sm:mb-8 p-1 bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden">
                {pricingTiers.map((tier, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-xl text-sm font-medium relative",
                            activeTab === index ? "text-white" : "text-gray-400"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {activeTab === index && (
                            <motion.div
                                layoutId="activeTab"
                                className={cn(
                                    "absolute inset-0 rounded-xl",
                                    tier.highlight
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                        : "bg-gray-800/80"
                                )}
                                initial={false}
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                        )}
                        <span className="relative z-10">{tier.name}</span>
                    </motion.button>
                ))}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Left column - Cost and time */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`price-${activeTab}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-white/5 overflow-hidden max-w-full"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-base sm:text-lg text-gray-400 font-medium">Your Cost Today</h3>
                                    <div className="mt-2 flex items-baseline">
                                        <motion.span
                                            className={cn(
                                                "text-2xl sm:text-3xl md:text-4xl font-bold",
                                                pricingTiers[activeTab].highlight
                                                    ? "bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                                                    : "text-white"
                                            )}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1, duration: 0.4 }}
                                        >
                                            {pricingTiers[activeTab].price}
                                        </motion.span>
                                        <span className="ml-2 text-sm text-gray-500">
                                            {pricingTiers[activeTab].frequency}
                                        </span>
                                        {activeTab === 0 && (
                                            <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                                                Pro: $9.99/mo
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 flex items-center justify-center">
                                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="mt-1 text-xs sm:text-sm text-gray-500">
                                {pricingTiers[activeTab].description}
                                {activeTab === 0 && (
                                    <span className="block mt-1 text-xs text-blue-400">Cancel anytime • No credit card for Free plan</span>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            key={`time-${activeTab}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-white/5 overflow-hidden max-w-full"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-base sm:text-lg text-gray-400 font-medium">Start Learning</h3>
                                    <div className="mt-2 flex items-baseline">
                                        <motion.span
                                            className={cn(
                                                "text-xl sm:text-2xl md:text-3xl font-bold",
                                                activeTab === 0 ? "text-green-400" : "text-white"
                                            )}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                        >
                                            {pricingTiers[activeTab].metrics.timeToMarket}
                                        </motion.span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 flex items-center justify-center">
                                    <Timer className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                </div>
                            </div>

                            {activeTab === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-3 sm:mt-4 py-1.5 sm:py-2 px-2 sm:px-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                                >
                                    <div className="flex items-center">
                                        <Zap className="h-4 w-4 text-green-400 mr-2" />
                                        <span className="text-green-400 text-xs sm:text-sm font-medium">Start studying immediately</span>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right column - Value & Experience */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5 relative overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Background gradient animation */}
                    <div
                        className={cn(
                            "absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-purple-600/5",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}
                        style={{
                            transition: "opacity 0.5s ease-in-out"
                        }}
                    />

                    <h3 className="text-lg sm:text-xl text-white font-semibold mb-4 sm:mb-6">Why StudyZoom Wins</h3>

                    <div className="space-y-5 sm:space-y-8">
                        {/* All-in-one AI Tools */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-gray-400 text-xs sm:text-sm">All-in-one AI Tools</div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`conversion-${activeTab}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            "font-bold text-base sm:text-lg",
                                            activeTab === 0 ? "text-green-400" : "text-white"
                                        )}
                                    >
                                        <span className="text-xs sm:text-sm">{activeTab === 0 ? "Complete AI study suite" : "Limited tools"}</span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={`conversion-bar-${activeTab}`}
                                        initial={{ width: '0%' }}
                                        animate={{
                                            width: activeTab === 0 ? '95%' : '60%'
                                        }}
                                        exit={{ width: '0%' }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className={cn(
                                            "absolute inset-y-0 left-0 rounded-full",
                                            activeTab === 0
                                                ? "bg-gradient-to-r from-green-400 to-emerald-600"
                                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                                        )}
                                    />
                                </AnimatePresence>
                            </div>

                            {activeTab === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    className="mt-2 text-sm text-green-400 flex items-center"
                                >
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    <span className="text-xs sm:text-sm">Flashcards, quizzes, summaries & more</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Learning Outcomes */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-gray-400 text-xs sm:text-sm">Learning Outcomes</div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`features-${activeTab}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            "font-bold text-base sm:text-lg",
                                            activeTab === 0 ? "text-blue-400" : "text-gray-400"
                                        )}
                                    >
                                        <span className="text-xs sm:text-sm">{activeTab === 0 ? "Adaptive & personalized" : "Generic approach"}</span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={`features-bar-${activeTab}`}
                                        initial={{ width: '0%' }}
                                        animate={{ width: activeTab === 0 ? '95%' : '50%' }}
                                        exit={{ width: '0%' }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className={cn(
                                            "absolute inset-y-0 left-0 rounded-full",
                                            activeTab === 0
                                                ? "bg-gradient-to-r from-blue-400 to-purple-600"
                                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                                        )}
                                    />
                                </AnimatePresence>
                            </div>
                            {activeTab === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    className="mt-2 text-sm text-blue-400 flex items-center"
                                >
                                    <BadgeCheck className="h-3 w-3 mr-1" />
                                    <span className="text-xs sm:text-sm">AI adapts to your learning style</span>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-6 sm:mt-8 p-3 bg-black/30 rounded-lg border border-white/10 text-xs sm:text-sm text-gray-400"
                    >
                        While other study tools offer limited features at premium prices, StudyZoom gives you a complete AI-powered learning platform that adapts to your needs—all starting completely free.
                    </motion.div>
                </motion.div>
            </div>

            {/* CTA */}
            {activeTab === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="mt-10 text-center"
                >
                    <div className="flex flex-col items-center">
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center">
                                Upgrade to Pro – Unlimited AI Study for $9.99/mo
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                        <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                            <p className="text-xs text-blue-400">Launch pricing – lock in $9.99/mo before it increases</p>
                            <div className="flex items-center text-xs text-green-400">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                <span>Secure & private</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export function FeatureComparison(): React.JSX.Element {
    return (
        <section className="w-full py-12 sm:py-16 md:py-24 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute w-full h-full inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <div className="absolute right-1/4 top-1/3 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
                <div className="absolute left-1/3 bottom-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px]" />

                {/* Subtle grid */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
            </div>

            <div className="container relative z-10 px-4 max-w-6xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge className="mb-4 bg-black/30 text-blue-400 hover:bg-black/50 border-blue-600/30 backdrop-blur-md px-4 py-1 rounded-full">
                            Value Proposition
                        </Badge>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Outperforms
                            </span>{' '}
                            expensive alternatives.
                        </h2>

                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Stop overpaying for slow progress. Our AI-powered system delivers faster learning, higher scores, and real mastery — without the high price tag of tutors or expensive courses.
                        </p>
                    </motion.div>
                </div>

                <ValueComparison />
            </div>
        </section>
    );
}
