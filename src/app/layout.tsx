import type { Metadata } from "next";
import "./globals.css";

import Theme from "@/theme/Theme";
import Font from "@/lib/font/Font";

export const metadata: Metadata = {
  title: "Wabi - the clock app",
  description: "The modern simple clock app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="bg-[var(--backgroundColor)]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Theme />
        <Font />
      </head>
      <body
        className="font-default font-normal overscroll-none antialiased"
      >
        {children}
      </body>
    </html>
  );
}
