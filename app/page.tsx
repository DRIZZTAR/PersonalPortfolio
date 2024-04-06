import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Secret Project", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div
      style={{ fontFamily: "Cal Sans, sans-serif" }}
      className="flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-r from-black via-slate-500/20 to-black"
    >
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={300}
      />
      <div style={{ fontFamily: "Cal Sans, sans-serif" }}>
        <h1 className="z-10 pb-6 text-5xl text-transparent bg-clip-text bg-gradient-to-r from-slate-950/10 via-pink-400 to-slate-950/10 cursor-default animate-title font-display sm:text-7xl md:text-9xl whitespace-nowrap duration-1000 text-edge-outline">
          Tyson Skakun
        </h1>
        <h1 className="z-10 pb-4 text-4xl text-transparent text-center bg-clip-text bg-gradient-to-r from-yellow-500/50 to-slate-200/50 cursor-default animate-title font-display sm:text-6xl md:text-7xl whitespace-nowrap duration-1000 text-edge-outline">
          Developer
        </h1>
      </div>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          Im building{" "}
          <Link
            target="_blank"
            href="https://www.tail-adventures.com/"
            className="underline duration-500 hover:text-zinc-300"
          >
            tail-adventures.com
          </Link>{" "}
          and exploring generative UX/UI.
        </h2>
        <h2 className="text-sm text-zinc-500 ">
          Lets build and{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/tyson-skakun-tail/"
            className="underline duration-500 hover:text-zinc-300"
          >
            Connect
          </Link>{" "}
          🚀
        </h2>
      </div>
    </div>
  );
}
