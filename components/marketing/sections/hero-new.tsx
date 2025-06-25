'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Check, Clock, Star, Zap, BookOpen, TrendingUp, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAdaptiveUI } from '@/hooks/use-adaptive-ui';
import ScrollReveal from '@/components/ui/animations/ScrollReveal';
import GradientText from '@/components/ui/animations/GradientText';

// Define a type for the icon map keys
type IconType = 'BookOpen' | 'DollarSign' | 'TrendingUp' | 'Users' | 'Star';

const iconMap: Record<IconType, React.ElementType> = {
    BookOpen,
    DollarSign: TrendingUp, // Using TrendingUp as fallback for DollarSign
    TrendingUp,
    Users,
    Star
};

// Define interface for notification items
interface Notification {
    iconType: IconType;
    title: string;
    description: string;
    time: string;
    color: string;
    highlight?: boolean;
}

const notifications: Notification[] = [
    {
        iconType: 'BookOpen',
        title: "Biology 101 Midterm",
        description: "Scored 94%, up from 62% last exam",
        time: "2m ago",
        color: "text-green-400",
        highlight: true
    },
    {
        iconType: 'TrendingUp',
        title: "SAT Exam Results",
        description: "Scored 1580 (99th percentile), 200-point improvement",
        time: "15m ago",
        color: "text-blue-400",
        highlight: true
    },
    {
        iconType: 'Users',
        title: "Organic Chemistry",
        description: "Final grade: B+, up from C- last semester",
        time: "1h ago",
        color: "text-purple-400",
        highlight: true
    },
    {
        iconType: 'Star',
        title: "Biochemistry Final",
        description: "98% final grade, perfect exam scores",
        time: "2h ago",
        color: "text-yellow-400",
        highlight: true
    }
];

// HeroPill component removed to match reference implementation

// Add keyframe animations at the top level of the file
const keyframes = `
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  
  @keyframes shineEffect {
    0% { opacity: 0; background-position: -200% 0; }
    50% { opacity: 0.5; background-position: 100% 0; }
    100% { opacity: 0; background-position: 200% 0; }
  }
`;

// Add a style component for the keyframes
const KeyframeStyles = () => (
  <style jsx global>{keyframes}</style>
);

function HeroTitle() {
    return (
        <h1 className="text-center font-bold tracking-tight max-w-[95%] mx-auto">
            <GradientText className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[6.2rem] 2xl:text-[7.2rem] [text-shadow:_0_1px_3px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_3px_rgb(255_255_255_/_10%)] transition-all duration-300 leading-[1.1]">
                Boost Your Grades
            </GradientText>
            <div className="mt-2 sm:mt-3 md:mt-4">
                <GradientText
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[6.2rem] 2xl:text-[7.2rem] [text-shadow:_0_1px_3px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_3px_rgb(255_255_255_/_10%)] transition-all duration-300 leading-[1.1]"
                    from="#4B7BF5"
                    to="#9181F2"
                    animate={true}
                >
                    Master Any Subject
                </GradientText>
            </div>
        </h1>
    );
}

function HeroDescription() {
    return (
        <motion.div
            className="mt-4 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-10 text-center text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto font-medium leading-relaxed transition-all duration-300"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
        >
            <span className="inline-block">
                <span className="font-semibold relative text-foreground">
                    Get Higher GPA & Learn Complex Subjects
                    {' '}
                    <motion.span
                        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 font-semibold relative group inline-block"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        whileHover={{
                            scale: 1.05,
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-purple-400/0 dark:from-blue-500/30 dark:via-blue-400/50 dark:to-purple-500/30 blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                animation: "pulseGlow 3s ease-in-out infinite"
                            }}
                        ></span>
                        <span className="relative inline-block text-white">
                            10x Faster
                            <span
                                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-md opacity-0"
                                style={{
                                    animation: "shineEffect 3s ease-in-out infinite",
                                    backgroundSize: "200% 100%"
                                }}
                            />
                        </span>
                    </motion.span>
                </span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                >
                    .{" "}
                </motion.span>
            </span>
            <span className="inline-block mt-1">
                <span>Perfect for students and professionals who want{' '}
                    <motion.span
                        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 font-semibold relative group inline-block"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        whileHover={{
                            scale: 1.05,
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-purple-400/0 dark:from-blue-500/30 dark:via-blue-400/50 dark:to-purple-500/30 blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                animation: "pulseGlow 3s ease-in-out infinite"
                            }}
                        ></span>
                        <span className="relative inline-block text-white">
                            results—fast
                            <span
                                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-md opacity-0"
                                style={{
                                    animation: "shineEffect 3s ease-in-out infinite",
                                    backgroundSize: "200% 100%"
                                }}
                            />
                        </span>
                    </motion.span>.
                </span>
            </span>
        </motion.div>
    );
}

function HeroButtons() {
    return (
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5 items-center transition-all duration-300">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    size="lg"
                    className="relative overflow-hidden bg-transparent text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto group"
                >
                    {/* Galaxy gradient background */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-[#4B7BF5] via-[#9181F2] to-[#4B7BF5] opacity-100 group-hover:opacity-90 transition-all duration-300"
                        style={{
                            backgroundSize: '200% 100%',
                            animation: 'gradientMove 8s linear infinite'
                        }}
                    />
                    {/* Button text with shine effect */}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started Now
                        <div className="w-px h-4 bg-white/20" />
                        <span className="text-sm opacity-80">Free Trial</span>
                    </span>
                </Button>
            </motion.div>

            <Button
                size="lg"
                variant="outline"
                className="relative overflow-hidden bg-transparent backdrop-blur-sm border-white/10 text-white hover:text-white hover:bg-white/5 rounded-full px-8 py-6 text-lg w-full sm:w-auto group"
            >
                <span className="relative z-10">
                    Explore Features
                </span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
        </div>
    );
}

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed bottom-7 right-7 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group relative p-3.5 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {/* Background with gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4B7BF5] to-[#9181F2] opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4B7BF5] to-[#9181F2] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                {/* Icon */}
                <ArrowUp className="w-5 h-5 text-white relative z-10" />
            </motion.button>
        </motion.div>
    );
}

function NotificationFeed() {
    const [activeNotifications, setActiveNotifications] = useState(notifications);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // Clear old notification state to force update
            localStorage.removeItem('notificationState');

            // Set new notifications
            setActiveNotifications(notifications);
            localStorage.setItem('notificationState', JSON.stringify(notifications));

            // Add version to localStorage to handle future updates
            localStorage.setItem('notificationVersion', '2.0');
        } catch (error) {
            console.error('Error initializing notifications:', error);
            setActiveNotifications(notifications);
        } finally {
            // Artificial delay for smooth transition
            setTimeout(() => setIsLoading(false), 800);
        }
    }, []);

    // Save notifications whenever they change (only if they don't match the default)
    useEffect(() => {
        try {
            const currentNotifications = JSON.stringify(activeNotifications);
            const defaultNotifications = JSON.stringify(notifications);

            if (currentNotifications !== defaultNotifications) {
                localStorage.setItem('notificationState', currentNotifications);
            }
        } catch (error) {
            console.error('Error saving notifications:', error);
        }
    }, [activeNotifications]);

    // Skeleton loader for notifications
    const renderSkeleton = () => (
        <div className="divide-y divide-gray-200 dark:divide-white/[0.08]">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="p-3 sm:p-4 animate-pulse">
                    <div className="flex items-center gap-2.5 sm:gap-4">
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gray-200 dark:bg-white/[0.08]"></div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="h-3 sm:h-3.5 w-3/4 bg-gray-200 dark:bg-white/[0.08] rounded"></div>
                                <div className="h-2.5 sm:h-3 w-14 sm:w-16 bg-gray-200 dark:bg-white/[0.08] rounded ml-1.5 sm:ml-2"></div>
                            </div>
                            <div className="h-2.5 sm:h-3 w-full bg-gray-200 dark:bg-white/[0.08] rounded mt-1.5 sm:mt-2"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Use our adaptive UI hook to respond to screen size changes
    const { width } = useAdaptiveUI();

    // Use static classes based on screen size to avoid hydration mismatch
    let notificationClasses = 'absolute rounded-[32px] flex flex-col transition-all duration-500 shadow-2xl overflow-hidden';

    // Add size-specific classes - these will be consistent between server and client
    if (width < 640) {
        // Mobile mode - notification feed appears below main content
        notificationClasses += ' relative static mx-auto mt-8 w-full max-w-[380px] h-[400px]';
    } else if (width >= 640 && width < 1024) {
        // Tablet mode - still below content but with adjusted sizing
        notificationClasses += ' relative static mx-auto mt-10 w-[380px] h-[450px]';
    } else if (width >= 1024 && width < 1280) {
        // Laptop mode - positioned to the right as before
        notificationClasses += ' top-[140px] right-[40px] w-[300px] min-h-[480px] lg:block origin-top-right scale-[0.9]';
    } else if (width >= 1280 && width < 1536) {
        // Large desktop - fixed gaps and improved alignment
        notificationClasses += ' top-[130px] right-[5.5%] w-[340px] min-h-[540px] xl:block origin-top-right scale-[0.95]';
    } else {
        // Extra large screens - optimized for large monitors with no gaps
        notificationClasses += ' top-[120px] right-[6.5%] w-[380px] h-[560px] 2xl:block origin-top-right scale-100';
    }

    // Additional styles that don't affect hydration
    const additionalStyles: React.CSSProperties = {
        boxShadow: '0 14px 35px -10px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.12)',
        maxHeight: '90vh',
        zIndex: 20,
        // Ensure consistent rendering between server and client
        visibility: 'visible'
    };

    return (
        <div
            className={notificationClasses}
            style={additionalStyles}
        >
            {/* Premium border effect container */}
            <div className="absolute inset-0 rounded-[32px] p-[2px] overflow-visible">
                {/* Animated gradient border */}
                <div
                    className="absolute -inset-[0.5px] rounded-[32px] bg-gradient-to-r from-[#4B7BF5] via-[#9181F2] to-[#4B7BF5] dark:opacity-100 opacity-80"
                    style={{
                        backgroundSize: '200% 100%',
                        animation: 'gradientFlow 4s linear infinite'
                    }}
                >
                    {/* Glow effect */}
                    <div className="absolute -inset-[1px] rounded-[32px] blur-md bg-gradient-to-r from-[#4B7BF5] via-[#9181F2] to-[#4B7BF5] dark:opacity-60 opacity-40" />
                </div>

                {/* Main content container */}
                <div className="relative h-full w-full rounded-[32px] bg-white dark:bg-[#0A0A1B] overflow-hidden shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10">
                    {/* Content */}
                    <motion.div
                        className="relative h-full flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Header */}
                        <motion.div
                            className="p-4 sm:p-5 border-b border-gray-200 dark:border-white/[0.08] bg-gradient-to-r from-blue-50 to-purple-50 dark:from-[#0f0f2a] dark:to-[#1a1a3a]"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                        StudyZoom Updates
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-2.5 sm:px-3 py-1 rounded-full border border-green-500/20 backdrop-blur-sm">
                                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
                                    <span className="text-[10px] sm:text-xs font-medium text-green-700 dark:text-green-500">Live from students</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Notifications */}
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{ minHeight: 0, paddingBottom: '0.75rem' }}>
                            {isLoading ? renderSkeleton() : (
                                <div className="divide-y divide-gray-200 dark:divide-white/[0.08]">
                                    {activeNotifications.map((notification, index) => {
                                        const IconComponent = iconMap[notification.iconType] as React.ElementType;
                                        return (
                                            <motion.div
                                                key={index}
                                                className={`relative p-6 sm:p-7 xl:p-8 2xl:p-8 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-300 cursor-pointer group ${notification.highlight
                                                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/10 dark:to-purple-500/10'
                                                    : 'bg-transparent'
                                                    }`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                            >
                                                <div className="flex items-center gap-2.5 sm:gap-4">
                                                    {/* Enhanced icon container with premium effect */}
                                                    <motion.div
                                                        whileHover={{ scale: 1.05, rotate: [0, -10, 10, -10, 0] }}
                                                        className={`relative p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-gray-100/80 to-gray-50/80 dark:from-[#1C1C2E]/80 dark:to-[#1C1C2E]/60 backdrop-blur-sm ${notification.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                                    >
                                                        {/* Animated gradient border */}
                                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            style={{
                                                                backgroundSize: '200% 100%',
                                                                animation: 'gradientFlow 4s linear infinite'
                                                            }}
                                                        />
                                                        {/* Glow effect */}
                                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        <IconComponent className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 relative z-10" />
                                                    </motion.div>

                                                    <div className="flex-1 min-w-0 group">
                                                        <div className="flex items-center justify-between">
                                                            <p className={`text-xs sm:text-sm font-medium truncate transition-all duration-300 transform group-hover:translate-x-1 ${notification.highlight
                                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold'
                                                                : 'text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400'
                                                                }`}>
                                                                {notification.title}
                                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                                            </p>
                                                            <p className="text-[10px] sm:text-xs text-gray-900 dark:text-gray-500 ml-1.5 sm:ml-2">
                                                                {notification.time}
                                                            </p>
                                                        </div>
                                                        <p className="text-[10px] sm:text-xs text-gray-900 dark:text-gray-400 mt-0.5 sm:mt-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-all duration-300 transform group-hover:translate-x-0.5">
                                                            {notification.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
}

export default function Hero() {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { width } = useAdaptiveUI();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate the appropriate transform, padding, and scaling based on screen width
    const getMainContentStyles = () => {
        // For mobile screens, center the content without any transform
        if (width < 640) {
            return {
                transform: 'none',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                maxWidth: '100%',
                zIndex: 10,
            };
        }

        // For small to medium screens (640px to 1024px)
        if (width >= 640 && width < 1024) {
            return {
                transform: 'none',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                maxWidth: '100%',
                zIndex: 10,
            };
        }


        // For large screens with notification visible (1024px to 1280px)
        if (width >= 1024 && width < 1280) {
            // Calculate content position - adjusted for better balance with larger notification
            const transformX = -20 + ((width - 1024) / (1280 - 1024)) * 4;

            // Calculate right padding to make space for notification
            const rightPadding = 10 - ((width - 1024) / (1280 - 1024)) * 2;

            return {
                transform: `translateX(${transformX}%)`,
                paddingLeft: '2rem',
                paddingRight: `${rightPadding}rem`,
                maxWidth: '82%',
                zIndex: 10,
            };
        }
        // For extra large screens (1280px to 1536px)
        if (width >= 1280 && width < 1536) {
            // Smoother transform adjustment with better centering
            const transformX = -16 + ((width - 1280) / (1536 - 1280)) * 6;

            return {
                transform: `translateX(${transformX}%)`,
                paddingLeft: '2rem',
                paddingRight: '5.5rem',
                maxWidth: '87%',
                zIndex: 10,
            };
        }

        // For very large screens (1536px and above)
        return {
            transform: 'translateX(-9%)',
            paddingLeft: '2rem',
            paddingRight: '6.5rem',
            maxWidth: '90%',
            zIndex: 10,
        };
    };

    const mainContentStyles = getMainContentStyles();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full pb-20 pt-20 px-4">
            <KeyframeStyles />
            
            {/* Add a viewport height listener for responsive adjustments */}
            <div className="hidden">
                {(() => {
                    // Use IIFE to execute this code and return null
                    if (typeof window !== 'undefined') {
                        // Use a separate effect for viewport height changes
                        useEffect(() => {
                            const viewportHeight = window.innerHeight;
                            const handleResize = () => {
                                // Force re-render when viewport height changes significantly
                                if (Math.abs(window.innerHeight - viewportHeight) > 50) {
                                    // Just trigger a re-render by using the existing state setter
                                    setShowScrollButton(prev => prev);
                                }
                            };

                            window.addEventListener('resize', handleResize);
                            return () => window.removeEventListener('resize', handleResize);
                        }, []);
                    }
                    return null; // Return null to satisfy React's need for a ReactNode
                })()}
            </div>

            {/* Only show notification feed on the side for larger screens */}
            {isMounted && width >= 1024 && <NotificationFeed />}

            {/* Main content - positioned based on reference UI with adaptive positioning */}
            <div
                className="relative container mx-auto transition-all duration-300"
                style={mainContentStyles}
            >
                <ScrollReveal>
                    <h1 className="text-center font-bold tracking-tight max-w-[95%] mx-auto">
                        <GradientText className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[6.2rem] 2xl:text-[7.2rem] [text-shadow:_0_1px_3px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_3px_rgb(255_255_255_/_10%)] transition-all duration-300 leading-[1.1]">
                            Boost Your Grades
                        </GradientText>
                        <div className="mt-2 sm:mt-3 md:mt-4">
                            <GradientText
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[6.2rem] 2xl:text-[7.2rem] [text-shadow:_0_1px_3px_rgb(0_0_0_/_10%)] dark:[text-shadow:_0_1px_3px_rgb(255_255_255_/_10%)] transition-all duration-300 leading-[1.1]"
                                from="#4B7BF5"
                                to="#9181F2"
                                animate={true}
                            >
                                Master Any Subject
                            </GradientText>
                        </div>
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <motion.div
                        className="mt-4 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-10 text-center text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto font-medium leading-relaxed transition-all duration-300"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="inline-block">
                            <span className="font-semibold relative text-foreground">
                                Get Higher GPA & Learn Complex Subjects
                                {' '}
                                <motion.span
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 font-semibold relative group inline-block"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-purple-400/0 dark:from-blue-500/30 dark:via-blue-400/50 dark:to-purple-500/30 blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            animation: "pulseGlow 3s ease-in-out infinite"
                                        }}
                                    ></span>
                                    <span className="relative inline-block text-white">
                                        10x Faster
                                        <span
                                            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-md opacity-0"
                                            style={{
                                                animation: "shineEffect 3s ease-in-out infinite",
                                                backgroundSize: "200% 100%"
                                            }}
                                        />
                                    </span>
                                </motion.span>
                            </span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 1.2 }}
                            >
                                .{" "}
                            </motion.span>
                        </span>
                        <span className="inline-block mt-1">
                            <span>Perfect for students and professionals who want{' '}
                                <motion.span
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 font-semibold relative group inline-block"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-purple-400/0 dark:from-blue-500/30 dark:via-blue-400/50 dark:to-purple-500/30 blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            animation: "pulseGlow 3s ease-in-out infinite"
                                        }}
                                    ></span>
                                    <span className="relative inline-block text-white">
                                        results—fast
                                        <span
                                            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-md opacity-0"
                                            style={{
                                                animation: "shineEffect 3s ease-in-out infinite",
                                                backgroundSize: "200% 100%"
                                            }}
                                        />
                                    </span>
                                </motion.span>.
                            </span>
                        </span>
                    </motion.div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5 items-center transition-all duration-300">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                className="relative overflow-hidden bg-transparent text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto group"
                            >
                                {/* Galaxy gradient background */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-[#4B7BF5] via-[#9181F2] to-[#4B7BF5] opacity-100 group-hover:opacity-90 transition-all duration-300"
                                    style={{
                                        backgroundSize: '200% 100%',
                                        animation: 'gradientMove 8s linear infinite'
                                    }}
                                />
                                {/* Button text with shine effect */}
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Get Started Now
                                    <div className="w-px h-4 bg-white/20" />
                                    <span className="text-sm opacity-80">Free Trial</span>
                                </span>
                            </Button>
                        </motion.div>

                        <Button
                            size="lg"
                            variant="outline"
                            className="relative overflow-hidden bg-transparent backdrop-blur-sm border-white/10 text-white hover:text-white hover:bg-white/5 rounded-full px-8 py-6 text-lg w-full sm:w-auto"
                        >
                            <span className="relative z-10">
                                Explore Features
                            </span>
                        </Button>
                    </div>
                </ScrollReveal>

                {/* Show notification feed below content on mobile/small screens */}
                {isMounted && width < 1024 && <div className="w-full mt-8 sm:mt-10"><NotificationFeed /></div>}
            </div>

            {/* Show notification feed below content on mobile/tablet */}
            {isMounted && (width < 1024) && (
                <div className="relative w-full mt-16">
                    <div className="container mx-auto px-4">
                        <NotificationFeed />
                    </div>
                </div>
            )}

            {/* Scroll to top button */}
            <AnimatePresence>
                {showScrollButton && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <ScrollToTop />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
    // Clean up the old implementation since we have a new one above
}
