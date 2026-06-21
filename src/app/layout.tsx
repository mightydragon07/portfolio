import type { Metadata } from "next";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/rajdhani/300.css";
import "@fontsource/rajdhani/400.css";
import "@fontsource/rajdhani/500.css";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Semika Anusara | Portfolio",
  description:
    "Full Stack Developer, AI Enthusiast & Editor — building immersive digital experiences.",
  metadataBase: undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <div className="ambient-bg" />
        <Cursor />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
