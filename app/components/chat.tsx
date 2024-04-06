"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-4 mx-auto stretch">
      <div className="flex flex-col w-full max-w-md mx-auto overflow-hidden rounded-lg shadow">
        <div
          className="flex-1 px-4 py-2 overflow-y-auto text-3xl font-bold tracking-tight text-zinc-100 sm:text-2xl"
          style={{ Height: "500px" }}
        >
          {" "}
          {/* Adjust maxHeight as needed */}
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap text-center text-slate-300">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex-none">
          <input
            className="w-full px-2 text-center rounded-md border-gray-300 bg-gray-700 text-white placeholder-gray-400"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
