import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/shared/CursorFollower";
import { CursorProvider } from "@/hooks/useCursor";
import SharedAnimatedCard from "@/components/shared/SharedAnimatedCard";
import { AnimatedCardProvider } from "@/contexts/AnimatedCardContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const haffer = localFont({
  variable: "--font-haffer",
  src: [
    {
      path: "../../public/fonts/haffer-font/Haffer-TRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/haffer-font/Haffer-TRIAL-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/haffer-font/Haffer-TRIAL-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/haffer-font/Haffer-TRIAL-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata = {
  title: "Pankaj Yadav | Full-Stack Developer & Digital Designer",
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
  authors: [{ name: "Pankaj Yadav" }],
  openGraph: {
    title: "Pankaj Yadav | Full-Stack Developer & Digital Designer",
    description:
      "Creating meaningful digital experiences with modern web technologies",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${haffer.variable} antialiased`}>
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
