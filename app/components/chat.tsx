"use client";

import { useChat, generateId } from "ai/react";

export default function Chat() {
const functionCallHandler: FunctionCallHandler = async (chatMessages, functionCall) => {
  if (functionCall.name === "get_current_weather") {
    let parsedFunctionCallArguments;
    try {
      if (functionCall.arguments) {
        parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
        console.log(parsedFunctionCallArguments);
      }
    } catch (error) {
      console.error("Failed to parse function call arguments:", error);
      // Optionally, send an error message back to the chat
      return {
        messages: [
          ...chatMessages,
          {
            id: generateId(),
            name: "error",
            role: "system",
            content: "Sorry, we couldn't process your weather request.",
          },
        ],
      };
    }

    // Generate a fake temperature and weather condition
    const temperature = Math.floor(Math.random() * (100 - 30 + 1) + 30);
    const weatherConditions = ["sunny", "cloudy", "rainy", "snowy"];
    const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];


      const functionResponse: ChatRequest = {
        messages: [
          ...chatMessages,
          {
            id: generateId(),
            name: "get_current_weather",
            role: "function" as const,
            content: JSON.stringify({
              temperature,
              weather,
              info: "This data is randomly generated and came from a fake weather API!",
            }),
          },
        ],
      };
      return functionResponse;
    }
  };
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    experimental_onFunctionCall: functionCallHandler,
  });
  return (
    <div className="flex flex-col w-full max-w-xl py-4 mx-auto stretch">
      <div className="flex flex-col w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow">
        <div
          className="px-4 py-2 overflow-y-auto text-3xl font-bold tracking-tight text-zinc-100 sm:text-2xl"
          style={{ maxHeight: "500px", overflowY: "auto" }} // Corrected style
        >
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap p-3 text-center text-slate-300">
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
