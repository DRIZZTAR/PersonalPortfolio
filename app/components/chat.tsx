'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import AiResponse from './AiResponse';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import { FaPaperPlane } from 'react-icons/fa';

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy';
const getWeatherIcon = (weather: WeatherCondition) => {
	const iconSize = 30;
	const style = { marginRight: '10px' };
	switch (weather.toLowerCase()) {
		case 'sunny':
			return <WiDaySunny size={iconSize} style={style} />;
		case 'cloudy':
			return <WiCloudy size={iconSize} style={style} />;
		case 'rainy':
			return <WiRain size={iconSize} style={style} />;
		case 'snowy':
			return <WiSnow size={iconSize} style={style} />;
		default:
			return null;
	}
};

export default function Chat() {
	const [isFocused, setIsFocused] = useState(false);

	const functionCallHandler = async (chatMessages: any, functionCall: any) => {
		console.log('Function call received:', functionCall.name);
		if (functionCall.name === 'get_current_weather') {
			const weatherData = {
				temperature: Math.floor(Math.random() * (100 - 30 + 1) + 30),
				weather: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)],
				info: 'This data is randomly generated and not from a real weather API.',
			};

			console.log('Generated weather data:', weatherData);

			const functionResponse = {
				messages: [
					...chatMessages,
					{
						name: 'get_current_weather',
						role: 'function',
						content: JSON.stringify(weatherData),
					},
				],
			};
			return functionResponse;
		}
	};

	const { messages, input, handleInputChange, handleSubmit } = useChat({
		experimental_onFunctionCall: functionCallHandler,
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className='flex flex-col w-full max-w-xl mx-auto h-screen'>
			<div className='flex flex-col w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow flex-grow'>
				<div
					className='flex-grow flex flex-col justify-center'
					style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}
				>
					<div className='px-2 overflow-y-auto text-3xl font-bold tracking-tight text-zinc-100 sm:text-2xl'>
						{messages.map(m => {
							console.log('Rendering message details:', m);

							if (m.role === 'function') {
								try {
									const data = JSON.parse(m.content);
									console.log('Parsed function content:', data);

									return (
										<div
											style={{ fontFamily: 'Apple Garamond, sans-serif' }}
											key={m.id}
											className='whitespace-pre-wrap p-3 text-center text-slate-300 bg-gradient-to-r from-purple-300 via-blue-300/50 to-blue-400/10 border-l-4 border-slate-400 rounded-lg shadow-lg'
										>
											<div className='flex justify-center items-center'>
												{getWeatherIcon(data.weather)}
												<p className='text-xl font-semibold'>
													Temperature: {data.temperature}°
												</p>
											</div>
											<p className='text-lg'>{data.weather.toUpperCase()}</p>
										</div>
									);
								} catch (e) {
									console.error('Error parsing function content:', e);
									return (
										<div
											key={m.id}
											className='whitespace-pre-wrap p-3 text-center text-slate-300'
										>
											There was an error rendering the weather information.
										</div>
									);
								}
							} else {
								return <AiResponse key={m.id} role={m.role} content={m.content} />;
							}
						})}
						<div ref={messagesEndRef} />
					</div>
				</div>
				<form onSubmit={handleSubmit} className='flex-none relative m-8'>
					<div
						className={`relative transition-all duration-300 ease-in-out ${
							isFocused ? 'shadow-lg' : 'shadow'
						}`}
					>
						<input
							className='w-full px-4 py-3 pr-12 text-center rounded-full bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-800 transition-all duration-300 ease-in-out'
							value={input}
							placeholder='Ask me about Tyson...'
							onChange={handleInputChange}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
						/>
						<button
							type='submit'
							className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out'
							disabled={!input.trim()}
						>
							<FaPaperPlane
								className={`w-4 h-4 ${input.trim() ? 'opacity-100' : 'opacity-50'}`}
							/>
						</button>
					</div>

				</form>
			</div>
		</div>
	);
}