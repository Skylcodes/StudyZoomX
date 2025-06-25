'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "Can a free tool really be better than expensive tutors and study apps?",
    answer: (
      <>
        <p>Absolutely! While tutors can cost $50+/hour and premium apps charge monthly fees, StudyZoom delivers <strong className="text-blue-400">better results for free</strong>. Our AI-powered tools adapt to your learning style, and you can upgrade to Pro for just $9.99/month for unlimited access.</p>
        <p className="mt-3 bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500">
          <span className="font-medium">Try it free now</span> and see the difference - no credit card required to get started!
        </p>
      </>
    )
  },
  {
    question: "How does StudyZoom stay free when competitors charge $30+/month?",
    answer: (
      <>
        <p>We've built an <strong className="text-blue-400">efficient AI system</strong> that keeps costs low, and we believe in making powerful education tools accessible to everyone. The free version covers all essential features, while our $9.99 Pro plan (less than the cost of one tutoring session) unlocks unlimited usage for serious learners.</p>
      </>
    )
  },
  {
    question: "What makes StudyZoom more effective than traditional study methods?",
    answer: (
      <>
        <p>Unlike passive reading or expensive tutors, StudyZoom uses <strong className="text-blue-400">active recall and spaced repetition</strong> - techniques proven to boost retention.</p>
        <p className="mt-2">Plus, you get instant feedback and can study anytime, anywhere - no scheduling required.</p>
      </>
    )
  },
  {
    question: "Is my study data private and secure?",
    answer: (
      <>
        <p>Your privacy is our top priority. We use <strong className="text-blue-400">enterprise-grade security</strong> to protect your data, and we never sell or share your information. All your study materials and progress are encrypted and stored securely.</p>
        <p className="mt-2 text-sm text-gray-400">You own your data and can export it anytime, no strings attached.</p>
      </>
    )
  },
  {
    question: "What's the catch with the free version?",
    answer: (
      <>
        <p>No catch! The free version includes all core features with generous usage limits. The <strong className="text-blue-400">only difference</strong> is that Pro ($9.99/month) removes all limits and adds premium models and priority support.</p>
        <p className="mt-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-3 rounded-lg border border-white/10">
          <span className="font-medium">Over 10,000 students</span> have already upgraded to Pro - join them for unlimited learning potential!
        </p>
      </>
    )
  }
];

export function FAQ(): React.JSX.Element {
  return (
    <section className="w-full py-24 relative bg-gradient-to-b from-gray-950/80 to-black overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-1/4 left-0 w-1/2 h-full bg-purple-600/5 blur-[150px] rounded-full opacity-50" />
      <div className="absolute -bottom-1/4 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full opacity-50" />

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
            className="mb-6 bg-black/30 border-blue-500/30 text-blue-400 backdrop-blur-md text-sm px-4 py-1.5 rounded-full shadow-lg animate-pulse hover:animate-none transition-all"
          >
            ❓ Got Questions? We've Got Answers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-white">Common </span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Everything you need to know about supercharging your study sessions. Can't find what you're looking for? Our support team is just a click away.
          </p>
        </motion.div>

        {/* FAQ Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className={cn(
                    "border-b border-white/10 transition-colors hover:border-blue-500/30 group",
                    index === 0 && "border-t hover:border-t-blue-500/30"
                  )}
                >
                  <AccordionTrigger className="group-has-[.active]:text-blue-400 text-left text-lg font-medium py-6 text-white hover:text-blue-400 transition-all">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-blue-400 opacity-0 group-has-[.active]:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
