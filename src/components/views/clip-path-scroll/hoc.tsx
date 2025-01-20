import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from 'gsap/all';

import React from 'react';
import { isProduction } from '~/libs/utils';
gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface Props {
	scope: React.RefObject<HTMLElement>;
}
export default function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);

		useGSAP(
			() => {
				const views: HTMLElement[] = gsap.utils.toArray('.views');

				views.forEach((view) => {
					const triggers = view.querySelectorAll('[data-trigger]');
					const timeline = gsap.timeline({
						scrollTrigger: {
							pin: view,
							start: 'top top',
							end: `bottom+=500%`,
							scrub: 1.5,
							markers: !isProduction(),
						},
					});

					triggers.forEach((trigger, index) => {
						const end = index === triggers.length - 1;
						timeline.to(trigger, {
							clipPath: end ? 'none' : 'inset(0% 100% 0% 0%)',
						});
					});
				});
			},
			{ scope },
		);

		return <Component {...{ ...props, scope }} />;
	};
}
