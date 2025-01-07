'use client';
import gsap from 'gsap';
import { LenisProps, LenisRef, ReactLenis } from 'lenis/react';
import React from 'react';

const Lenis: React.FC<
	LenisProps & {
		frameRate?: number;
	}
> = ({ frameRate = 1_000, options, ...rest }) => {
	const lenisRef = React.useRef<LenisRef>(null);

	React.useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(frameRate * time);
		}
		gsap.ticker.add(update);
		return () => gsap.ticker.remove(update);
	}, [frameRate]);

	return (
		<ReactLenis
			{...rest}
			ref={lenisRef}
			options={{ ...options, autoRaf: false }}
		/>
	);
};
export default Lenis;
