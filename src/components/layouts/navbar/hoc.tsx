import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
export interface Props {
	scope: React.RefObject<HTMLElement>;
}
export default function hoc<T extends object>(Component: React.ComponentType<T>) {
	return function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);
		useGSAP(
			() => {
				const button = scope.current?.querySelector('button');
				const headerInner = scope.current?.querySelector('.header--inner');
				const headerContent = scope.current?.querySelector('.header--content');
				const span = scope.current?.querySelectorAll('span');

				if (button && headerInner && headerContent && span) {
					const timeline = gsap
						.timeline({
							paused: true,
							defaults: {
								ease: 'power4.inOut',
								duration: 0.5,
							},
						})
						.to(headerInner, {
							width: '20rem',
						})
						.to(button, {
							ease: 'linear',
							left: `calc(20rem - 1rem)`,
						})
						.to(scope.current, {
							duration: 1,
							height: `calc(100svh - calc(var(--header-top) * 2))`,
						})
						.from(span, {
							yPercent: -100,
							stagger: {
								each: 0.5,
								amount: 0.25,
							},
						});

					let isActive = false;
					button.addEventListener('click', () => {
						isActive = !isActive;
						if (isActive) {
							timeline.play();
						} else {
							timeline.reverse();
						}
					});
				}
			},
			{ scope },
		);
		return <Component {...{ ...props, scope }} />;
	};
}
