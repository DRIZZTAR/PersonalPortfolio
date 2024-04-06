import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    max_tokens: 2000,
    stream: true,
    prompt,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      // if you skip the function call and return nothing, the `function_call`
      // message will be sent to the client for it to handle
      if (name === "get_current_weather") {
        // Call a weather API here
        const weatherData = {
          temperature: 20,
          unit: args.format === "celsius" ? "C" : "F",
        };

        // `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
        const newMessages = createFunctionCallMessages(weatherData);
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model: "gpt-3.5-turbo-0613",
          // see "Recursive Function Calls" below
          functions,
        });
      }
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
