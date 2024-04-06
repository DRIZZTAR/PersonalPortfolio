import React from "react";
import { Navigation } from "../components/nav";
import Particles from "../components/particles";
import Chat from "../components/chat";

export default async function ProjectsPage() {
  return (
    <div className="relative bg-gradient-to-bl from-black via-slate-400/20 to-black">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          <Particles className="absolute inset-0 -z-10" quantity={300} />
          <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
              <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
