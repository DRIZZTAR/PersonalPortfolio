import { createAI, getMutableAIState, createStreamableUI } from "ai/rsc";
import { OpenAI } from "openai";
import { runOpenAICompletion } from "@/lib/utils";

// components
import AiResponseCard from "@/components/UI/chat/AiResponseCard";
import StatBar from "@/components/UI/chat/character/StatBar";
import ShowItems from "@/components/UI/api/ShowItems";
import UserDeath from "@/components/UI/chat/character/UserDeath";
import Spinner from "@/components/UI/icons/Spinner";
import ShowItemSkeleton from "@/components/UI/loading/ShowItemsSkeleton";
import EmptyCardSkeleton from "@/components/UI/loading/EmptyCardSkeleton";
import ImageContainer from "@/components/UI/api/ImageContainer";
import ImageSkeleton from "@/components/UI/loading/ImageSkeleton";
import AddItemSkeleton from "@/components/UI/loading/AddItemSkeleton";
import AddItem from "@/components/UI/api/AddItem";

// api schema
import { updateStats } from "@/helpers/apiSchema/statUpdate";
import { viewStats } from "@/helpers/apiSchema/statView";
import { removeItem } from "@/helpers/apiSchema/removeItem";
import { userDeath } from "@/helpers/apiSchema/userDeath";
import { showImage } from "@/helpers/apiSchema/showImage";
import { addItem } from "@/helpers/apiSchema/addItem";

// db calls
import {
  removeCharacterItem,
  updateCharacterStat,
  saveMessage,
} from "@/helpers/database/apiDBCall";
import AICard from "@/components/UI/card/AICard";
// import { API_URL } from "@clerk/nextjs/dist/types/server"; // was breaking the build

// Our OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function submitUserMessage(userInput, gameData) {
  "use server";

  const {
    // Object
    genre,
    // Object
    subGenre,
    // Int
    gameId,
    // String
    gameSessionId,
    // String
    name,
    // String
    image,
    // String
    description,
    // String
    initialPrompt,
    // String
    objective,
    // Array of strings
    subObjectives,
    // String
    userId,
    // String
    username,
    // Object
    character,
    // Array Of Objects
    messages,
  } = gameData;

  const tyson = {
    name: "Tyson Skakun",
    age: 32,
    occupation: "web developer",
    favourite_foods: ["pizza", "sushi", "burgers"],
    favourite_drinks: ["coffee", "beer", "water"],
    favourite_movies: ["The Matrix", "The Dark Knight", "Inception"],

  };
  }

  const statView = await viewStats(stats);
  const statUpdate = await updateStats(stats);
  const userDied = await userDeath(characterSessionId);

  const allFunctions = [
    ...statUpdate,
    ...statView,
    userDied,
  ];

  const aiState = getMutableAIState();

  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  const reply = createStreamableUI(<div>{Spinner}</div>);

  // We want to pass the game character's stats to the API instead of setting to 100
  // suggestion: we could make a db call to get the character's stats and pass them into the string template below for the system
  const completion = runOpenAICompletion(openai, {
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages: [
      {
        role: "system",
        content: `\
  You are a personal assistant for ${tyson}.`,
      },
      ...aiState.get().map((info) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: allFunctions,
  });

  completion.onTextContent((content, isFinal, role) => {
    reply.update(
      <AiResponseCard
        adventureImage={image}
        character={character}
        content={content}
        role={role}
        name={name}
      />
    );
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: "assistant", content }]);

      saveMessage(gameSessionId, userId, { content, type: "AI_MESSAGE" });
    }
  });

  completion.onFunctionCall("view_health", async ({ value, value_change }) => {
    reply.update(<EmptyCardSkeleton />);

    reply.done(
      <StatBar
        name={stats[0].name}
        shortName={stats[0].shortName}
        symbol={stats[0].symbol}
        max={stats[0].max}
        value={value}
        color={stats[0].color}
        description={value_change}
        image={character.image}
        characterName={character.name}
      />
    );
    return;
  });

  completion.onFunctionCall("user_death", async ({ death_description }) => {
    reply.done(
      <UserDeath
        death_description={death_description}
        characterName={character.name}
      />
    );
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}

// It can contain any JSON object.
const initialAIState = [];

// Used on client side and contains the message IDs and their "UI nodes".
const initialUIState = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
