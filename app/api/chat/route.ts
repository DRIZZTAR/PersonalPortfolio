import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import type { ChatCompletionCreateParams } from "openai/resources/chat";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Set the runtime to edge
export const runtime = "edge";

// Function definitions:
const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: "get_current_weather",
    description: "Get the current weather",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA",
        },
        format: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description:
            "The temperature unit to use. Infer this from the users location.",
        },
      },
      required: ["location", "format"],
    },
  },
];

// And use it like this:
export async function POST(req: Request) {
  const { messages } = await req.json();

  const contextMessage = {
    role: "system",
    content:
      "Tyson Skakun is a kind and patient web developer with a logical mindset and a passion for frontend technologies, especially those enhancing user experience and accessibility. He loves pizza, enjoys indie music, and prefers programming in Python for its clarity and efficiency. Tyson values creativity and personalization, evident in his choice of music and projects. Outside work, he engages in hiking and photography, capturing the beauty of nature, and spends time gaming. He actively contributes to open-source projects, valuing community and collaboration. Tyson appreciates detailed, thoughtful responses that reflect his interests and values.",
  };

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages: [contextMessage, ...messages],
    functions,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the streaming
  return new StreamingTextResponse(stream);
}