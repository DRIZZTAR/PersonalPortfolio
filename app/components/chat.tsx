"use client";

import { useChat } from "ai/react";
import AiResponse from "./AiResponse";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

// Define a function to map weather conditions to icons
const getWeatherIcon = (weather) => {
  const iconSize = 30; // Adjust size as needed
  const style = { marginRight: "10px" };
  switch (weather.toLowerCase()) {
    case "sunny":
      return <WiDaySunny size={iconSize} style={style} />;
    case "cloudy":
      return <WiCloudy size={iconSize} style={style} />;
    case "rainy":
      return <WiRain size={iconSize} style={style} />;
    case "snowy":
      return <WiSnow size={iconSize} style={style} />;
    default:
      return null; // Default case if the weather condition doesn't match
  }
};

export default function Chat() {
  const functionCallHandler = async (chatMessages, functionCall) => {
    console.log("Function call received:", functionCall.name);
    if (functionCall.name === "get_current_weather") {
      // The initial steps including argument parsing remain unchanged

      // Simplified weather data generation (for demonstration purposes)
      const weatherData = {
        temperature: Math.floor(Math.random() * (100 - 30 + 1) + 30),
        weather: ["sunny", "cloudy", "rainy", "snowy"][
          Math.floor(Math.random() * 4)
        ],
        info: "This data is randomly generated and not from a real weather API.",
      };

      console.log("Generated weather data:", weatherData);

      const functionResponse = {
        messages: [
          ...chatMessages,
          {
            // Assuming generateId() is a utility function you have defined elsewhere
            name: "get_current_weather",
            role: "function",
            content: JSON.stringify(weatherData), // Make sure to stringify the entire object
          },
        ],
      };
      return functionResponse;
    }
  };

  // useChat hook and other component logic remain largely unchanged
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    experimental_onFunctionCall: functionCallHandler,
  });

  return (
    <div className="flex flex-col w-full max-w-xl py-4 mx-auto stretch">
      <div className="flex flex-col w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow">
        {/* Chat UI rendering logic remains unchanged */}
        <div
          className="px-2 py-2 overflow-y-auto text-3xl font-bold tracking-tight text-zinc-100 sm:text-2xl"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          {messages.map((m) => {
            console.log("Rendering message details:", m);

            // Check if the message is a function call response
            if (m.role === "function") {
              try {
                // Parse the function response content
                const data = JSON.parse(m.content);
                console.log("Parsed function content:", data);

                // Render the function call response
                return (
                  <div
                    style={{ fontFamily: "Apple Garamond, sans-serif" }}
                    key={m.id}
                    className="whitespace-pre-wrap p-3 text-center text-slate-300 bg-gradient-to-r from-purple-300 via-blue-300/50 to-blue-400/10 border-l-4 border-slate-400 rounded-lg shadow-lg"
                  >
                    <div className="flex justify-center items-center">
                      {getWeatherIcon(data.weather)}
                      <p className="text-xl font-semibold">
                        Temperature: {data.temperature}°
                      </p>
                    </div>
                    <p className="text-lg">{data.weather.toUpperCase()}</p>
                  </div>
                );
              } catch (e) {
                // If parsing fails, log the error and render an error message
                console.error("Error parsing function content:", e);
                return (
                  <div
                    key={m.id}
                    className="whitespace-pre-wrap p-3 text-center text-slate-300"
                  >
                    There was an error rendering the weather information.
                  </div>
                );
              }
            } else {
              // For regular messages, just use AiResponse
              // The key here is to make sure we don't reach this part for function call responses
              return (
                <AiResponse key={m.id} role={m.role} content={m.content} />
              );
            }
          })}
        </div>
        <form onSubmit={handleSubmit} className="flex-none">
          <input
            style={{ fontFamily: "Apple Garamond, sans-serif" }}
            className="w-full px-2 text-center rounded-md bg-black/20 text-white placeholder-gray-300"
            value={input}
            placeholder="Ask me about Tyson..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
