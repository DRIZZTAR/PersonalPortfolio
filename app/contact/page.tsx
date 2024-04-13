"use client";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/tyson-skakun-tail",
    label: "LinkedIn",
    handle: "TysonSkakun",
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/DRIZZTAR",
    label: "Github",
    handle: "TysonSkakun",
  },
  {
    icon: <Twitter size={20} />,
    href: "https://twitter.com/TysonJeremy",
    label: "X",
    handle: "@TysonJeremy",
  },
];

export default function ContactPage() {
  return (
    <div className=" bg-gradient-to-br from-black via-slate-400/20 to-black">
      <Particles className="absolute inset-0 -z-10" quantity={200} />
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((s) => (
            <Card key={s.href}>
              <div className="hidden w-screen h-px animate-glow md:block animate-fade-left" />
              <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-red-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-700 border rounded-full text-white group-hover:text-slate-600 group-hover:bg-slate-200 border-zinc-500 bg-zinc-900 group-hover:border-slate-400 top-shadow-orange">
                  {s.icon}
                </span>{" "}
                <div
                  style={{ fontFamily: "Apple Garamond, sans-serif" }}
                  className="z-10 flex flex-col items-center"
                >
                  <span className=" lg:text-xl hover font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-teal-200 font-display">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-300 group-hover:text-teal-300">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
