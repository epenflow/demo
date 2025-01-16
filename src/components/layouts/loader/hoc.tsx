import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import Loader from '~/components/layouts/loader';
import { useLoader } from './hook';

export interface Props {
	scope: React.RefObject<HTMLDivElement>;
}
export default function withLoader<T extends object>(Component: React.ComponentType<T>) {
	return function HOC(props: T) {
		const [isActive, setActive] = React.useState<boolean>(true);
		const { duration } = useLoader();
		const scope = React.useRef<HTMLDivElement>(null);

		useGSAP(
			(_, contextSafe) => {
				if (contextSafe && scope.current) {
					const init = contextSafe(() => {
						const loader: HTMLDivElement[] = gsap.utils.toArray('[data-loader]');
						const stagger = {
							each: 0.5,
							amount: 1,
						};
						if (duration >= 0.5) {
							gsap.from(loader, {
								height: '0%',
								autoAlpha: 0,
								stagger,
							});
						}
						gsap.to(loader, 1, {
							height: '0%',
							ease: 'sine.inOut',
							autoAlpha: 0,
							delay: duration,
							onComplete: () => {
								setActive(false);
							},
							stagger,
						});
					});

					init();
					window.addEventListener('resize', init);
					return window.removeEventListener('resize', init);
				}
			},
			{ scope: scope, dependencies: [duration, isActive] },
		);

		return (
			<>
				{isActive && <Loader scope={scope} />}
				<Component {...props} />
			</>
		);
	};
}
