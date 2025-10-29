'use client';

import { Palette } from "lucide-react";
import { useEffect, useState, ReactNode } from "react";

const themes = [
  { name: 'light', color: '#ffffff', icon: '☀️' },
  { name: 'dark', color: '#0e040d', icon: '🌙' },
  { name: 'pink', color: '#8c2458', icon: '🌸' },
  { name: 'green', color: '#248c24', icon: '🍃' },
];

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>('pink');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'pink';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    const html = document.documentElement;
    html.classList.remove('dark', 'pink', 'green');
    if (theme !== 'light') html.classList.add(theme);
    localStorage.setItem('theme', theme);
  };

  const handleThemeClick = (themeName: string) => {
    setTheme(themeName);
    applyTheme(themeName);
    setOpen(false); // close popup after selection
  };

  return (
    <>
      {/* Theme selector icon */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <Palette className="text-xl" />
        </button>

        {/* Popup with theme options */}
        {open && (
          <div className="mt-2 flex flex-col gap-2 shadow-lg absolute right-0 bottom-14">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => handleThemeClick(t.name)}
                title={t.name}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  theme === t.name ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                }`}
                style={{ backgroundColor: t.color }}
              >
                {t.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {children}
    </>
  );
}
