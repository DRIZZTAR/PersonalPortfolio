'use client';

import React, {
	useState,
	useEffect,
	lazy,
	Suspense,
	useCallback,
	useMemo,
} from 'react';
import { Navigation } from '../components/nav';

const Particles = lazy(() => import('../components/particles'));
const XCard = lazy(() => import('../components/xcard'));

const tweetUrls = [
	'https://twitter.com/TysonJeremy/status/1818487260771500039',
	'https://twitter.com/TysonJeremy/status/1799305094477054046',
	'https://twitter.com/TysonJeremy/status/1817973848819777890',
	'https://twitter.com/TysonJeremy/status/1810386385653936215',
	'https://twitter.com/TysonJeremy/status/1809078125692924132',
	'https://twitter.com/TysonJeremy/status/1816545216914227670',
	'https://twitter.com/TysonJeremy/status/1795669324423995418',
	'https://twitter.com/TysonJeremy/status/1808354043368202359',
	'https://twitter.com/TysonJeremy/status/1810892631662284940',
	'https://twitter.com/TysonJeremy/status/1803484767024980409',
	'https://twitter.com/TysonJeremy/status/1797121650724688047',
	'https://twitter.com/TysonJeremy/status/1804704053215252943',
];

export default function ProjectsPage() {
	const [loading, setLoading] = useState(true);
	const [tweets, setTweets] = useState<string[]>([]);

	const fetchTweets = useCallback(async () => {
		try {
			setTweets(tweetUrls);
		} catch (error) {
			console.error('Error fetching tweets:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTweets();
	}, [fetchTweets]);

	const renderedTweets = useMemo(
		() =>
			tweets.map((url, index) => (
				<div key={index} className='overflow-hidden rounded-lg'>
					<XCard tweetUrl={url} theme='dark' />
				</div>
			)),
		[tweets]
	);

	return (
		<div className='relative bg-gradient-to-bl from-black via-slate-400/20 to-black min-h-screen'>
			<Suspense fallback={<div>Loading particles...</div>}>
				<Particles className='absolute inset-0 -z-10' quantity={100} />
			</Suspense>
			<Navigation />
			<div className='container mx-auto px-4 pt-16'>
				{loading ? (
					<LoadingSkeletons />
				) : (
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{renderedTweets}
					</div>
				)}
			</div>
		</div>
	);
}

function LoadingSkeletons() {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{[...Array(tweetUrls.length)].map((_, index) => (
				<div
					key={index}
					className='bg-gray-800 rounded-lg shadow-lg p-4 animate-pulse'
				>
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
