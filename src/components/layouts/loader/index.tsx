import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import { create } from 'zustand';
import Loader from '~/components/layouts/loader/component';
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
		const scope = React.useRef<HTMLDivElement>(null);
		const [isLoader, setLoader] = React.useState<boolean>(true);
		const { loaderDuration } = useLoader();

		useGSAP(
			() => {
				if (scope.current) {
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
							amount: 1,
							from: 'center',
						},
					} satisfies GSAPTweenVars;

					gsap.to(firstLoader, {
						...loaderAnimation,
						clipPath: 'inset(0% 0% 100% 0%)',
					});
					gsap.to(secondLoader, {
						...loaderAnimation,
						clipPath: 'inset(100% 0% 0% 0%)',
						onComplete: () => setLoader(false),
					});
				}
			},
			{ scope, dependencies: [loaderDuration, setLoader] },
		);

		return (
			<>
				{isLoader ? <Loader scope={scope} /> : null}
				<Component {...props} />
			</>
		);
	}
	return React.memo(HOC);
}
