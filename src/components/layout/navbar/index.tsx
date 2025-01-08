'use client';
import SplitText from '@/components/base/split-text';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from 'gsap/all';
import React from 'react';
import './base.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
	scope: React.RefObject<HTMLElement | null>;
}
const Navbar: React.FC<Props> = ({ scope }) => {
	return (
		<header
			ref={scope}
			className="header-container">
			<nav className="navbar">
				<section
					data-magnet-hover
					className="navbar-heading">
					<SplitText>Demo</SplitText>
				</section>
			</nav>
		</header>
	);
};

function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);

		useGSAP(
			() => {
				console.log('gsap render');
				const headings: HTMLElement[] = gsap.utils.toArray('[data-splitter]');

				const tween = gsap
					.to(scope.current, {
						yPercent: -100,
						duration: 0.5,
						paused: true,
					})
					.progress(0);
				gsap.from(headings, {
					yPercent: 100,
					xPercent: 100,
					ease: 'sine.inOut',
					stagger: {
						each: 0.5,
						amount: 0.5,
					},
				});

				ScrollTrigger.create({
					start: 'top top',
					end: 'max',
					markers: process.env.NODE_ENV == 'development',
					onUpdate: (self) => {
						console.log(self);
						if (self.direction === 1) {
							tween.play();
						} else {
							tween.reverse();
						}
					},
				});
			},
			{ scope },
		);
		return <Component {...{ ...props, scope }} />;
	};
}
export default hoc(Navbar);
