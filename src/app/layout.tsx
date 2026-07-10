import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptHub — AI Prompt Gallery & Generator",
  description:
    "Discover, save, and generate AI prompts for ChatGPT, Midjourney, DALL·E, and more. Get inspired with the best prompt ideas.",
  metadataBase: new URL("https://prompthub.vercel.app"),
  alternates: {
    canonical: "https://prompthub.vercel.app",
  },
  openGraph: {
    title: "PromptHub — AI Prompt Gallery & Generator",
    description:
      "Discover, save, and generate AI prompts for ChatGPT, Midjourney, DALL·E, and more.",
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
      <body className={`${inter.className} bg-[#fafafa] text-[#1a1a2e] antialiased`}>
        {children}
      </body>
    </html>
  );
}
