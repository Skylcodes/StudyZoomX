'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function GradientText({
    children,
    className = '',
    from = '#4B7BF5',
    to = '#9181F2',
    animate = true,
    duration = 2,
}: {
    children: React.ReactNode;
    className?: string;
    from?: string;
    to?: string;
    animate?: boolean;
    duration?: number;
}) {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    // Light mode colors are slightly more vibrant
    const lightFrom = '#4B7BF5';
    const lightTo = '#8B5CF6';

    return (
        <motion.span
            className={cn(
                'inline-block bg-clip-text text-transparent bg-gradient-to-r',
                isLight ? 'gradient-text-light' : '',
                className
            )}
            style={
                !isLight
                    ? {
                        backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
                    }
                    : undefined
            }
            animate={
                animate
                    ? {
                        backgroundPosition: ['0%', '100%', '0%'],
                    }
                    : undefined
            }
            transition={
                animate
                    ? {
                        duration,
                        repeat: Infinity,
                        ease: 'linear',
                    }
                    : undefined
            }
        >
            {children}
        </motion.span>
    );
}
