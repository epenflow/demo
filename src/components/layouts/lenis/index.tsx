import gsap from 'gsap';
import { LenisProps, LenisRef, ReactLenis } from 'lenis/react';
import React from 'react';

const Lenis: React.FC<
	LenisProps & {
		framerate?: number;
	}
> = ({ framerate = 500, options, ...rest }) => {
	const lenisRef = React.useRef<LenisRef>(null);

	React.useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * framerate);
		}
		gsap.ticker.add(update);
		return () => gsap.ticker.remove(update);
	}, [framerate]);
	function easing(time: number) {
		console.log(time);
		return Math.sin((time * Math.PI) / 2);
	}
	return (
		<ReactLenis
			{...rest}
			ref={lenisRef}
			options={{
				...options,
				autoRaf: false,
				easing,
			}}
		/>
	);
};
export default Lenis;
