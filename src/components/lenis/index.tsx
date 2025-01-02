"use client";
import { Flip, gsap, ScrollTrigger } from "gsap/all";
import "lenis/dist/lenis.css";
import { LenisProps, LenisRef, ReactLenis } from "lenis/react";
import React from "react";

gsap.registerPlugin(ScrollTrigger, Flip);
ScrollTrigger.defaults({
	markers: process.env.NODE_ENV === "development",
});

export default function ({ root, options, ...rest }: LenisProps) {
	const ref = React.useRef<LenisRef | null>(null);

	React.useEffect(() => {
		function update(time: number) {
			ref.current?.lenis?.raf(time * 1000);
		}
		gsap.ticker.lagSmoothing(0);
		gsap.ticker.add(update);
		return () => gsap.ticker.remove(update);
	}, []);

	return (
		<ReactLenis
			{...rest}
			ref={ref}
			root={root}
			options={{
				...options,
				autoRaf: false,
			}}
		/>
	);
}
