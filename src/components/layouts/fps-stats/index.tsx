import React from 'react';

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

		const CSSVariables = {
			top: top,
			left: left,
			right: right,
			bottom: bottom,
			height: 'fit-content',
			transform: `translate(${translate.x}, ${translate.y})`,
		} as React.CSSProperties;
		const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
		const spanRef = React.useRef<HTMLSpanElement | null>(null);
		React.useEffect(() => {
			const worker = new Worker(new URL('./worker.ts', import.meta.url));
			worker.onmessage = (event: MessageEvent<{ fps: string }>) => {
				if (spanRef.current) {
					spanRef.current.innerHTML = event.data.fps;
				}
			};
			if (canvasRef.current) {
				const canvas = canvasRef.current.transferControlToOffscreen();
				worker.postMessage({ canvas, height: $height, width: $width }, [canvas]);
			}
			return () => {
				worker.terminate();
			};
		}, [$height, $width]);

		return (
			<div
				style={CSSVariables}
				className="p-2 rounded-[0.5rem] border border-white/10 bg-black/80 backdrop-blur-xl space-y-2 pointer-events-none fixed z-50">
				<span
					className="text-xs font-medium text-white/80"
					ref={spanRef}
				/>

				<canvas
					ref={canvasRef}
					height={$height}
					width={$width}
					className="bg-indigo-600/10 relative border border-white/10 rounded-[0.25rem]"
				/>
			</div>
		);
	};

	if (!condition) return null;

	return <FPSComponent />;
};

export default FPSStats;
