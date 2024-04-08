import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Tyson's structured profile
const tysonProfile = {
  personal: {
    name: "Tyson Skakun",
    characteristics: ["kind", "driven", "logical"],
    hobbies: ["hiking", "photography", "gaming"],
    likes: ["pizza", "indie music"],
  },
  professional: {
    occupation: "web developer",
    skills: ["frontend technologies", "user experience", "accessibility"],
    preferredProgramming: ["Python"],
    values: ["creativity", "personalization", "community", "collaboration"],
  },
  contributions: {
    openSource: true,
    areasOfInterest: [],
  },
  lookingFor: {
    hobbies: ["combines outdoors and tech", "creative", "photographic element"],
  },
};

// OpenAI API client setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Generate personalized prompt using Tyson's profile
  const personalizedPrompt = `You are the personal AI of ${
    tysonProfile.personal.name
  }, a ${tysonProfile.personal.characteristics.join(", ")} ${
    tysonProfile.professional.occupation
  }. Respond kindly and helpfully to the following query, if you dont have specific knowledge, make a positive assumption about Tyson:\n${prompt}\nGiven Tyson’s interest in technology, especially related to ${tysonProfile.professional.skills.join(
    ", "
  )}, suggest a reason why this may make him a good hire. Consider reasons that involve both skill and personality reasons Tyson may be a good fit for there company, you can be playful but always respectful, match the tone of the prompt.`;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    max_tokens: 2000,
    stream: true,
    prompt: personalizedPrompt,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
