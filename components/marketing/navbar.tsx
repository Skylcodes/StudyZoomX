'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ExternalLink } from '@/components/marketing/fragments/external-link';
import { MENU_LINKS } from '@/components/marketing/marketing-links';
import { MobileMenu } from '@/components/marketing/mobile-menu';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Routes } from '@/constants/routes';
import { cn } from '@/lib/utils';

export function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  return (
    <section className="sticky inset-x-0 top-0 z-40 border-b bg-background py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-x-9">
            <Link
              href={Routes.Root}
              className="flex items-center gap-2"
            >
              <Logo />
            </Link>
            <div className="flex items-center">
              <NavigationMenu
                style={
                  {
                    ['--radius']: '1rem'
                  } as React.CSSProperties
                }
              >
                <NavigationMenuList>
                  {MENU_LINKS.map((item, index) =>
                    item.items ? (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuTrigger
                          data-active={
                            item.items.some((subItem) =>
                              pathname.startsWith(subItem.href)
                            )
                              ? ''
                              : undefined
                          }
                          className="rounded-xl text-[15px] font-normal data-[active]:bg-accent"
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="w-96 list-none p-4">
                            {item.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href || '#'}
                                    target={
                                      subItem.external ? '_blank' : undefined
                                    }
                                    rel={
                                      subItem.external
                                        ? 'noopener noreferrer'
                                        : undefined
                                    }
                                    className="group flex select-none flex-row items-center gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                                      {subItem.icon}
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">
                                        {subItem.title}
                                        {subItem.external && (
                                          <ExternalLink className="-mt-2 ml-1 inline text-muted-foreground" />
                                        )}
                                      </div>
                                      <p className="text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          active={pathname.startsWith(item.href)}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            'rounded-xl text-[15px] font-normal data-[active]:bg-accent'
                          )}
                        >
                          <Link
                            href={item.href || '#'}
                            target={item.external ? '_blank' : undefined}
                            rel={
                              item.external ? 'noopener noreferrer' : undefined
                            }
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="rounded-xl border-none shadow-none" />
            <Link
              href={Routes.Login}
              className={cn(
                buttonVariants({
                  variant: 'outline'
                }),
                'rounded-xl'
              )}
            >
              Log in
            </Link>
            <Link
              href={Routes.SignUp}
              className={cn(
                buttonVariants({
                  variant: 'default'
                }),
                'rounded-xl'
              )}
            >
              Start for free
            </Link>
          </div>
        </nav>
        <MobileMenu className="lg:hidden" />
      </div>
    </section>
  );
}
