import type { Metadata } from "next";
import { Jura, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "BuildMetrics",
  description: `BuildMetrics is a comprehensive tool designed to simplify and enhance the process of estimating material quantities for construction projects. 
                Tailored for civil engineers, quantity surveyors, and construction professionals, this app provides precise calculations, real-time updates, 
                and a robust suite of features to streamline project planning and execution.`,
};

const bodyFont = Jura({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "500", "700"],
});

const headingFont = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased h-screen bg-background text-foreground",
          bodyFont.variable,
          headingFont.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
