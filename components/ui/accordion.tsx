'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export type AccordionElement = React.ElementRef<typeof AccordionPrimitive.Root>;
export type AccordionProps = React.ComponentProps<
  typeof AccordionPrimitive.Root
>;
const Accordion = AccordionPrimitive.Root;

export type AccordionItemElement = React.ElementRef<
  typeof AccordionPrimitive.Item
>;
export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> & {
  className?: string;
};
const AccordionItem = React.forwardRef<
  AccordionItemElement,
  AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('group', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

export type AccordionTriggerElement = React.ElementRef<
  typeof AccordionPrimitive.Trigger
>;
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  className?: string;
  children: React.ReactNode;
  showChevron?: boolean;
};
const AccordionTrigger = React.forwardRef<
  AccordionTriggerElement,
  AccordionTriggerProps
>(({ className, children, showChevron = true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-left text-base font-medium transition-all [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      {showChevron && (
        <ChevronDown 
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" 
          aria-hidden="true"
        />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export type AccordionContentElement = React.ElementRef<
  typeof AccordionPrimitive.Content
>;
export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> & {
  className?: string;
};
const AccordionContent = React.forwardRef<
  AccordionContentElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all',
      'data-[state=closed]:animate-accordion-up',
      'data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
