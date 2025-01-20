import React from 'react';

interface State {
	max: number;
	len: number;
	fps: number[];
	frames: number;
	prevTime: number;
	width: number;
}
interface Props {
	top: number | string;
	right: number | string;
	left: number | string;
	bottom: number | string;
	height: number | string;
	width: number | string;
	translate: { x?: string | number; y?: string | number };
	condition: boolean;
}
const FPSStats: React.FC<Partial<Props>> = ({
	width = 80,
	height = 40,
	top = 'auto',
	left = 'auto',
	right = 'auto',
	bottom = 'auto',
	condition = true,
	translate = { x: 0, y: 0 },
}) => {
	const FPSComponent = () => {
		const $height = parseInt(String(height));
		const $width = parseInt(String(width));

		const [state, dispatch] = React.useReducer(fnFPSReducer, {
			max: 0,
			len: 0,
			fps: [],
			frames: 0,
			prevTime: 0,
			width: $width,
		} satisfies State);

		const CSSVariables = {
			top: top,
			left: left,
			right: right,
			bottom: bottom,
			height: 'fit-content',
			transform: `translate(${translate.x}, ${translate.y})`,
		} as React.CSSProperties;
		const RAFRef = React.useRef<number | null>(null);
		const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
		const { fps, max, len } = state;
		const RAF = React.useCallback(() => {
			dispatch();
			RAFRef.current = requestAnimationFrame(RAF);
		}, [dispatch]);
		React.useEffect(() => {
			RAFRef.current = requestAnimationFrame(RAF);
			return () => cancelAnimationFrame(RAFRef.current || 0);
		}, [RAF]);

		React.useEffect(() => {
			if (canvasRef.current) {
				const context = canvasRef.current.getContext('2d');

				if (context) {
					context.clearRect(0, 0, $width, $height);
					fps.forEach((frame, key) => {
						const barHeigh = ($height * frame) / max;
						let color: string;

						if (frame > 60) {
							color = 'rgba(0, 255, 0, 0.5)';
						} else if (frame > 30) {
							color = 'rgba(255, 255, 0, 0.5)';
						} else {
							color = 'rgba(255, 0, 0, 0.5)';
						}

						context.fillStyle = color;
						context.fillRect(len - 1 - key, $height - barHeigh, 1, barHeigh);
					});
				}
			}
		}, [$height, $width, fps, len, max]);

		/**
		 *
		 * FPSBar Component
		 */
		// const FPSBar = () => {
		// 	return (
		// 		<div
		// 			className="bg-indigo-600/10 relative border overflow-hidden border-white/10"
		// 			style={{
		// 				height: height,
		// 			}}>
		// 			{fps.map((frame, key) => {
		// 				const FPSVariables = {
		// 					'--right': `${len - 1 - key}px`,
		// 					'--height': `${($height * frame) / max}px`,
		// 				} as React.CSSProperties;
		// 				return (
		// 					<span
		// 						key={`fps-${key}`}
		// 						style={FPSVariables}
		// 						className={cn(
		// 							'block box-border absolute w-1 bottom-0 bg-red-600/50',
		// 							'right-[var(--right)] h-[var(--height)]',
		// 							frame > 60
		// 								? 'bg-green-600/50'
		// 								: frame > 30 && 'bg-yellow-500/50',
		// 						)}
		// 					/>
		// 				);
		// 			})}
		// 		</div>
		// 	);
		// };

		return (
			<div
				style={CSSVariables}
				className="p-2 rounded-[0.5rem] border border-white/10 bg-black/80 backdrop-blur-xl space-y-2 pointer-events-none fixed z-50">
				<span className="text-xs font-medium text-white/80">
					{Math.round(fps[len - 1])} FPS
				</span>
				<canvas
					ref={canvasRef}
					height={$height}
					width={$width}
					className="bg-indigo-600/10 relative border border-white/10"
				/>
			</div>
		);
	};

	if (!condition) return null;

	return <FPSComponent />;
};

export default FPSStats;

function fnFPSReducer(state: State): State {
	const currentTime = performance.now();
	if (currentTime > state.prevTime + 1000) {
		const nextFPS = [
			...new Array(Math.floor((currentTime - state.prevTime - 1000) / 1000)).fill(0),
			Math.max(1, Math.round(state.frames * 1000) / (currentTime - state.prevTime)),
		];
		return {
			width: state.width,
			max: Math.max(state.max, ...nextFPS),
			len: Math.min(state.len + nextFPS.length, state.width),
			fps: [...state.fps, ...nextFPS].slice(-state.width),
			frames: 1,
			prevTime: performance.now(),
		};
	} else {
		return { ...state, frames: state.frames + 1 };
	}
}
