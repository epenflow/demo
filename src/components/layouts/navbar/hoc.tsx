import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import { useLoader } from '~/components/layouts/loader';
import HeaderAnimator from '~/libs/modules/header-animator';
import TextAnimator from '~/libs/modules/text-animator';
export interface Props {
	scope: React.RefObject<HTMLElement>;
	fnToggleMenu: () => void;
}
export default function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);
		const headerTimeline = React.useRef<GSAPTimeline | null>(null);
		const [isTrigger, setTrigger] = React.useState<boolean>(false);
		const { setDuration } = useLoader();
		useGSAP(
			(_, contextSafe) => {
				if (!contextSafe) return;
				const header = new HeaderAnimator(scope.current);
				if (typeof header.timeline !== 'undefined') {
					headerTimeline.current = header.timeline;
				}

				const textContent: HTMLElement[] = gsap.utils.toArray('.text--content');
				textContent.forEach((text) => {
					const animator = new TextAnimator(text);
					const animate = contextSafe(() => {
						animator.animate();
					});
					text.addEventListener('mouseenter', animate);
					return () => text.removeEventListener('mouseenter', animate);
				});
			},
			{ scope },
		);

		React.useEffect(() => {
			if (isTrigger) {
				headerTimeline.current?.play();
				window.document.body.style.overflow = 'hidden';
			} else {
				setDuration(headerTimeline.current?.duration() || 0);
				window.document.body.style.overflow = 'unset';
				headerTimeline.current?.reverse();
			}
			console.log({ isTrigger, headerTimeline });
		}, [isTrigger, setDuration]);

		const fnToggleMenu = React.useCallback(() => {
			setTrigger((prev) => !prev);
		}, [setTrigger]);

		return <Component {...{ ...props, scope, fnToggleMenu }} />;
	}
	return React.memo(HOC);
}
