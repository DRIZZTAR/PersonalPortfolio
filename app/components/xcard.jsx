'use client';

import { useEffect } from 'react';

export default function XCard({ tweetUrl, theme = 'dark' }) {
	useEffect(() => {
		// Load Twitter widget script
		const script = document.createElement('script');
		script.src = 'https://platform.twitter.com/widgets.js';
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div className='flex justify-center items-center'>
			<blockquote className='twitter-tweet' data-theme={theme}>
				<a href={tweetUrl}></a>
			</blockquote>
		</div>
	);
}
