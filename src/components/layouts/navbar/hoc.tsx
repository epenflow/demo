import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import { useLoader } from '~/components/layouts/loader';
export interface Props {
	scope: React.RefObject<HTMLElement>;
}
export default function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);
		const { setDuration } = useLoader();
		useGSAP(
			() => {
				const button = scope.current?.querySelector('button');
				const headerInner = scope.current?.querySelector('.header--inner');
				const headerContent = scope.current?.querySelector('.header--content');
				const spans = scope.current?.querySelectorAll('span');

				if (button && headerInner && headerContent && spans) {
					const timeline = gsap
						.timeline({
							paused: true,
							defaults: {
								ease: 'power4.inOut',
								duration: 0.5,
							},
						})
						.to(
							headerInner,
							{
								width: '20rem',
							},
							0,
						)
						.to(
							button,
							{
								ease: 'linear',
								left: `calc(20rem - 1rem)`,
							},
							0.5,
						)
						.to(
							scope.current,
							{
								duration: 1,
								height: `calc(100svh - calc(var(--header-top) * 2))`,
							},
							0.5,
						)
						.from(
							headerContent,
							{
								autoAlpha: 0,
								display: 'none',
							},
							0,
						)
						.from(spans, {
							yPercent: -100,
							xPercent: -100,
							rotateY: 45,
							ease: 'sine.inOut',
							stagger: {
								each: 0.5,
								amount: 0.5,
							},
						});
					let isActive = false;
					button.addEventListener('click', () => {
						isActive = !isActive;
						if (isActive) {
							timeline.play();
						} else {
							setDuration(timeline.duration());
							timeline.reverse();
						}
					});
					spans.forEach((span) => {
						span.addEventListener('click', () => {
							isActive = !isActive;

							if (isActive) {
								timeline.play();
							} else {
								setDuration(timeline.duration());
								timeline.reverse();
							}
						});
					});
				}
			},
			{ scope },
		);
		return <Component {...{ ...props, scope }} />;
	};
}
