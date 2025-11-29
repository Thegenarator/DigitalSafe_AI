import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/shared/mobile-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalsafe.ai"),
  title: {
    default: "DigiSafe AI | Digital Safety Intelligence",
    template: "%s | DigiSafe AI",
  },
  description:
    "DigiSafe AI is a digital safety coach that scores risk, delivers AI guidance, and keeps women and girls safer online.",
  keywords: [
    "digital safety",
    "women online safety",
    "harassment prevention",
    "AI risk assessment",
  ],
  openGraph: {
    title: "DigiSafe AI — Safety Coach for Women & Girls",
    description:
      "Evaluate your Digital Safety Score, uncover vulnerabilities, and get an AI-powered safety plan tailored to you.",
    url: "https://digitalsafe.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`app-shell ${inter.variable} ${spaceGrotesk.variable}`}>
        <MobileNav />
        {children}
      </body>
    </html>
  );
}
