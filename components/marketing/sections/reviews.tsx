'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, MessageSquareText, ShieldCheck } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Review {
    id: number;
    avatar: string;
    name: string;
    title: string;
    company: string;
    rating: number;
    text: string | React.ReactNode;
}

const placeholderReviews: Review[][] = [
    [
        {
            id: 1,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces',
            name: 'Alex Johnson',
            title: 'Pre-Med Student',
            company: 'Stanford University',
            rating: 5,
            text: <>I was spending $50/week on a tutor before StudyZoom. The <strong className="text-blue-400">AI-powered flashcards and quizzes</strong> helped me ace my MCAT while saving hundreds. The free tier alone is better than any paid app I've tried!</>,
        },
        {
            id: 2,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
            name: 'Samantha Lee',
            title: 'Computer Science Major',
            company: 'MIT',
            rating: 5,
            text: <>Finally, a study tool that <strong className="text-purple-400">understands code</strong>! The document-aware AI chat helped me debug assignments 3x faster. Upgraded to Pro after the first week—totally worth $9.99.</>,
        },
        {
            id: 3,
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
            name: 'Michael Chen',
            title: 'Law Student',
            company: 'Yale Law',
            rating: 4,
            text: 'The AI-generated case briefs and practice tests are game-changers. I was skeptical about another study app, but this one actually delivers on its promises.',
        },
    ],
    [
        {
            id: 4,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
            name: 'Jessica Miller',
            title: 'High School Senior',
            company: 'AP Student',
            rating: 5,
            text: <>Scored a 5 on AP Bio thanks to StudyZoom's <strong className="text-blue-400">adaptive learning</strong>. The way it creates quizzes from my notes is pure magic. And the price? Cheaper than a single tutoring session!</>,
        },
        {
            id: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
            name: 'David Rodriguez',
            title: 'Grad Student',
            company: 'Research Assistant',
            rating: 5,
            text: 'I was using 3 different apps before—one for flashcards, one for summaries, one for practice tests. StudyZoom replaced them all for less than the price of Netflix.',
        },
        {
            id: 6,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces',
            name: 'Emily White',
            title: 'Medical Resident',
            company: 'Johns Hopkins',
            rating: 5,
            text: <>The <strong className="text-purple-400">medical study tools</strong> are incredible. I can upload research papers and get instant summaries. This is lightyears ahead of traditional study methods.</>,
        },
    ],
    [
        {
            id: 7,
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
            name: 'Chris Brown',
            title: 'Engineering Student',
            company: 'Georgia Tech',
            rating: 5,
            text: <>Went from a C+ to A- in Thermodynamics using StudyZoom's <strong className="text-blue-400">practice test generator</strong>. The way it explains complex concepts in simple terms is unreal for $9.99/mo.</>,
        },
        {
            id: 8,
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
            name: 'Laura Davis',
            title: 'Language Student',
            company: 'Duolingo Dropout',
            rating: 4,
            text: 'Tried every language app out there. StudyZoom actually helps me remember vocabulary by connecting it to my existing knowledge. The spaced repetition is perfectly tuned.',
        },
        {
            id: 9,
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces',
            name: 'Kevin Wilson',
            title: 'Non-Traditional Student',
            company: 'Back to School at 35',
            rating: 5,
            text: <>As someone returning to school after years, StudyZoom's <strong className="text-purple-400">AI tutor</strong> made me feel like I had a personal teacher. Worth every penny of the Pro subscription.</>,
        },
    ],
];

const ReviewCard = ({ review }: { review: Review }) => {
    return (
        <motion.div
            className="group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] hover:border-blue-500/30 hover:bg-gradient-to-br hover:from-blue-500/5 hover:to-blue-500/10 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-blue-400/30 group-hover:ring-blue-400/50 transition-all duration-300">
                        <Image
                            src={review.avatar}
                            alt={`${review.name}'s avatar`}
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">{review.name}</h4>
                            <Badge variant="outline" className="bg-green-500/10 border-green-500/20 text-green-400 text-[10px] px-1.5 py-0 h-4">
                                <ShieldCheck className="h-2.5 w-2.5 mr-1" />
                                Verified
                            </Badge>
                        </div>
                        <p className="text-xs text-gray-400">{review.title} • {review.company}</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                    />
                ))}
                <span className="ml-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                    {review.rating}.0/5.0
                </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{review.text}</p>
            
            {/* Subtle hover effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 pointer-events-none transition-all duration-300" />
        </motion.div>
    );
};

const ReviewColumn = ({ reviews, duration = 60, className = '' }: { reviews: Review[], duration?: number, className?: string }) => {
    const [items, setItems] = React.useState<React.ReactNode[]>([]);
    const [animationKey, setAnimationKey] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const itemHeight = 300; // Approximate height of each review card + gap
    
    // Create multiple sets of reviews for seamless looping
    React.useEffect(() => {
        const createItems = () => {
            // Create 3 sets of reviews to ensure smooth continuous scrolling
            const reviewSets = 3;
            const items = [];
            
            for (let i = 0; i < reviewSets; i++) {
                items.push(
                    ...reviews.map((review, index) => (
                        <div key={`${review.id}-${index}-${i}`} className="mb-6">
                            <ReviewCard review={review} />
                        </div>
                    ))
                );
            }
            
            return items;
        };
        
        setItems(createItems());
    }, [reviews]);
    
    // Calculate total height for the container
    const containerHeight = itemHeight * reviews.length * 3; // 3 sets of reviews
    
    // Calculate animation duration based on number of reviews
    const calculatedDuration = Math.max(30, Math.min(90, duration * (reviews.length / 3)));
    
    // Reset animation periodically to prevent any potential drift
    React.useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, calculatedDuration * 1000);
        
        return () => clearInterval(interval);
    }, [isPaused, calculatedDuration]);

    return (
        <div 
            className={cn('relative overflow-hidden', className)}
            style={{ height: '100%' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                key={animationKey}
                initial={{ y: 0 }}
                animate={{
                    y: `-${itemHeight * reviews.length}px`,
                }}
                transition={{
                    duration: calculatedDuration,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
                style={{
                    position: 'relative',
                    height: `${containerHeight}px`,
                }}
            >
                {items}
            </motion.div>
        </div>
    );
};

export function Reviews(): React.JSX.Element {
    const [isMobile, setIsMobile] = React.useState(false);

    // Check if mobile on mount and window resize
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };
        
        // Initial check
        checkMobile();
        
        // Add event listener
        window.addEventListener('resize', checkMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="testimonials" className="relative w-full py-16 md:py-24 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute -top-1/4 left-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full opacity-50 animate-pulse-slow-left" />
            <div className="absolute -bottom-1/4 right-0 w-1/2 h-full bg-purple-600/5 blur-[150px] rounded-full opacity-50 animate-pulse-slow-right" />

            <div className="w-full px-0">
                <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge
                        variant="outline"
                        className="mb-4 sm:mb-6 bg-blue-500/10 border-blue-400/30 text-blue-400 backdrop-blur-md text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg"
                    >
                        <MessageSquareText className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        Real Students, Real Results
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 px-4">
                        <span className="text-white">Why Students Love</span>{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            StudyZoom
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
                        Join thousands of students who are acing their classes with StudyZoom's AI-powered study tools. More features, better results, and more affordable than any tutor or study app.
                    </p>
                </motion.div>

                {/* Boxed container for reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative w-full max-w-[1200px] mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-2xl"
                >
                    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden">
                        <div className="absolute inset-0 flex justify-center gap-4 sm:gap-6 md:gap-8 perspective">
                            <div className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px]">
                                <ReviewColumn 
                                    reviews={placeholderReviews[0]} 
                                    duration={isMobile ? 90 : 70} 
                                    className="w-full review-column" 
                                />
                            </div>
                            <div className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] mt-[-120px] sm:mt-[-150px]">
                                <ReviewColumn 
                                    reviews={placeholderReviews[1]} 
                                    duration={isMobile ? 110 : 90} 
                                    className="w-full review-column" 
                                />
                            </div>
                            <div className="hidden lg:block flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px]">
                                <ReviewColumn 
                                    reviews={placeholderReviews[2]} 
                                    duration={isMobile ? 100 : 80} 
                                    className="w-full review-column" 
                                />
                            </div>
                        </div>
                        
                        {/* Scroll indicator for mobile */}
                        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent flex items-end justify-center pb-4">
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-400 mb-1">Swipe to see more</span>
                                <div className="w-8 h-1 bg-gray-600 rounded-full overflow-hidden">
                                    <div className="w-1/2 h-full bg-blue-400 rounded-full animate-pan" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            </div>

            {/* CSS for animations and layout */}
            <style jsx global>{`
                .mask-image-b {
                    mask-image: linear-gradient(to bottom, black 10%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent 100%);
                }
                .perspective {
                    perspective: 1000px;
                }
                .review-column {
                    transform-style: preserve-3d;
                }
                @keyframes pulse-slow-left {
                    0%, 100% { transform: translate(-10%, -10%) scale(1); opacity: 0.4; }
                    50% { transform: translate(10%, 10%) scale(1.1); opacity: 0.6; }
                }
                @keyframes pulse-slow-right {
                    0%, 100% { transform: translate(10%, 10%) scale(1); opacity: 0.4; }
                    50% { transform: translate(-10%, -10%) scale(1.1); opacity: 0.6; }
                }
                .animate-pulse-slow-left {
                    animation: pulse-slow-left 15s infinite ease-in-out;
                }
                .animate-pulse-slow-right {
                    animation: pulse-slow-right 15s infinite ease-in-out;
                }
                @keyframes pan {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
                .animate-pan {
                    animation: pan 2s ease-in-out infinite alternate;
                }
                
                /* Responsive adjustments */
                @media (max-width: 640px) {
                    .review-column {
                        min-width: 280px;
                    }
                }
            `}</style>
        </section>
    );
}
