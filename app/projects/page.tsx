'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/nav';
import Particles from '../components/particles';
import XCard from '../components/xcard';

export default function ProjectsPage() {
	const [loading, setLoading] = useState(true);
	const [showContent, setShowContent] = useState(false);
	const tweetUrls = [
		'https://twitter.com/TysonJeremy/status/1799305094477054046', // La Vie En Rose
		'https://twitter.com/TysonJeremy/status/1810386385653936215', // Macbook Configurator
		'https://twitter.com/TysonJeremy/status/1809078125692924132', // Vercel Ascii
		'https://twitter.com/TysonJeremy/status/1795669324423995418', // Space Galaxy
		'https://twitter.com/TysonJeremy/status/1808354043368202359', // 3d X cards
		'https://twitter.com/TysonJeremy/status/1810892631662284940', // Terminator
		'https://twitter.com/TysonJeremy/status/1806886567732244806', // Bang Bang
		'https://twitter.com/TysonJeremy/status/1803484767024980409', // Space x
		'https://twitter.com/TysonJeremy/status/1797121650724688047', // Speedo
		'https://twitter.com/TysonJeremy/status/1804704053215252943', // Skateboard
		'https://twitter.com/TysonJeremy/status/1802779644359524485', // Sliced Gears
		'https://twitter.com/TysonJeremy/status/1801709673592328331', // Expanding orange triangles
	];

	useEffect(() => {
		const fetchTweets = async () => {
			setLoading(true);
			await new Promise(resolve => setTimeout(resolve, 400));
			setLoading(false);
			setTimeout(() => setShowContent(true), 10); // Small delay to ensure smooth transition
		};

		fetchTweets();
	}, []);

	return (
		<div className='relative bg-gradient-to-bl from-black via-slate-400/20 to-black min-h-screen'>
			<Particles className='absolute inset-0 -z-10' quantity={200} />
			<Navigation />
			<div className='container mx-auto px-4 pt-16'>
				{loading ? (
					<div className='flex justify-center items-center min-h-screen'>
						<div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-l-pink-500 border-r-pink-500 border-b-pink-500'></div>
					</div>
				) : (
					<div
						className={`grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 ${
							showContent ? 'animate-title' : 'opacity-0'
						}`}
					>
						{tweetUrls.map((url, index) => (
							<div key={index} className='shadow-lg overflow-hidden'>
								<XCard tweetUrl={url} theme='dark' />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
