import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Trusti Design System",
  description: "Component library and design system for the Trusti insurance comparison platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://kit.fontawesome.com/5414e64bc6.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
