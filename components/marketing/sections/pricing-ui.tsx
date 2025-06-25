'use client';

import * as React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingPlan {
    name: string;
    description: string;
    price: {
        monthly: number;
        annually: number;
    };
    features: PricingFeature[];
    buttonText: string;
    isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
    {
        name: 'Free',
        description: 'Start learning with basic features',
        price: {
            monthly: 0,
            annually: 0,
        },
        features: [
            { text: 'Limited document processing', included: true },
            { text: 'Standard AI models', included: true },
            { text: 'Unlimited study tools', included: true },
            { text: 'Unlimited usage', included: false },
            { text: 'Premium AI models', included: false },
            { text: 'Priority support', included: false },
        ],
        buttonText: 'Start Free - No Credit Card',
    },
    {
        name: 'Pro',
        description: 'Unlock unlimited learning potential',
        price: {
            monthly: 9.99,
            annually: 8.99, // 10% discount for annual
        },
        isPopular: true,
        features: [
            { text: 'Unlimited document processing', included: true },
            { text: 'Premium AI models', included: true },
            { text: 'Unlimited Study Tools', included: true },
            { text: 'Unlimited Usage', included: true },
            { text: 'Priority support', included: true },
        ],
        buttonText: 'Get Pro - Unlock Everything',
    },
];

export function PricingUI(): React.JSX.Element {
    const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annually'>('monthly');

    // Calculate annual savings percentage
    const annualSavings = Math.round(((pricingPlans[1].price.monthly * 12) - (pricingPlans[1].price.annually * 12)) / (pricingPlans[1].price.monthly * 12) * 100);

    return (
        <section id="pricing" className="w-full py-24 relative bg-gradient-to-b from-gray-950/10 to-gray-950/80 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute -top-1/4 left-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full opacity-50" />
            <div className="absolute -bottom-1/4 right-0 w-1/2 h-full bg-purple-600/5 blur-[150px] rounded-full opacity-50" />

            <div className="container relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Badge
                        variant="outline"
                        className="mb-6 bg-black/30 border-blue-500/30 text-blue-400 backdrop-blur-md text-sm px-4 py-1.5 rounded-full shadow-lg"
                    >
                        Flexible Pricing
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        <span className="text-white">Start Free, </span>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Upgrade Anytime
                        </span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
                        StudyZoom is 100% free to begin. Upgrade anytime for unlimited documents, premium AI models, and faster generation speeds.
                    </p>
                    <p className="text-sm text-gray-500 mb-12">
                        No credit card required for Free • Cancel Pro anytime
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <span className={cn("text-sm font-medium", billingCycle === 'monthly' ? 'text-white' : 'text-gray-400')}>
                            Monthly
                        </span>
                        <Switch
                            checked={billingCycle === 'annually'}
                            onCheckedChange={(checked) => setBillingCycle(checked ? 'annually' : 'monthly')}
                            className="data-[state=checked]:bg-blue-600"
                        />
                        <span className={cn("text-sm font-medium flex items-center gap-2", billingCycle === 'annually' ? 'text-white' : 'text-gray-400')}>
                            Annually
                            {billingCycle === 'annually' && annualSavings > 0 && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                    Save {annualSavings}%
                                </Badge>
                            )}
                        </span>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            whileInView={{ 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                transition: { 
                                    type: 'spring',
                                    damping: 15,
                                    stiffness: 100,
                                    delay: 0.1 * index
                                }
                            }}
                            whileHover={{
                                y: -5,
                                transition: { 
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 15
                                }
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative"
                        >
                            {/* Card */}
                            <div className={cn(
                                "h-full rounded-2xl p-6 backdrop-blur-md border transition-all duration-300",
                                plan.isPopular
                                    ? "bg-gradient-to-b from-blue-900/30 to-blue-900/10 border-blue-500/30 shadow-xl shadow-blue-900/20"
                                    : "bg-black/40 border-white/10 hover:border-white/20"
                            )}>
                                {/* Popular Badge */}
                                {plan.isPopular && (
                                    <div className="flex justify-center -mt-2 mb-3">
                                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-1.5 text-xs font-medium tracking-wide shadow-lg shadow-blue-500/20">
                                            ✨ Most Popular Choice
                                        </Badge>
                                    </div>
                                )}
                                <div className={cn("mb-5 px-2", {
                                    "border-l-4 border-blue-500 pl-4": plan.isPopular
                                })}>
                                    <h3 className={cn("text-2xl font-bold tracking-tight", {
                                        "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500": plan.isPopular,
                                        "text-white": !plan.isPopular
                                    })}>
                                        {plan.name}
                                    </h3>
                                    <p className={cn("mt-2 h-12", {
                                        "text-blue-100": plan.isPopular,
                                        "text-gray-400": !plan.isPopular
                                    })}>
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Pricing */}
                                <div className="mt-8 mb-8">
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold text-white">
                                            {plan.price.monthly === 0 ? 'Free' : 
                                             `$${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually}`}
                                        </span>
                                        {plan.price.monthly > 0 && (
                                            <span className="text-gray-400 ml-2">
                                                /{billingCycle === 'monthly' ? 'month' : 'month'}
                                                {billingCycle === 'annually' && (
                                                    <span className="block text-xs text-green-400">
                                                ${(plan.price.annually * 12).toFixed(2)} total per year
                                                <span className="text-green-300"> (save 10%)</span>
                                            </span>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    {plan.isPopular ? (
                                        <div className="space-y-2 mt-2">
                                            <p className="text-sm text-blue-400">
                                                Unlimited usage • Premium AI models
                                            </p>
                                            {billingCycle === 'annually' && (
                                                <div className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full inline-flex items-center">
                                                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Save 10% with annual billing
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Start learning today
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <motion.li 
                                            key={i} 
                                            className="flex items-start"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ 
                                                opacity: 1, 
                                                x: 0,
                                                transition: { 
                                                    delay: 0.1 * index + (i * 0.05),
                                                    ease: "easeOut"
                                                }
                                            }}
                                            viewport={{ once: true, margin: "-20%" }}
                                        >
                                            <motion.div 
                                                className={cn(
                                                    "rounded-full p-1 mr-3 mt-0.5 flex-shrink-0",
                                                    feature.included ? "bg-green-500/20 text-green-500" : "bg-gray-700/20 text-gray-500"
                                                )}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Check className="h-3 w-3" />
                                            </motion.div>
                                            <span className={cn(
                                                "text-sm",
                                                feature.included ? "text-gray-300" : "text-gray-500 line-through"
                                            )}>
                                                {feature.text}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <motion.div 
                                    className="relative group"
                                    whileHover={plan.isPopular ? { scale: 1.02 } : {}}
                                    whileTap={plan.isPopular ? { scale: 0.98 } : {}}
                                    initial={plan.isPopular ? { scale: 0.98 } : {}}
                                    animate={plan.isPopular ? { 
                                        scale: [0.98, 1.01, 0.98],
                                        transition: { 
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    } : {}}
                                >
                                    <AnimatePresence>
                                        {plan.isPopular && (
                                            <motion.div 
                                                className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 group-hover:duration-500"
                                                initial={{ opacity: 0 }}
                                                animate={{ 
                                                    opacity: 0.75,
                                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                                }}
                                                exit={{ opacity: 0 }}
                                                transition={{ 
                                                    duration: 6,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>
                                    <motion.div
                                        className={cn(
                                            "relative z-10 overflow-hidden",
                                            plan.isPopular ? "rounded-xl" : ""
                                        )}
                                        whileHover={plan.isPopular ? { y: -2 } : {}}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <Button
                                            className={cn(
                                                "w-full rounded-xl relative z-10 transition-all duration-300 group/button",
                                                plan.isPopular
                                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
                                                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                {plan.buttonText}
                                                <motion.span 
                                                    className={cn("inline-block ml-1", {
                                                        "text-blue-200": plan.isPopular,
                                                        "text-gray-300": !plan.isPopular
                                                    })}
                                                    animate={{
                                                        x: [0, 4, 0],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <ChevronRight className="h-4 w-4" />
                                                </motion.span>
                                            </span>
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
