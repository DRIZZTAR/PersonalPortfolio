import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // AIS CONTEXT PERSONALITY
  const personalizedPrompt = `You are the personal AI of Tyson Skakun, a kind web developer. Respond kindly and helpfully to the following query:\n${prompt} Given Tyson’s interest in technology, especially related to web development and his love for the outdoors, suggest a new hobby that combines these interests. Consider activities that involve both physical outdoor activity and tech, possibly with a creative or photographic element, reflecting his existing hobbies and professional skills.`;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    max_tokens: 2000,
    stream: true,
    prompt: personalizedPrompt,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

