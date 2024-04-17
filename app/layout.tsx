import "../globals.css";
import { Inter, Questrial } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default:
      "Tyson Skakun | Full Stack Developer & AI, UI Specialist in Edmonton",
    template: "%s | TysonSkakun.dev",
  },
  description: "Co-founder and Developer of tail-adventures.com",
  openGraph: {
    title: "TysonSkakun.dev",
    description: "Co-founder // Developer of TaiL-adventures.com",
    url: "https://TysonSkakun.dev",
    siteName: "TysonSkakun.dev",
    images: [
      {
        url: "https://github.com/DRIZZTAR/PersonalPortfolio/blob/acf180e7e3e2ad668ca4b89cc77c9c3799bca983/public/webThumb.png",

        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Tyson Skakun",
    card: "summary_large_image",
    images: ["https://tysonskakun.dev/webThumb.png"],
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const questrial = Questrial({
  subsets: ["latin"],
  variable: "--font-questrial",
  weight: "400",
});

// const calSans = LocalFont({
//   src: "./fonts/CalSans-SemiBold",
//   variable: "--font-calsans",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, questrial.variable].join(" ")}>
      <head></head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
