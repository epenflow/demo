'use client';
import SplitText from '@/components/base/split-text';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from 'gsap/all';
import React from 'react';
import './base.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
	scope: React.RefObject<HTMLElement | null>;
}
const Navbar: React.FC<Props> = ({ scope }) => {
	const { dropdowns } = resources;

	function select(value: string) {
		window.location.replace(value);
	}

	return (
		<header
			ref={scope}
			className="header-container">
			<nav className="navbar">
				<section
					suppressHydrationWarning
					className="navbar-heading">
					<SplitText>EF//@epenflow</SplitText>
				</section>
				<section>
					<Select onValueChange={select}>
						<SelectTrigger>Select Pages</SelectTrigger>
						<SelectContent>
							{dropdowns.map(({ title, href }, key) => (
								<SelectItem
									key={key}
									value={href}>
									{title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</section>
			</nav>
		</header>
	);
};
const resources = {
	dropdowns: [
		{
			title: 'Home',
			href: './',
		},
		{
			title: 'clip path scroll',
			href: './clip-path-scroll',
		},
	] satisfies Array<{ title: string; href: string }>,
};
function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);

		useGSAP(
			() => {
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
