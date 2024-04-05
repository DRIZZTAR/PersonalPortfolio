import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Secret Project", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-zinc-900 via-zinc-300/10 to-zinc-900">
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
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={200}
      />
      <h1 className="z-10 pb-4 text-5xl text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-pink-300 to-cobalt-500 cursor-default animate-title font-display sm:text-7xl md:text-9xl whitespace-nowrap duration-1000 text-edge-outline">
        Tyson Skakun
      </h1>
      <h1 className="z-10 pb-4 text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-pink-300 to-cobalt-500 cursor-default animate-title font-display sm:text-6xl md:text-7xl whitespace-nowrap duration-1000 text-edge-outline">
        Developer
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          I'm building{" "}
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
          Lets build together and{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/tyson-skakun-tail/"
            className="underline duration-500 hover:text-zinc-300"
          >
            Connect
          </Link>{" "}
          today 🚀
        </h2>
      </div>
    </div>
  );
}
