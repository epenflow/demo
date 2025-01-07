/* eslint-disable import/no-anonymous-default-export */
'use client';
import { ScrollTrigger, gsap } from 'gsap/all';
import { useLenis } from 'lenis/react';
import React from 'react';
gsap.registerPlugin(ScrollTrigger);

/* eslint-disable react/display-name */
export default function () {
	const lenis = useLenis();

	function scrollToTop(event: React.MouseEvent) {
		event.stopPropagation();
		lenis?.scrollTo(0, {
			duration: 0.5,
		});
	}
	function scrollToBottom(event: React.MouseEvent) {
		event.stopPropagation();
		lenis?.scrollTo(lenis.dimensions.scrollHeight, {
			duration: 0.5,
		});
		console.log(lenis);
	}

	return (
		<div className="h-[2000svh] relative">
			<p>Test</p>
			<button onClick={scrollToBottom}>Bottom</button>
			<button
				className="absolute bottom-0"
				onClick={scrollToTop}>
				scroll
			</button>
		</div>
	);
}
