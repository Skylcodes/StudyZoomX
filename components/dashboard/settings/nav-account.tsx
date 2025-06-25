'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarGroupProps
} from '@/components/ui/sidebar';
import { accountNavItems } from '@/constants/nav-items';
import { cn } from '@/lib/utils';

export function NavAccount(props: SidebarGroupProps): React.JSX.Element {
  const pathname = usePathname();
  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {accountNavItems.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href)}
            >
              <Link
                href={item.disabled ? '#' : item.href}
                target={item.external ? '_blank' : undefined}
              >
                <item.icon
                  className={cn(
                    'size-4 shrink-0',
                    pathname.startsWith(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                />
                <span
                  className={
                    pathname.startsWith(item.href)
                      ? 'dark:text-foreground'
                      : 'dark:text-muted-foreground'
                  }
                >
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
