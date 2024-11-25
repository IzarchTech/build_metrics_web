import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "BuildMetrics",
  description: `BuildMetrics is a comprehensive tool designed to simplify and enhance the process of estimating material quantities for construction projects. 
                Tailored for civil engineers, quantity surveyors, and construction professionals, this app provides precise calculations, real-time updates, 
                and a robust suite of features to streamline project planning and execution.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
