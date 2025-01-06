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
				<section className="navbar-heading">
					<SplitText>Demo</SplitText>
				</section>
			</nav>
		</header>
	);
};
const resources = {
	select: {
		default: '',
		options: [
			{
				label: 'Scroll Trigger',
				value: 'test',
			},
		] satisfies Array<{
			value: string;
			label: string;
		}>,
	},
};
function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function $hoc(props: T) {
		const scope = React.useRef<HTMLElement>(null);

		useGSAP(
			() => {
				const heading = gsap.utils.toArray('[data-splitter]');
				gsap.from(heading, {
					yPercent: 100,
					ease: 'sine.inOut',
					stagger: {
						each: 0.5,
						amount: 1,
					},
				});

				const headerTween = gsap
					.to(scope.current, {
						yPercent: -100,
						paused: true,
						duration: 0.25,
						ease: 'sine.inOut',
					})
					.progress(1);

				ScrollTrigger.create({
					start: 'top top',
					end: 'max',
					markers: true,
					onUpdate(self) {
						console.log(self);
						self.direction === 1 ? headerTween.play() : headerTween.reverse();
					},
				});
			},
			{ scope },
		);
		return <Component {...{ ...props, scope }} />;
	};
}
export default hoc(Navbar);
