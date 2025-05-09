import Link from 'next/link';
import React from 'react';
import Particles from './components/particles';
import ThreeScene from './components/homepageCanvas';
import XCard from './components/xcard';
import Image from 'next/image';

const navigation = [
	{ name: 'Tysons AI', href: '/aichat' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Links', href: '/contact' },
];

export default function Home() {
	return (
		<div
			style={{ fontFamily: 'Apple Garamond Light, sans-serif' }}
			className='flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-r from-black via-slate-500/20 to-black'
		>
			<Particles
				className='absolute inset-0 -z-10 animate-fade-in'
				quantity={200}
			/>
			<nav className='my-16 animate-fade-in'>
				<ul className='flex items-center justify-center gap-4'>
					{navigation.map(item => (
						<Link
							key={item.href}
							href={item.href}
							className='text-xl duration-500 text-zinc-400 hover:text-zinc-300 animate-fade-in'
						>
							{item.name}
						</Link>
					))}
				</ul>
			</nav>
			<div>
				<h1
					style={{
						fontFamily: 'Lemon Milk Light, sans-serif',
						userSelect: 'none',
					}}
					className='z-10 pb-6 text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white/30 via-white to-white/10 cursor-default animate-title font-display sm:text-6xl md:text-8xl lg:text-9xl whitespace-nowrap duration-1000 text-edge-outline'
				>
					Tyson Skakun
				</h1>
				<h1
					style={{
						fontFamily: 'Lemon Milk Light, sans-serif',
						userSelect: 'none',
					}}
					className='z-10 pb-4 text-2xl text-transparent text-center bg-clip-text bg-gradient-to-r from-white via-slate-400/80 to-white/20 cursor-default animate-title font-display sm:text-5xl md:text-6xl whitespace-nowrap duration-1000 text-edge-outline'
				>
					Developer
				</h1>
			</div>
			{/* <div
				style={{
					userSelect: 'none',
					touchAction: 'none',
				}}
				className='mt-16 -z-9 flex justify-center items-center w-full md:w-4/4 animate-title'
			>
				<ThreeScene />
			</div> */}
			<div
				style={{ fontFamily: 'Apple Garamond Light, sans-serif' }}
				className='my-16 text-center animate-fade-in'
			>
				<h2 className='text-md md:text-xl  text-zinc-400 '>
					Current Project{' '}
					<Link
						target='_blank'
						href='https://fraimed.vercel.app/'
						className='underline duration-500 hover:text-zinc-300'
					>
						fraimed.vercel.app
					</Link>
					, and building with{' '}
					<Link
						target='_blank'
						href='https://www.create.xyz'
						className='underline duration-500 hover:text-zinc-300'
					>
						Create.xyz
					</Link>{' '}
				</h2>
				<h2 className='text-md md:text-xl text-zinc-400'>
					Looking for new opportunities{' '}
					<Link
						target='_blank'
						href='https://www.linkedin.com/in/tyson-skakun-tail/'
						className='underline duration-500 hover:text-zinc-300'
					>
						Connect
					</Link>
				</h2>
				<Image
					src='/logo.svg'
					alt='Logo'
					className='animate-title inline align-middle ml-2 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24' // Responsive width and height classes
					width={1440}
					height={1440}
				/>
			</div>
		</div>
	);
}
