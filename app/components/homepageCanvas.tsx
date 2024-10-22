'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { AsciiRenderer, Float, Cone, Environment } from '@react-three/drei';
import { useState, useRef } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';

interface PyramidProps {
	position: [number, number, number];
	rotation: [number, number, number];
	color?: string;
	initialSpeed?: number;
	hoverable?: boolean;
}

function Pyramid({
	color = '#ff0000',
	position = [0, 0, 0] as [number, number, number],
	rotation = [0, 0, 0] as [number, number, number],
	initialSpeed = 0.5, // Renamed to initialSpeed
}: PyramidProps) {
	const pyramidRef = useRef<THREE.Mesh>(null);
  const mainPyramidRef = useRef<THREE.Mesh>(null);
	const [time, setTime] = useState(0);
	const [speed, setSpeed] = useState(initialSpeed); // Current speed state
	const [hovered, setHovered] = useState(false); // To track hover state
	const initialY = position[1]; // Store the initial Y position

	// Function to toggle speed when clicked
	const toggleSpeed = () => {
		// If current speed is greater than initial speed, reset to initial, else speed up
		setSpeed(prevSpeed =>
			prevSpeed > initialSpeed ? initialSpeed : prevSpeed * 2
		);
	};

	useFrame((state, delta) => {
		if (pyramidRef.current ) {
			// Rotate based on current speed
			pyramidRef.current.rotation.y += delta * speed;

      pyramidRef.current.rotation.x += delta * speed;

			// Update time for sine wave
			setTime(prev => prev + delta);

			// Apply sine wave to y position
			pyramidRef.current.position.y =
				initialY + Math.sin(time * 1) * 0.2;
		}
	});

	return (
		<Cone
			ref={pyramidRef}
			args={[0.8, 1.6, 4]}
			position={position}
			rotation={rotation}
			onPointerOver={() => setHovered(true)} // Change hover state
			onPointerOut={() => setHovered(false)} // Reset hover state
			onPointerDown={toggleSpeed} // Toggle speed on click
		>
			<meshStandardMaterial
				metalness={1.0}
				roughness={0.0}
				color={hovered ? 'white' : color} // Change color on hover
			/>
		</Cone>
	);
}

export default function ThreeScene() {
	return (
		<Canvas camera={{ fov: 45 }}>
			<Environment preset='studio' />

			<group position={[0, -0.5, 0]} scale={1.5}>
				{/* Centered Pyramid - Medium speed */}
				<Pyramid
					position={[0, 0.5, 0.5]}
					rotation={[3, 0, 0]}
					color={'#141414'}
					initialSpeed={0.1} // Set initial speed
				/>
				{/* Left Pyramid - Slow speed */}
				<Pyramid
					position={[-2.5, 0, -3]}
					rotation={[Math.PI * 1, 0, Math.PI * 1]}
					initialSpeed={0.2} // Set initial speed
					color={'yellow'}
				/>
				{/* Right Pyramid - Fast speed */}
				<Pyramid
					position={[2.5, 0, -3]}
					rotation={[0, 0, 0]}
					initialSpeed={0.2} // Set initial speed
					color={'yellow'}
				/>
			</group>
		</Canvas>
	);
}
