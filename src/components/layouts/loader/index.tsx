import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import { create } from 'zustand';

const Loader = React.lazy(() => import('~/components/layouts/loader/component'));

interface LoaderContext {
	loaderDuration: number;
	setLoaderDuration: (time: number) => void;
}

export const useLoader = create<LoaderContext>((setter) => ({
	loaderDuration: 0,
	setLoaderDuration(time: number) {
		setter({ loaderDuration: time });
	},
}));

export interface Props {
	scope: React.RefObject<HTMLDivElement>;
}
export default function withLoader<T extends object>(Component: React.ComponentType<T>) {
	function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);
		const { loaderDuration } = useLoader();

		useGSAP(
			() => {
				const firstLoader = scope.current!.querySelectorAll(
					'.loader--first > .loader--item',
				);
				const secondLoader = scope.current!.querySelectorAll(
					'.loader--second > .loader--item',
				);

				const loaderAnimation = {
					duration: 1.5,
					delay: loaderDuration > 0 ? loaderDuration - 1 : 0,
					stagger: {
						each: 0.25,
						amount: 0.25,
						from: 'center',
					},
				} satisfies GSAPTweenVars;

				const timeline = gsap.timeline({
					defaults: {
						onComplete: () => {
							const loader = scope.current?.querySelector('.loader--outer');
							if (loader) {
								scope.current?.removeChild(loader);
							}
						},
					},
				});

				timeline.to(
					firstLoader,
					{
						...loaderAnimation,
						clipPath: 'inset(0% 0% 100% 0%)',
					},
					0,
				);
				timeline.to(
					secondLoader,
					{
						...loaderAnimation,
						clipPath: 'inset(100% 0% 0% 0%)',
					},
					0,
				);
			},
			{ scope },
		);

		return (
			<section ref={scope}>
				<Loader />
				<Component {...props} />
			</section>
		);
	}
	return React.memo(HOC);
}
