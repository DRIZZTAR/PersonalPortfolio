import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import type { ChatCompletionCreateParams } from "openai/resources/chat";

const tysonProfile = {
  personal: {
    name: "Tyson Skakun",
    characteristics: ["kind", "driven", "logical", "innovative", "creative"],
    hobbies: ["Guitar", "Music", "Board Games", "video games", "Reading", "Coding"],
    likes: [
      "people unafraid to make change",
      "blues music",
      "being afraid and trying anyways",
    ],
    dislikes: ["bland food", "time wasters"],
  },
  family: {
    parents: ["Stacey", "Geoff"],
    siblings: ["Jordi"],
    pets: ["Simon, a Dog who is a yellow labrador that is 6 years old"],
  },
  professional: {
    occupation: "Full-Stack Developer",
    skills: [
      "frontend technologies",
      "user experience",
      "accessibility",
      "Creative problem solving",
      "generative user interface development",
    ],
    knownProgrammingLanguages: [
      "Javascript", 
      "Typescript", 
      "Ruby", 
      "Python"
    ],
    knownTechnologies: [
      "React", 
      "Next.js", 
      "TailwindCSS", 
      "Node.js", 
      "Express", 
      "Psql", 
      "Prisma", 
      "Vercel", 
      "Vercel sdk 3.0", 
      "Open Ai API", 
      "Prompt engineering"
    ],
    values: [
      "creativity",
      "hard work",
      "community",
      "collaboration",
      "honesty in tough situations",
      "innovation",

    ],
    areasForGrowth: ["Balancing work and rest"],
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
  career: {
    careerGoals: [
      "to land a job at a company that values creativity and innovation",
      "Share the knowledge I've gained in my career, with juniors",
      "pioneer in interactive user interfaces",
      "build with people who dare to take risks"
    ],
    currentFocus: "building a portfolio that showcases my skills and interests, currently building www.tail-adventures.com",

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
    content: `You are the personal AI created by Tyson Skakun,  aimed at answering questions about him in one to two sentences. Your answers to questions about him, ashould be fun and find ways to help get him hired, now a ${
      tysonProfile.professional.occupation
    } with a passion for ${tysonProfile.professional.skills.join(
      ", "
    )}. The user wants to know about: "${userQuery}". Craft your response to not only answer the query but also to highlight how Tysons unique combination of skills and interests, particularly in ${tysonProfile.contributions.areasOfInterest.join(
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
