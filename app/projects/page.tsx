'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/nav';
import Particles from '../components/particles';
import XCard from '../components/xcard';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTweets(tweetUrls);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return (
		<div className='relative bg-gradient-to-bl from-black via-slate-400/20 to-black min-h-screen'>
			<Particles className='absolute inset-0 -z-10' quantity={100} />
			<Navigation />
			<div className='container mx-auto px-4 pt-16'>
				<AnimatePresence>
					{loading ? (
						<LoadingSkeletons />
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0}}
							className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
						>
							{tweets.map((url, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0.2, x: 40, y: 20 }}
									animate={{ opacity: 1, x: 0, y: 0 }}
									transition={{delay: index += 0.1}}
									className='overflow-hidden rounded-lg'
								>
									<XCard tweetUrl={url} theme='dark' />
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
  );
}

function LoadingSkeletons() {
	return (
		<motion.div
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
		>
			{[...Array(tweetUrls.length)].map((_, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
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
				</motion.div>
			))}
		</motion.div>
	);
}