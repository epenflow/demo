import { useGSAP } from '@gsap/react';
import React from 'react';
import HeaderAnimator from '~/libs/modules/header-animator';
import { useLoader } from '../loader';
export interface Props {
	scope: React.RefObject<HTMLElement>;
	fnToggleMenu: () => void;
}
export default function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);
		const headerTimeline = React.useRef<GSAPTimeline | null>(null);
		const [isTrigger, setTrigger] = React.useState<boolean>(false);
		const { setLoaderDuration } = useLoader();
		useGSAP(
			(_, contextSafe) => {
				if (!contextSafe) return;
				const header = new HeaderAnimator(scope.current);
				if (typeof header.timeline !== 'undefined') {
					headerTimeline.current = header.timeline;
				}

				/**
				 * issue can't select .text--content
				 */
				// const textContent: HTMLElement[] = gsap.utils.toArray('.text--content');
				// textContent.forEach((text) => {
				// 	const animator = new TextAnimator(text);
				// 	const animate = contextSafe(() => {
				// 		animator.animate();
				// 	});
				// 	text.addEventListener('mouseenter', animate);
				// 	return () => text.removeEventListener('mouseenter', animate);
				// });
			},
			{ scope },
		);

		React.useEffect(() => {
			if (isTrigger) {
				headerTimeline.current?.play();
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'unset';
				setLoaderDuration(headerTimeline.current?.duration() || 0);
				headerTimeline.current?.reverse();
			}
		}, [isTrigger, setLoaderDuration]);

		const fnToggleMenu = React.useCallback(() => {
			setTrigger((prev) => !prev);
		}, [setTrigger]);

		return <Component {...{ ...props, scope, fnToggleMenu }} />;
	}
	return React.memo(HOC);
}
