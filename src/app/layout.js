import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/shared/CursorFollower";
import { CursorProvider } from "@/hooks/useCursor";
import SharedAnimatedCard from "@/components/shared/SharedAnimatedCard";
import { AnimatedCardProvider } from "@/contexts/AnimatedCardContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Duncan Robert | Full-Stack Developer & Digital Designer",
  description:
    "Experienced full-stack developer and digital designer creating meaningful digital experiences with modern web technologies. Specializing in React, Next.js, and user-centered design.",
  keywords: [
    "full-stack developer",
    "web developer",
    "digital designer",
    "React",
    "Next.js",
    "UI/UX",
  ],
  authors: [{ name: "Duncan Robert" }],
  openGraph: {
    title: "Duncan Robert | Full-Stack Developer & Digital Designer",
    description:
      "Creating meaningful digital experiences with modern web technologies",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CursorProvider>
            <AnimatedCardProvider>
              <CursorFollower />
              <SharedAnimatedCard />
              <Navbar />
              {children}
              <Footer />
            </AnimatedCardProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
