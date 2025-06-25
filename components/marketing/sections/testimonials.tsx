'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Marquee } from '@/components/marketing/fragments/marquee';
import { AppInfo } from '@/constants/app-info';
import { cn } from '@/lib/utils';

const DATA = [
    {
        name: 'Sarah Johnson',
        role: 'Medical Student, Harvard University',
        img: 'https://randomuser.me/api/portraits/women/44.jpg',
        description: (
            <p>
                {AppInfo.APP_NAME} has completely transformed how I study for my medical boards.{' '}
                <strong>I improved my test scores by 30% in just one month</strong> using their
                AI-powered flashcard system. The spaced repetition algorithm is incredibly effective.
            </p>
        )
    },
    {
        name: 'Michael Chen',
        role: 'Computer Science Major, Stanford',
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
        description: (
            <p>
                The AI tutor in {AppInfo.APP_NAME} explains complex programming concepts in a way that finally
                makes sense. <strong>I aced my algorithms class thanks to their interactive coding exercises.</strong>
            </p>
        )
    },
    {
        name: 'Emily Rodriguez',
        role: 'Law Student, NYU',
        img: 'https://randomuser.me/api/portraits/women/68.jpg',
        description: (
            <p>
                {AppInfo.APP_NAME}'s case brief generator is a game-changer for law students.{' '}
                <strong>I save 10+ hours per week</strong> on case preparation, and my grades have never been better.
            </p>
        )
    },
    {
        name: 'David Kim',
        role: 'Engineering Student, MIT',
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        description: (
            <p>
                The equation solver with step-by-step explanations helped me master differential equations.
                <strong> I went from barely passing to the top of my class</strong> in just one semester.
            </p>
        )
    },
    {
        name: 'Olivia Martinez',
        role: 'Pre-Med, Johns Hopkins',
        img: 'https://randomuser.me/api/portraits/women/22.jpg',
        description: (
            <p>
                {AppInfo.APP_NAME}'s MCAT prep materials are incredible. The AI adapts to your learning style and
                focuses on your weak areas. <strong>Scored in the 98th percentile on my first attempt!</strong>
            </p>
        )
    },
    {
        name: 'James Wilson',
        role: 'Business Student, Wharton',
        img: 'https://randomuser.me/api/portraits/men/63.jpg',
        description: (
            <p>
                The financial modeling templates and case study guides are top-notch.{' '}
                <strong>Landed my dream investment banking internship thanks to {AppInfo.APP_NAME}.</strong>
            </p>
        )
    },
    {
        name: 'Sophia Patel',
        role: 'Language Student, Sorbonne',
        img: 'https://randomuser.me/api/portraits/women/29.jpg',
        description: (
            <p>
                Learning French with {AppInfo.APP_NAME}'s AI conversation partner has been amazing.{' '}
                <strong>Became fluent in 6 months</strong> - something I never thought possible!
            </p>
        )
    },
    {
        name: 'Ethan Brown',
        role: 'High School Senior',
        img: 'https://randomuser.me/api/portraits/men/18.jpg',
        description: (
            <p>
                {AppInfo.APP_NAME} helped me get into my dream college! The SAT prep tools are incredible, and the
                college essay editor is magical. <strong>Accepted to 7 out of 8 Ivy Leagues!</strong>
            </p>
        )
    },
    {
        name: 'Ava Garcia',
        role: 'PhD Candidate, Neuroscience',
        img: 'https://randomuser.me/api/portraits/women/51.jpg',
        description: (
            <p>
                The research paper summarizer and citation manager have saved me countless hours on my dissertation.
                <strong> My advisor is amazed by my productivity.</strong>
            </p>
        )
    },
    {
        name: 'Noah Martinez',
        role: 'Art History Major, Yale',
        img: 'https://randomuser.me/api/portraits/men/47.jpg',
        description: (
            <p>
                The visual learning tools in {AppInfo.APP_NAME} are perfect for art history. The image recognition
                feature that identifies and explains artworks is mind-blowing. <strong>Never enjoyed studying this much!</strong>
            </p>
        )
    },
    {
        name: 'Isabella Thompson',
        role: 'Nursing Student, UCLA',
        img: 'https://randomuser.me/api/portraits/women/37.jpg',
        description: (
            <p>
                The NCLEX prep materials and virtual patient simulations are incredibly realistic.{' '}
                <strong>Passed my boards on the first try!</strong> Couldn't have done it without {AppInfo.APP_NAME}.
            </p>
        )
    },
    {
        name: 'William Lee',
        role: 'Music Theory Major, Juilliard',
        img: 'https://randomuser.me/api/portraits/men/82.jpg',
        description: (
            <p>
                The ear training and music theory exercises are phenomenal. {AppInfo.APP_NAME} helped me develop
                perfect pitch. <strong>My composition professor says my progress is remarkable.</strong>
            </p>
        )
    }
];

export function Testimonials(): React.JSX.Element {
    return (
        <GridSection hideVerticalGridLines>
            <div className="container border-x py-20 md:border-none">
                <h2 className="mb-8 text-center text-3xl font-semibold md:text-5xl lg:text-left">
                    What students are saying
                </h2>
                <div className="relative mt-6 max-h-[540px] overflow-hidden">
                    <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
                        {Array(Math.ceil(DATA.length / 3))
                            .fill(0)
                            .map((_, i) => (
                                <Marquee
                                    vertical
                                    key={i}
                                    className={cn({
                                        '[--duration:60s]': i === 1,
                                        '[--duration:30s]': i === 2,
                                        '[--duration:70s]': i === 3
                                    })}
                                >
                                    {DATA.slice(i * 3, (i + 1) * 3).map((testimonial, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: Math.random() * 0.4,
                                                duration: 1
                                            }}
                                            className="mb-4 flex w-full break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl border bg-background p-4 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                                        >
                                            <div className="select-none text-sm font-normal text-muted-foreground">
                                                {testimonial.description}
                                                <div className="flex flex-row py-1">
                                                    <Star className="size-4 fill-yellow-500 text-yellow-500" />
                                                    <Star className="size-4 fill-yellow-500 text-yellow-500" />
                                                    <Star className="size-4 fill-yellow-500 text-yellow-500" />
                                                    <Star className="size-4 fill-yellow-500 text-yellow-500" />
                                                    <Star className="size-4 fill-yellow-500 text-yellow-500" />
                                                </div>
                                            </div>
                                            <div className="flex w-full select-none items-center justify-start gap-5">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src={testimonial.img || ''}
                                                    alt={testimonial.name}
                                                    className="size-8 rounded-full ring-1 ring-border ring-offset-4"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {testimonial.name}
                                                    </p>
                                                    <p className="text-xs font-normal text-muted-foreground">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </Marquee>
                            ))}
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%" />
                </div>
            </div>
        </GridSection>
    );
}
