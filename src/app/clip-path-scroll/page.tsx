'use client';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

import './base.css';
interface Props {
	scope: React.RefObject<HTMLElement | null>;
}
const Base: React.FC<Props> = ({ scope }) => {
	return (
		<main ref={scope}>
			{Object.entries(resources).map(([id, items]) => (
				<article
					key={id}
					className="views">
					<section className="container--outer">
						{items.map(({ src, size, background }, index) => {
							const CSSVariables = {
								'--container-zIndex': (items.length - index) * 10,
								'--container-background': background,
								'--background-image-size': size || '100%',
								'--background-image': `url("${src}")`,
							} as React.CSSProperties;
							return (
								<section
									data-trigger
									key={index}
									style={CSSVariables}
									className="container--inner">
									<div className="container--image" />
								</section>
							);
						})}
					</section>
				</article>
			))}
		</main>
	);
};
export default hoc(Base);
function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);

		useGSAP(() => {
			const views: HTMLElement[] = gsap.utils.toArray('.views');

			views.forEach((view) => {
				const triggers = view.querySelectorAll('[data-trigger]');
				const timeline = gsap.timeline({
					scrollTrigger: {
						pin: view,
						start: 'top top',
						end: 'bottom+=1000%',
						scrub: 1.5,
					},
				});

				triggers.forEach((trigger, index) => {
					const end = index === triggers.length - 1;
					timeline.to(trigger, {
						clipPath: end ? 'none' : 'inset(0% 100% 0% 0%)',
					});
				});
			});
		});

		return <Component {...{ ...props, scope }} />;
	};
}
const resources = {
	beer: [
		{
			src: `https://ucarecdn.com/2a424f45-6307-4115-bdd0-628cc9304af2/-/preview/1000x833/`,
			background: '#7ad6d5',
			size: '100%',
		},
		{
			src: `https://ucarecdn.com/721e0b39-d454-4efb-846d-0b10ef2109a4/-/preview/1000x833/`,
			background: '#f9f5f0',
			size: '100%',
		},
		{
			src: `https://ucarecdn.com/e93a42f3-7895-4491-8bd2-e884e507ccf6/-/preview/1000x833/`,
			background: '#48645d',
			size: '100%',
		},
		{
			src: `https://ucarecdn.com/f6c56006-e481-478b-b703-11574ea16464/-/preview/1000x833/`,
			background: '#f8a919',
			size: '100%',
		},
	],
	arak: [
		{
			src: `https://ucarecdn.com/e236ed71-5520-497d-802d-45cf79b71c9e/-/preview/357x900/`,
			background: `#f7f8f8`,
			size: '75%',
		},
		{
			src: `https://ucarecdn.com/eb70f338-886f-4135-a0d1-2d0206e5e48a/-/preview/357x900/`,
			background: '#ffda41',
			size: '75%',
		},
		{
			src: `https://ucarecdn.com/d03cce5c-13c1-4fb2-8c17-1d17900234f3/-/preview/357x900/`,
			background: '#ffbc3e',
			size: '75%',
		},
		{
			src: `https://ucarecdn.com/b41781d6-29f0-4e97-826a-a205b4fe3dfc/-/preview/357x900/`,
			background: '#ff8d63',
			size: '75%',
		},
		{
			src: `https://ucarecdn.com/7b7b53a2-3bc3-4ada-b8d8-6f113e5e7cd1/-/preview/357x900/`,
			background: `#c22929`,
			size: '75%',
		},
	],
} satisfies Record<
	string,
	Array<{
		src: string;
		background: string;
		size: string;
	}>
>;
