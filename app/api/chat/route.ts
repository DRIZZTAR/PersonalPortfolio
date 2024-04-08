import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import type { ChatCompletionCreateParams } from "openai/resources/chat";

const tysonProfile = {
  personal: {
    name: "Tyson Skakun",
    characteristics: ["kind", "driven", "logical", "innovative", "creative"],
    hobbies: ["guitar", "Art", "video games", "storytelling"],
    likes: [
      "people unafraid to make change",
      "blues music",
      "being afraid and trying anyways",
    ],
    dislikes: ["bland food", "time wasters"],
  },
  professional: {
    occupation: "web developer & entrepreneur",
    skills: [
      "frontend technologies",
      "user experience",
      "accessibility",
      "story-driven game design",
      "generative user interface development",
    ],
    preferredProgrammingLanguages: ["Python", "JavaScript"],
    values: [
      "creativity",
      "personalization",
      "community",
      "collaboration",
      "innovation in storytelling",
    ],
    areasForGrowth: ["Perfectionism", "Balancing work and rest"],
  },
  contributions: {
    openSource: true,
    areasOfInterest: [
      "educational software",
      "environmental sustainability",
      "AI",
      "generative UI",
      "interactive storytelling",
    ],
  },
  lookingFor: {
    hobbies: [
      "combines outdoors and tech",
      "creative",
      "photographic element",
      "exploring interactive storytelling",
    ],
    careerGoals: [
      "lead developer role",
      "mentor junior developers",
      "pioneer in interactive storytelling technology",
    ],
  },
};


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

  // Ensure there's a user query in the messages to form the context properly
  const userQuery =
    messages.find((message) => message.role === "user")?.content ||
    "specific interests or questions";

  const contextMessage = {
    role: "system",
    content: `You are the personal AI created by Tyson Skakun, your job is to answer questions about him, and respond in fun ways to help get him hired, now a ${
      tysonProfile.professional.occupation
    } with a passion for ${tysonProfile.professional.skills.join(
      ", "
    )}. Tyson is curious about: "${userQuery}". Craft your response to not only answer his query but also to highlight how his unique combination of skills and interests, particularly in ${tysonProfile.contributions.areasOfInterest.join(
      ", "
    )}, position him at the forefront of ${tysonProfile.professional.values.join(
      ", "
    )}. If specific knowledge is lacking, infer positively and engage with the topic creatively and respectfully, mirroring the inquiry's tone.`,
  };

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages: [contextMessage, ...messages],
    functions,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the streaming text response
  return new StreamingTextResponse(stream);
}
