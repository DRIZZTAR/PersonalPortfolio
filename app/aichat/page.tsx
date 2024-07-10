import React from "react";
import { Navigation } from "../components/nav";
import Particles from "../components/particles";
import Chat from "../components/chat";

export default async function ProjectsPage() {
  return (
    <div className="relative bg-gradient-to-bl from-black via-slate-400/20 to-black">
      <Particles className="absolute inset-0 -z-10" quantity={200} />
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <Chat />
      </div>
    </div>
  );
}
