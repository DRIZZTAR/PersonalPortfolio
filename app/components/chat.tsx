"use client";

import { useChat } from "ai/react";
import AiResponse from "./AiResponse";

export default function Chat() {
  const functionCallHandler: FunctionCallHandler = async (
    chatMessages,
    functionCall
  ) => {
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
      const weather =
        weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

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
            <div
              key={m.id}
              className="whitespace-pre-wrap p-3 text-center text-slate-300"
            >
              {/* Check if the message is a function call */}
              {m.role === "function" && m.function_call ? (
                // Handle both string and object types for function_call
                typeof m.function_call === "string" ? (
                  // Streamed function call, not yet a valid JSON, handle as raw string
                  m.function_call.split("\\n").map((line, index) => (
                    <p
                      key={index}
                      className="text-lg md:text-xl lg:text-2xl font-semibold text-indigo-500 dark:text-indigo-400 leading-relaxed tracking-tight shadow-lg"
                    >
                      {line}
                    </p>
                  ))
                ) : (
                  // Valid JSON, parse and display the function call details
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-indigo-500 dark:text-indigo-400 leading-relaxed tracking-tight shadow-lg">
                      Function name: {m.function_call.name}
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-indigo-500 dark:text-indigo-400 leading-relaxed tracking-tight shadow-lg">
                      Function arguments: {m.function_call.arguments}
                    </p>
                  </div>
                )
              ) : (
                // Regular message content
                <AiResponse role={m.role} content={m.content} />
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex-none">
          <input
            style={{ fontFamily: "Cal Sans, sans-serif" }}
            className="w-full px-2 text-center rounded-md bg-black/0 text-white placeholder-gray-400"
            value={input}
            placeholder="Ask about Tyson..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
