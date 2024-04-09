import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
// import type { ChatCompletionCreateParams } from "openai/resources/chat";

const tysonProfile = {
  personal: {
    name: "Tyson Skakun",
    characteristics: ["kind", "driven", "logical", "innovative", "creative"],
    hobbies: [
      "Guitar",
      "Music",
      "Board Games",
      "video games",
      "Reading",
      "Coding",
    ],
    likes: [
      "people unafraid to make change",
      "blues music",
      "being afraid and trying anyways",
    ],
    dislikes: ["bland food", "time wasters", ],
  },
  favouriteMusic: {
    redHotCHiliPeppers: {
      albums: ["Californication", "By The Way", "Stadium Arcadium"],
      songs: ["Scar Tissue", "Under The Bridge", "Can't Stop"],
      reasonHeLikes: "The energy and emotion in their music, flea is a beast on the bass",
    },
    ledZeppelin: {
      albums: ["Led Zeppelin IV", "Physical Graffiti"],
      songs: ["Stairway to Heaven", "Kashmir"],
      reasonHeLikes: "The raw energy and the way they blend blues and rock",
    },
    theBeatles: {
      albums: ["Abbey Road", "Sgt. Pepper's Lonely Hearts Club Band"],
      songs: ["Come Together", "Hey Jude"],
      reasonHeLikes: "The creativity and the way they changed music",
    },
  },
  familyMembers: {
    parents: ["Stacey", "Geoff"],
    siblings: ["Jordi"],
    wife: ["Kaitlyn"],
    babyBoy: ["Miles"],
    inLaws: ["Shari", "Bernie"],
    brotherInLaw: ["Jaimie"],
  },
  pets: ["Simon, a Dog who is a yellow labrador that is 6 years old"],
  professional: {
    occupation: "Full-Stack Developer",
    skills: [
      "frontend technologies",
      "user experience",
      "accessibility",
      "Creative problem solving",
      "generative user interface development",
    ],
    knownProgrammingLanguages: ["Javascript", "Typescript", "Ruby", "Python"],
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
      "Prompt engineering",
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
      "build with people who dare to take risks",
    ],
    currentFocus:
      "building a portfolio that showcases my skills and interests, currently building www.tail-adventures.com",
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
    "Hope to respond to, and asnwer questions about tyson";

const serializeProfileForAIContext = (profile) => {
  // Helper function to convert arrays into human-readable strings
  const arrayToReadableList = (array) => {
    return array.length > 1
      ? `${array.slice(0, -1).join(", ")} and ${array[array.length - 1]}`
      : array[0];
  };

  const serializeMusicPreferences = (music) => {
    return Object.entries(music)
      .map(([key, value]) => {
        return `${key} for their albums ${arrayToReadableList(
          value.albums
        )} and songs like ${arrayToReadableList(
          value.songs
        )}. Reason for liking: ${value.reasonHeLikes}.`;
      })
      .join(" ");
  };

  const serializedProfile = `
    Tyson Skakun is ${arrayToReadableList(
      profile.personal.characteristics
    )} with hobbies like ${arrayToReadableList(
    profile.personal.hobbies
  )}. He enjoys ${arrayToReadableList(
    profile.personal.likes
  )} but dislikes ${arrayToReadableList(
    profile.personal.dislikes
  )}. In his family, there are his parents ${arrayToReadableList(
    profile.familyMembers.parents
  )}, sibling ${arrayToReadableList(
    profile.familyMembers.siblings
  )}, wife Kaitlyn, son Miles, in-laws ${arrayToReadableList(
    profile.familyMembers.inLaws
  )}, and brother-in-law ${
    profile.familyMembers.brotherInLaw
  }. His beloved pet is Simon, a 6-year-old yellow labrador.

    Professionally, he is a ${
      profile.professional.occupation
    } skilled in ${arrayToReadableList(
    profile.professional.skills
  )}, knowledgeable in languages like ${arrayToReadableList(
    profile.professional.knownProgrammingLanguages
  )}, and technologies such as ${arrayToReadableList(
    profile.professional.knownTechnologies
  )}. Tyson upholds values like ${arrayToReadableList(
    profile.professional.values
  )} and aims to improve at ${arrayToReadableList(
    profile.professional.areasForGrowth
  )}.

    He supports open source and is keen on ${arrayToReadableList(
      profile.contributions.areasOfInterest
    )}. His career ambitions include ${arrayToReadableList(
    profile.career.careerGoals
  )}, with a current focus on his project at www.tail-adventures.com. His musical tastes include ${serializeMusicPreferences(
    profile.favouriteMusic
  )}.
  `;
  return serializedProfile.trim(); // Trimming to ensure there are no leading/trailing whitespaces
};

const tysonAIContext = serializeProfileForAIContext(tysonProfile);

const contextMessage = {
  role: "system",
  content: `You are the personal AI created for Tyson Skakun. Here's what you should know: ${tysonAIContext} When responding to inquiries about Tyson, please provide fun and engaging answers that reflect his personality and professional interests, and try to respond in 2-3 sentences.`,
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
