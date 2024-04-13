import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
// import type { ChatCompletionCreateParams } from "openai/resources/chat";

interface MusicPreference {
  albums: string[];
  songs: string[];
  reasonHeLikes: string;
}

interface MoviePreference {
  reasonHeLikes: string;
  favouriteQuotes: string[];
}

interface FavouriteMovies {
  [key: string]: MoviePreference;
}

interface FavouriteMusic {
  [key: string]: MusicPreference;
}

interface Profile {
  personal: {
    names: string[];
    locationsLived: string[];
    characteristics: string[];
    hobbies: string[];
    likes: string[];
    dislikes: string[];
  };
  favouriteMusic: FavouriteMusic;
  favouriteMovies: FavouriteMovies;
  familyMembers: {
    parents: string[];
    siblings: string[];
    wife: string[];
    babyBoy: string[];
    inLaws: string[];
    brotherInLaw: string[];
  };
  pets: string[];
  professional: {
    occupation: string;
    skills: string[];
    knownProgrammingLanguages: string[];
    knownTechnologies: string[];
    values: string[];
    areasForGrowth: string[];
  };
  contributions: {
    openSource: boolean;
    areasOfInterest: string[];
  };
  career: {
    careerGoals: string[];
    currentFocus: string;
  };
}

const tysonProfile = {
  personal: {
    names: [
      "Tyson Skakun",
      "Tys is what his friends and family call him",
      "Piiderman his current Gamertag",
    ],
    locationsLived: ["Currently living in Edmonton, Alberta, Canada"],
    characteristics: ["kind", "driven", "logical", "innovative", "creative"],
    hobbies: [
      "Guitar",
      "Music",
      "Board Games",
      "video games",
      "Reading",
      "Movies",
      "Coding",
    ],
    likes: [
      "people unafraid to make change",
      "blues music",
      "being afraid and trying anyways",
      "learning new things",
      "Commited to continous improvement",
    ],
    dislikes: ["bland food", "time wasters"],
  },
  favouriteMusic: {
    jeffBuckley: {
      albums: ["Grace", "Sketches for My Sweetheart the Drunk"],
      songs: ["Hallelujah", "Lover, You Should've Come Over"],
      reasonHeLikes: "The raw emotion and the way he sings",
    },
    ledZeppelin: {
      albums: ["Led Zeppelin IV", "Physical Graffiti"],
      songs: ["Stairway to Heaven", "Kashmir"],
      reasonHeLikes: "The raw energy and the way they blend blues and rock",
    },
    theBeatles: {
      albums: ["Revolver", "Sgt. Pepper's Lonely Hearts Club Band"],
      songs: ["A Day in the Life", "Lucy in the Sky with Diamonds", "Hey Jude"],
      reasonHeLikes: "The creativity and the way they changed music",
    },
    sublime: {
      albums: ["Sublime", "40 oz. to Freedom"],
      songs: ["What I Got", "Santeria"],
      reasonHeLikes: "The laid back vibe and the way they blend genres",
    },
  },
  favouriteMovies: {
    theMatrix: {
      reasonHeLikes: "The way it makes you think about reality",
      favouriteQuotes: [ "There is no spoon", "I know kung fu" ],
    },
    inception: {
      reasonHeLikes: "The way it plays with your mind",
      favouriteQuotes: [ "You mustn't be afraid to dream a little bigger, darling", "Dreams feel real while we're in them" ],
    },
    theDarkKnight: {
      reasonHeLikes: "The way it shows the struggle between good and evil",
      favouriteQuotes: [ "You either die a hero, or you live long enough to see yourself become the villain" ],
    },
  },

  familyMembers: {
    parents: ["Stacey", "Geoff"],
    siblings: ["Jordi"],
    wife: ["Katelyn"],
    babyBoy: ["Miles"],
    inLaws: ["Sherri", "Bernie, retired, loving grandfather to Miles"],
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
    areasForGrowth: ["Balancing work and rest", "Nailing the solo in 'Little Wing'"],
  },
  contributions: {
    openSource: true,
    areasOfInterest: [
      "Using AI to create educational software",
      "environmental sustainability",
      "AI",
      "generative UI",
      "UX/UI design",
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
// const functions: ChatCompletionCreateParams.Function[] = [
//   {
//     name: "get_current_weather",
//     description: "Get the current weather",
//     parameters: {
//       type: "object",
//       properties: {
//         location: {
//           type: "string",
//           description: "The city and state, e.g. San Francisco, CA",
//         },
//         format: {
//           type: "string",
//           enum: ["celsius", "fahrenheit"],
//           description:
//             "The temperature unit to use. Infer this from the users location.",
//         },
//       },
//       required: ["location", "format"],
//     },
//   },
// ];

// Handle the POST request for the completion route
export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ensure there's a user query in the messages to form the context properly
  const userQuery =
    messages.find((message: any) => message.role === "user")?.content ||
    "Hope to respond to, and asnwer questions about tyson";

  // Helper function to serialize the profile for the AI context
  const serializeProfileForAIContext = (profile: Profile): string => {
    // Helper function to convert arrays into human-readable strings
    const arrayToReadableList = (array: string[]): string => {
      return array.length > 1
        ? `${array.slice(0, -1).join(", ")} and ${array[array.length - 1]}`
        : array[0];
    };

    // Helper function to serialize music preferences
    const serializeMusicPreferences = (music: FavouriteMusic): string => {
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
    
    // Helper function to serialize movie preferences
    const serializeMoviePreferences = (movies: FavouriteMovies): string => {
      return Object.entries(movies)
        .map(([key, value]) => {
          return `${key} for the reason ${value.reasonHeLikes} and quotes like ${arrayToReadableList(
            value.favouriteQuotes
          )}.`;
        })
        .join(" ");
    }

    // Serialize the profile into a readable format for the AI context
    const serializedProfile = `
    ${arrayToReadableList(profile.personal.names)}, lives ${arrayToReadableList(
      profile.personal.locationsLived
    )} has these qualities ${arrayToReadableList(
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
    )}. His favourite movies are ${serializeMoviePreferences( profile.favouriteMovies )}.
  `;
    return serializedProfile.trim(); // Trimming to ensure there are no leading/trailing whitespaces
  };

  // Serialize the profile for the AI context
  const tysonAIContext = serializeProfileForAIContext(tysonProfile);

  const contextMessage = {
    role: "system",
    content: `You are the personal AI created to answer questions about Tyson Skakun. Here's what you should know: ${tysonAIContext} When responding to inquiries about Tyson, please provide fun and engaging answers that reflect his personality and professional interests, and try to respond in 2-3 sentences.`,
  };

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages: [contextMessage, ...messages],
    // functions,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the streaming text response
  return new StreamingTextResponse(stream);
}
