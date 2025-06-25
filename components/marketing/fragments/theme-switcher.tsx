'use client';

import * as React from 'react';
import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

const DATA = [
  {
    value: 'system',
    icon: LaptopIcon,
    label: 'System Theme'
  },
  {
    value: 'light',
    icon: SunIcon,
    label: 'Light Theme'
  },
  {
    value: 'dark',
    icon: MoonIcon,
    label: 'Dark Theme'
  }
];

export function ThemeSwitcher(): React.JSX.Element {
  const { setTheme, theme } = useTheme();
  const themeValue = theme || 'system';
  return (
    <div className="flex w-fit rounded-full border bg-background p-0.5">
      {DATA.map(({ value, icon: Icon, label }) => (
        <span
          key={value}
          className="h-full"
        >
          <input
            className="peer sr-only"
            type="radio"
            id={`theme-switch-${value}`}
            value={value}
            checked={themeValue === value}
            onChange={(e) => setTheme(e.target.value)}
          />
          <label
            htmlFor={`theme-switch-${value}`}
            className="flex size-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground peer-checked:bg-accent peer-checked:text-foreground"
            aria-label={label}
          >
            <Icon className="size-4 shrink-0" />
          </label>
        </span>
      ))}
    </div>
  );
}
