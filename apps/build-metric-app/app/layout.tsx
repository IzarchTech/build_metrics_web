import type { Metadata } from "next";
import { Box, ColorSchemeScript, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "BuildMetrics",
  description:
    "BuildMetrics is a comprehensive tool designed to simplify and enhance the process of estimating material quantities for construction projects. Tailored for civil engineers, quantity surveyors, and construction professionals, this app provides precise calculations, real-time updates, and a robust suite of features to streamline project planning and execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Box component="main" w="100vw" h="100vh">
            {children}
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
