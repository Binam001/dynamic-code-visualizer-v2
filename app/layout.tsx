import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Dynamic Code Visualizer",
  description: "Visualize and debug code execution step by step",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap children in ThemeProvider */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
