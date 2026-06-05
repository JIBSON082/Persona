import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Persona — LinkedIn content that sounds like you",
  description:
    "AI-powered LinkedIn post generator that writes in your voice. Humanized, undetectable, and ready to publish.",
  openGraph: {
    title: "Persona",
    description: "Your voice. Amplified by AI.",
    images: [
      "https://res.cloudinary.com/your_cloud/image/upload/persona-og.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${dmMono.variable} font-sans bg-base antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

