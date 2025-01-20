self.onmessage = function (
	event: MessageEvent<{
		height: number;
		width: number;
		canvas: OffscreenCanvas;
	}>,
) {
	const { canvas, height, width } = event.data;
	let FPSData: State = {
		max: 0,
		len: 0,
		fps: [],
		frames: 0,
		prevTime: 0,
		width: width,
	};
	const context = canvas.getContext('2d');
	function RAF() {
		FPSData = FPSReducer(FPSData);
		self.postMessage({ fps: `${Math.round(FPSData.fps[FPSData.len - 1])} FPS` });
		if (context) {
			context.clearRect(0, 0, width, height);
			FPSData.fps.map((frame, index) => {
				const barHeight = (height * frame) / FPSData.max;
				let color: string = 'rgba(255, 0, 0, 0.5)';

				if (frame > 60) {
					color = 'rgba(0, 255, 0, 0.5)';
				} else if (frame > 30) {
					color = 'rgba(255, 255, 0, 0.5)';
				}

				context.fillStyle = color;
				context.fillRect(FPSData.len - 1 - index, height - barHeight, 1, barHeight);
			});
		}
		requestAnimationFrame(RAF);
	}
	requestAnimationFrame(RAF);
};
interface State {
	max: number;
	len: number;
	fps: number[];
	frames: number;
	prevTime: number;
	width: number;
}
function FPSReducer(state: State): State {
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
