'use client';

import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import {
    BookOpen,
    GraduationCap,
    Brain,
    Lightbulb,
    Clock,
    Trophy,
    Zap,
    BarChart4,
    Headphones,
    FileText,
    Database
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Floating animation for background elements
const FloatingElement = ({ delay = 0, className }: { delay?: number, className?: string }) => (
    <motion.div
        className={cn("absolute rounded-full mix-blend-screen", className)}
        animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
    />
);

// Interactive feature card with hover effects and animations
const FeatureCard = ({ title, description, icon, className }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            className={cn(
                "relative p-6 rounded-2xl backdrop-blur-sm",
                "bg-gradient-to-br from-white/5 to-transparent",
                "border border-white/10 hover:border-white/20",
                "transition-all duration-500 group",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
                <motion.div
                    className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                >
                    {icon}
                </motion.div>

                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

// Animated statistic display
const AnimatedStat = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <motion.div
        className="group relative px-6 py-5 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
    >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm" />

        <div className="relative z-10 flex items-center gap-4">
            <div className="flex-shrink-0">
                <motion.div
                    className="relative flex items-center justify-center w-12 h-12"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                >
                    {/* Icon background with gradient */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900/80" />

                    {/* Icon */}
                    <div className="relative text-blue-400">
                        {icon}
                    </div>
                </motion.div>
            </div>
            <div className="flex-1 min-w-0">
                <motion.span
                    className="text-sm text-gray-300/90 leading-relaxed block font-medium"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                >
                    {text}
                </motion.span>
            </div>

            {/* Decorative element */}
            <motion.div
                className="flex-shrink-0 w-1 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
            >
                <div className="h-full w-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent rounded-full" />
            </motion.div>
        </div>
    </motion.div>
);

// Funnel stage component with refined animations
const FunnelStage = ({
    y,
    width,
    label,
    icon,
    color,
    delay = 0
}: {
    y: string,
    width: string,
    label: string,
    icon: React.ReactNode,
    color: string,
    delay?: number
}) => (
    <motion.div
        className="absolute flex items-center justify-center w-full"
        style={{ top: y }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            delay,
            duration: 0.7,
            ease: [0.21, 0.68, 0.47, 0.98]
        }}
    >
        <motion.div
            className="relative flex items-center px-3 py-2.5"
            style={{ width }}
            whileHover={{
                scale: 1.01,
                transition: { duration: 0.3, ease: [0.21, 0.68, 0.47, 0.98] }
            }}
        >
            {/* Premium glass background with subtle border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-white/[0.08]" />

            {/* Content */}
            <div className="relative flex items-center gap-2.5 w-full">
                <motion.div
                    className="flex items-center justify-center w-7 h-7 rounded-lg"
                    style={{
                        background: `linear-gradient(135deg, ${color}20, transparent)`
                    }}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                >
                    <motion.div
                        className="text-blue-400"
                        animate={{
                            opacity: [0.85, 1, 0.85]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {icon}
                    </motion.div>
                </motion.div>
                <span className="text-sm font-medium bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                    {label}
                </span>
            </div>
        </motion.div>
    </motion.div>
);

// Refined flow indicator with more professional animations
const FlowIndicator = ({ startY, endY, startWidth, endWidth, color }: {
    startY: number,
    endY: number,
    startWidth: string,
    endWidth: string,
    color: string
}) => (
    <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
            top: startY,
            height: endY - startY,
            width: startWidth,
            clipPath: `polygon(0 0, 100% 0, ${parseInt(endWidth) * 100 / parseInt(startWidth)}% 100%, ${(100 - parseInt(endWidth) * 100 / parseInt(startWidth))}% 100%)`
        }}
    >
        {/* Static gradient base */}
        <div
            className="absolute inset-0"
            style={{
                background: `linear-gradient(180deg, ${color}08, ${color}04)`
            }}
        />

        {/* Primary flow animation */}
        <motion.div
            className="absolute inset-0"
            animate={{
                backgroundPosition: ["0% -50%", "0% 150%"]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
            }}
            style={{
                background: `linear-gradient(180deg, 
                    transparent,
                    ${color}10 40%,
                    ${color}15 50%,
                    ${color}10 60%,
                    transparent
                )`,
                backgroundSize: "100% 50%"
            }}
        />

        {/* Subtle horizontal flow */}
        <motion.div
            className="absolute inset-0"
            animate={{
                backgroundPosition: ["100% 0%", "-100% 0%"]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
            }}
            style={{
                background: `linear-gradient(90deg, 
                    transparent,
                    ${color}08 45%,
                    ${color}10 50%,
                    ${color}08 55%,
                    transparent
                )`,
                backgroundSize: "200% 100%",
                opacity: 0.7
            }}
        />
    </motion.div>
);

// Connection line component with truly continuous flow animation
const ConnectionLine = ({
    start,
    end,
    thickness = 1.5,
    animated = true
}: {
    start: { x: string, y: string },
    end: { x: string, y: string },
    thickness?: number,
    animated?: boolean
}) => {
    const containerWidth = 440;
    const containerHeight = 260;

    // Calculate raw positions
    const rawStartX = parseFloat(start.x) / 100 * containerWidth;
    const rawStartY = parseFloat(start.y) / 100 * containerHeight;
    const rawEndX = parseFloat(end.x) / 100 * containerWidth;
    const rawEndY = parseFloat(end.y) / 100 * containerHeight;

    // Calculate node sizes - center node is larger
    const startNodeSize = start.x === "50%" && start.y === "50%" ? 16 : 12;
    const endNodeSize = end.x === "50%" && end.y === "50%" ? 16 : 12;

    // Calculate angle for direction
    const angle = Math.atan2(rawEndY - rawStartY, rawEndX - rawStartX);

    // Adjust start and end points to begin at node edges
    const startX = rawStartX + Math.cos(angle) * (startNodeSize / 2);
    const startY = rawStartY + Math.sin(angle) * (startNodeSize / 2);
    const endX = rawEndX - Math.cos(angle) * (endNodeSize / 2);
    const endY = rawEndY - Math.sin(angle) * (endNodeSize / 2);

    // Calculate actual length after adjustments
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    // Determine if this is an inward or outward connection to center
    const isToCenter = end.x === "50%" && end.y === "50%";

    // Calculate animation direction based on flow to/from center
    const flowDirection = isToCenter ? 1 : -1;

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                top: startY,
                left: startX,
                height: `${thickness}px`,
                width: `${length}px`,
                backgroundColor: 'rgba(96, 165, 250, 0.1)', // Lighter base color
                transformOrigin: 'left center',
                transform: `rotate(${angle}rad)`,
                zIndex: 5
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            {animated && (
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    style={{ borderRadius: `${thickness / 2}px` }}
                >
                    {/* Primary gradient layer - slower continuous flow */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(${flowDirection > 0 ? 90 : -90}deg, 
                                transparent,
                                rgba(96, 165, 250, 0.05) 20%,
                                rgba(96, 165, 250, 0.3) 35%,
                                rgba(147, 51, 234, 0.3) 50%,
                                rgba(96, 165, 250, 0.3) 65%,
                                rgba(96, 165, 250, 0.05) 80%,
                                transparent 100%
                            )`,
                            backgroundSize: '600% 100%',
                        }}
                        animate={{
                            backgroundPosition: flowDirection > 0
                                ? ["0% 0%", "600% 0%"]
                                : ["600% 0%", "0% 0%"],
                        }}
                        transition={{
                            duration: 15, // Much slower animation (increased from 8 to 15 seconds)
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    />

                    {/* Secondary gradient layer - offset for smoother flow */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(${flowDirection > 0 ? 90 : -90}deg, 
                                transparent,
                                rgba(96, 165, 250, 0.05) 20%,
                                rgba(96, 165, 250, 0.2) 35%,
                                rgba(147, 51, 234, 0.2) 50%,
                                rgba(96, 165, 250, 0.2) 65%,
                                rgba(96, 165, 250, 0.05) 80%,
                                transparent 100%
                            )`,
                            backgroundSize: '600% 100%',
                            mixBlendMode: 'lighten'
                        }}
                        animate={{
                            backgroundPosition: flowDirection > 0
                                ? ["300% 0%", "900% 0%"]
                                : ["900% 0%", "300% 0%"],
                        }}
                        transition={{
                            duration: 15, // Synchronized with primary layer
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    />

                    {/* Tertiary subtle pulse layer */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(${flowDirection > 0 ? 90 : -90}deg, 
                                transparent,
                                rgba(96, 165, 250, 0.02) 30%,
                                rgba(147, 51, 234, 0.05) 50%,
                                rgba(96, 165, 250, 0.02) 70%,
                                transparent 100%
                            )`,
                            backgroundSize: '600% 100%',
                            mixBlendMode: 'screen'
                        }}
                        animate={{
                            backgroundPosition: flowDirection > 0
                                ? ["150% 0%", "750% 0%"]
                                : ["750% 0%", "150% 0%"],
                        }}
                        transition={{
                            duration: 15, // Synchronized with other layers
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

// Conversion node component with adjusted icon opacity
const ConversionNode = ({
    x,
    y,
    label,
    icon,
    isCenter = false,
    delay = 0
}: {
    x: string,
    y: string,
    label: string,
    icon: React.ReactNode;
    isCenter?: boolean;
    delay?: number
}) => {
    return (
        <div
            className="absolute"
            style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                zIndex: 10
            }}
        >
            <div className="flex flex-col items-center">
                <motion.div
                    className={cn(
                        "relative flex items-center justify-center",
                        isCenter ? "w-16 h-16" : "w-12 h-12",
                        "rounded-xl"
                    )}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {/* Background remains unchanged */}
                    <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
                            boxShadow: isCenter
                                ? '0 4px 12px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(96, 165, 250, 0.2) inset'
                                : '0 4px 8px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(96, 165, 250, 0.15) inset'
                        }}
                    />
                    <div
                        className="absolute inset-[1px] rounded-[10px] opacity-30"
                        style={{
                            background: isCenter
                                ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.4) 0%, transparent 60%)'
                                : 'linear-gradient(135deg, rgba(96, 165, 250, 0.3) 0%, transparent 50%)'
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                            boxShadow: isCenter
                                ? ['0 0 8px rgba(96, 165, 250, 0.2)', '0 0 16px rgba(96, 165, 250, 0.3)', '0 0 8px rgba(96, 165, 250, 0.2)']
                                : ['0 0 6px rgba(96, 165, 250, 0.1)', '0 0 12px rgba(96, 165, 250, 0.2)', '0 0 6px rgba(96, 165, 250, 0.1)']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Icon with adjusted transparency */}
                    <motion.div
                        className={isCenter ? "text-blue-300" : "text-blue-300"}
                        style={{
                            filter: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))`,
                            opacity: 0.95 // Increased from 0.9 to 0.95 for even better visibility over lines
                        }}
                        animate={{
                            opacity: [0.9, 1, 0.9] // Adjusted animation range to match new base opacity
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {icon}
                    </motion.div>
                </motion.div>

                {/* Label styling remains unchanged */}
                <motion.div
                    className="text-xs text-gray-300 text-center font-medium mt-2.5"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + 0.2, duration: 0.5 }}
                >
                    {label}
                </motion.div>
            </div>
        </div>
    );
};

// Interactive showcase component
const InteractiveShowcase = ({ variant = 'default' }: { variant?: 'default' | 'funnel' }) => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    if (variant === 'funnel') {
        return (
            <motion.div
                className="relative h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/[0.08]"
                style={{ scale }}
                whileHover={{
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.05)"
                }}
            >
                {/* Premium grid background with refined animation */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px'
                    }}
                    animate={{
                        backgroundPosition: ["0px 0px", "24px 24px"]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Funnel visualization */}
                <div className="relative h-full pt-8">
                    {/* Adjusted Flow indicators positions */}
                    <FlowIndicator startY={60} endY={120} startWidth="90%" endWidth="70%" color="#60A5FA" />
                    <FlowIndicator startY={120} endY={180} startWidth="70%" endWidth="50%" color="#818CF8" />
                    <FlowIndicator startY={180} endY={230} startWidth="50%" endWidth="30%" color="#A78BFA" />

                    {/* Adjusted Funnel stages positions */}
                    <FunnelStage
                        y="12%"
                        width="90%"
                        icon={<BookOpen className="w-3.5 h-3.5" />}
                        label="Study Materials"
                        color="#60A5FA"
                        delay={0}
                    />
                    <FunnelStage
                        y="34%"
                        width="70%"
                        icon={<Brain className="w-3.5 h-3.5" />}
                        label="Active Learning"
                        color="#818CF8"
                        delay={0.1}
                    />
                    <FunnelStage
                        y="56%"
                        width="50%"
                        icon={<Lightbulb className="w-3.5 h-3.5" />}
                        label="Knowledge Mastery"
                        color="#A78BFA"
                        delay={0.2}
                    />
                    <FunnelStage
                        y="78%"
                        width="30%"
                        icon={<BarChart4 className="w-3.5 h-3.5" />}
                        label="Grade Improvement"
                        color="#2563EB"
                        delay={0.3}
                    />
                </div>
            </motion.div>
        );
    }

    // Default showcase - Conversion Engine visualization
    return (
        <motion.div
            className="relative h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/[0.08]"
            style={{ scale }}
            whileHover={{
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(96, 165, 250, 0.1) inset"
            }}
        >
            {/* Enhanced grid background with subtle animation */}
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                    opacity: 0.7
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "24px 24px"]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Subtle ambient glow */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.08) 0%, transparent 70%)'
            }} />

            {/* Perfectly centered conversion engine visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[440px] h-[260px]">
                    {/* Outer lines are now animated using the updated ConnectionLine component */}
                    <ConnectionLine start={{ x: "15%", y: "25%" }} end={{ x: "85%", y: "25%" }} />
                    <ConnectionLine start={{ x: "85%", y: "25%" }} end={{ x: "85%", y: "75%" }} />
                    <ConnectionLine start={{ x: "15%", y: "75%" }} end={{ x: "85%", y: "75%" }} />
                    <ConnectionLine start={{ x: "15%", y: "25%" }} end={{ x: "15%", y: "75%" }} />

                    {/* Inner diagonal lines also use the updated ConnectionLine component */}
                    <ConnectionLine start={{ x: "15%", y: "25%" }} end={{ x: "50%", y: "50%" }} />
                    <ConnectionLine start={{ x: "85%", y: "25%" }} end={{ x: "50%", y: "50%" }} />
                    <ConnectionLine start={{ x: "15%", y: "75%" }} end={{ x: "50%", y: "50%" }} />
                    <ConnectionLine start={{ x: "85%", y: "75%" }} end={{ x: "50%", y: "50%" }} />

                    {/* Nodes with swapped labels and icons */}
                    <ConversionNode x="50%" y="50%" label="AI Learning Hub" icon={<Brain className="w-6 h-6" />} isCenter={true} />
                    <ConversionNode x="15%" y="25%" label="AI Study Materials" icon={<BookOpen className="w-5 h-5" />} delay={0.1} />
                    <ConversionNode x="85%" y="28%" label="Knowledge Retention" icon={<Database className="w-5 h-5" />} delay={0.2} />
                    <ConversionNode x="15%" y="75%" label="Fast Learning" icon={<Zap className="w-5 h-5" />} delay={0.3} />
                    <ConversionNode x="85%" y="78%" label="Grade Success" icon={<Trophy className="w-5 h-5" />} delay={0.4} />
                </div>
            </div>
        </motion.div>
    );
};

export function EnterpriseFeatures(): React.JSX.Element {
    return (
        <section className="relative w-full overflow-hidden bg-slate-950 py-20 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <Badge className="mb-4" variant="outline">AI-Powered Learning</Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Master Any Subject{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            10x Faster
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto">
                        Upload any study material and our AI instantly transforms it into personalized learning tools.
                        Boost your GPA, ace exams, and master complex subjects in a fraction of the time.
                    </p>
                </div>

                {/* Main features grid with dynamic layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <FeatureCard
                        title="Higher Test Scores"
                        description="Our AI-generated flashcards and quizzes target exactly what you need to learn, resulting in significantly higher exam performance."
                        icon={<BookOpen className="w-6 h-6 text-blue-400" />}
                        className="h-full"
                    />
                    <FeatureCard
                        title="Study Time Cut in Half"
                        description="Personalized study plans focus on your weak areas first, eliminating wasted time and accelerating your progress through any subject."
                        icon={<Brain className="w-6 h-6 text-purple-400" />}
                        className="h-full"
                    />
                    <FeatureCard
                        title="24/7 Learning Anywhere"
                        description="Turn downtime into productive learning with audio lessons that reinforce key concepts while you're on the go, doubling your study hours."
                        icon={<Headphones className="w-6 h-6 text-green-400" />}
                        className="h-full"
                    />
                    <FeatureCard
                        title="Instant Comprehension"
                        description="Struggling with a concept? Our AI tutor breaks down complex topics into simple explanations which increases understanding."
                        icon={<Lightbulb className="w-6 h-6 text-amber-400" />}
                        className="h-full"
                    />
                </div>

                {/* Social proof section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <AnimatedStat
                        icon={<GraduationCap className="w-5 h-5" />}
                        text="Average GPA improvement of 0.8 points in one semester"
                    />
                    <AnimatedStat
                        icon={<Zap className="w-5 h-5" />}
                        text="Learn complex subjects up to 10x faster than traditional methods"
                    />
                    <AnimatedStat
                        icon={<BarChart4 className="w-5 h-5" />}
                        text="Users report higher test scores after just 2 weeks"
                    />
                    <AnimatedStat
                        icon={<Trophy className="w-5 h-5" />}
                        text="Trusted by students at 100+ universities worldwide"
                    />
                </motion.div>

                {/* Interactive showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-white">Adaptive Learning Path</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Our AI analyzes your progress and automatically adjusts difficulty, focusing more time on
                            weak areas and accelerating through concepts you've mastered.
                        </p>
                        <InteractiveShowcase variant="funnel" />
                    </motion.div>

                    <motion.div
                        className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-white">Complete Study Ecosystem</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Transform any document into multiple study formats—flashcards, practice tests, summaries, and
                            audio lessons—all optimized for maximum retention and faster mastery.
                        </p>
                        <InteractiveShowcase />
                    </motion.div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingElement className="w-64 h-64 bg-purple-500/10 -top-32 -left-32" delay={0} />
                <FloatingElement className="w-96 h-96 bg-blue-500/10 -bottom-48 -right-48" delay={0.5} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent from-0% to-slate-950 to-70%" />
            </div>
        </section>
    );
}
