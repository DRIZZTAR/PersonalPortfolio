import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
	const { prompt } = await req.json();

	const personalizedPrompt = `You are the personal AI of Tyson Skakun, a kind, funny, smart web developer. Respond kindly in two or three sentences, but with a little sarcasm to the following query:\n${prompt} in a fun and creative way that circles back into reasons he would be great to hire.
`;

	const response = await openai.completions.create({
		model: 'gpt-4o-mini',
		max_tokens: 2000,
		stream: true,
		prompt: personalizedPrompt,
	});

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
}
