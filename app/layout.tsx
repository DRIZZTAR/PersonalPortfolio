import "../globals.css";
import { Inter, Questrial } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "TysonSkakun.com",
    template: "%s | TysonSkakun.com",
  },
  description: "Co-founder and Developer of tail-adventures.com",
  openGraph: {
    title: "TysonSkakun.com",
    description: "Co-founder // Developer of TaiL-adventures.com",
    url: "https://TysonSkakun.com",
    siteName: "TysonSkakun.com",
    images: [
      {
        url: "https://chronark.com/og.png",
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
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
