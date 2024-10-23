'use client';

import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Navigation } from '../components/nav';

const Particles = React.lazy(() => import('../components/particles'));
const XCard = React.lazy(() => import('../components/xcard'));

const tweetUrls = [
	'https://twitter.com/TysonJeremy/status/1847119911337988104',
	'https://twitter.com/TysonJeremy/status/1839739315322232892',
	'https://twitter.com/TysonJeremy/status/1818487260771500039',
	'https://twitter.com/TysonJeremy/status/1799305094477054046',
	'https://twitter.com/TysonJeremy/status/1821255883344769407',
	'https://twitter.com/TysonJeremy/status/1809078125692924132',
	'https://twitter.com/TysonJeremy/status/1816545216914227670',
	'https://twitter.com/TysonJeremy/status/1795669324423995418',
	'https://twitter.com/TysonJeremy/status/1797121650724688047',
];

export default function ProjectsPage() {
	const [loading, setLoading] = useState(true);

	const renderedTweets = useMemo(
		() =>
			tweetUrls.map((url, index) => (
				<div key={index} className='overflow-hidden rounded-lg'>
					<XCard tweetUrl={url} theme='dark' />
				</div>
			)),
		[]
	);

	useEffect(() => {
		// Simulate loading state transition
		const timer = setTimeout(() => setLoading(false), 1000); // Adjust timing as needed
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='relative bg-gradient-to-bl from-black via-slate-400/20 to-black min-h-screen'>
			<Particles className='absolute inset-0 -z-10' quantity={100} />
			<Navigation />
			<div className='container mx-auto px-4 pt-16'>
				{loading ? <LoadingSkeletons /> : null}
				<Suspense fallback={<div />}>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{renderedTweets}
					</div>
				</Suspense>
			</div>
		</div>
	);
}

function LoadingSkeletons() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr'>
			{[...Array(tweetUrls.length + 6)].map((_, index) => (
				<div key={index} className='bg-gray-800 rounded-lg shadow-lg p-4 animate-pulse'>
					<div className='flex items-center mb-4'>
						<div className='h-10 w-10 bg-gray-700 rounded-full mr-4'></div>
						<div>
							<div className='h-4 bg-gray-700 rounded w-32 mb-2'></div>
							<div className='h-4 bg-gray-700 rounded w-24'></div>
						</div>
					</div>
					<div className='h-32 bg-gray-700 rounded-md mb-4'></div>
					<div className='h-4 bg-gray-700 rounded w-full mb-2'></div>
					<div className='h-4 bg-gray-700 rounded w-5/6 mb-2'></div>
					<div className='h-4 bg-gray-700 rounded w-3/4'></div>
				</div>
			))}
		</div>
	);
}
