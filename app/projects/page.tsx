'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/nav';
import Particles from '../components/particles';
import XCard from '../components/xcard';
import { motion } from 'framer-motion';

const tweetUrls = [
	'https://twitter.com/TysonJeremy/status/1799305094477054046',
	'https://twitter.com/TysonJeremy/status/1810386385653936215',
	'https://twitter.com/TysonJeremy/status/1809078125692924132',
	'https://twitter.com/TysonJeremy/status/1795669324423995418',
	'https://twitter.com/TysonJeremy/status/1808354043368202359',
	'https://twitter.com/TysonJeremy/status/1810892631662284940',
	'https://twitter.com/TysonJeremy/status/1806886567732244806',
	'https://twitter.com/TysonJeremy/status/1803484767024980409',
	'https://twitter.com/TysonJeremy/status/1797121650724688047',
	'https://twitter.com/TysonJeremy/status/1804704053215252943',
	'https://twitter.com/TysonJeremy/status/1802779644359524485',
	'https://twitter.com/TysonJeremy/status/1801709673592328331',
];

export default function ProjectsPage() {
	const [loading, setLoading] = useState(true);
	const [tweets, setTweets] = useState<string[]>([]);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const fetchTweets = async () => {
			setLoading(true);
			try {
				// Simulate API call with a delay
				await new Promise(resolve => setTimeout(resolve, 100));
				setTweets(tweetUrls);
			} catch (error) {
				console.error('Error fetching tweets:', error);
			} finally {
				setLoading(false);
				// Small delay to ensure smooth transition
				setTimeout(() => setShowContent(true), 100);
			}
		};

		fetchTweets();
	}, []);

	return (
		<div className='relative bg-gradient-to-bl from-black via-slate-400/20 to-black min-h-screen'>
			<Particles className='absolute inset-0 -z-10' quantity={100} />
			<Navigation />
			<div className='container mx-auto px-4 pt-16'>
				{loading ? (
					<LoadingSkeletons />
				) : (
					<div
						className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${
							showContent ? 'animate-title' : 'opacity-0'
						}`}
					>
						{tweets.map((url, index) => (
							<div key={index} className='shadow-lg overflow-hidden rounded-lg'>
								<XCard tweetUrl={url} theme='dark' />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function LoadingSkeletons() {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{[...Array(6)].map((_, index) => (
				<div key={index} className='bg-gray-800 rounded-lg shadow-lg p-4 animate-pulse'>
					<div className='h-48 bg-gray-700 rounded-md mb-4'></div>
					<div className='h-4 bg-gray-700 rounded w-3/4 mb-2'></div>
					<div className='h-4 bg-gray-700 rounded w-1/2'></div>
				</div>
			))}
		</div>
	);
}
