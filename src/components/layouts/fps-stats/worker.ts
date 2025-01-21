interface State {
	max: number;
	len: number;
	fps: number[];
	frames: number;
	prevTime: number;
	width: number;
	avg: number;
	totalTime: number;
	totalFrames: number;
}
const COLORS = {
	red: 'rgba(255, 0, 0, 0.5)',
	green: 'rgba(0, 255, 0, 0.5)',
	yellow: 'rgba(255, 255, 0, 0.5)',
};
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
		avg: 0,
		totalFrames: 0,
		totalTime: 0,
		width,
	};

	const context = canvas.getContext('2d');
	function update() {
		FPSData = getFps(FPSData);
		self.postMessage({
			fps: Math.ceil(FPSData.fps[FPSData.len - 1]),
			avg: Math.ceil(FPSData.avg),
		});

		render(context, { width, height, FPSData });
		requestAnimationFrame(update);
	}
	requestAnimationFrame(update);
};

function getFps(state: State): State {
	const currentTime = performance.now();
	if (currentTime > state.prevTime + 1000) {
		const nextFPS = [
			...new Array(Math.floor((currentTime - state.prevTime - 1000) / 1000)).fill(0),
			Math.max(1, Math.round(state.frames * 1000) / (currentTime - state.prevTime)),
		];
		const totalTime = state.totalTime + (currentTime - state.prevTime);
		const totalFrames = state.totalFrames + state.frames;
		const avg = (totalFrames * 1000) / totalTime;

		return {
			width: state.width,
			max: Math.max(state.max, ...nextFPS),
			len: Math.min(state.len + nextFPS.length, state.width),
			fps: [...state.fps, ...nextFPS].slice(-state.width),
			frames: 1,
			prevTime: performance.now(),
			avg,
			totalTime,
			totalFrames,
		};
	} else {
		return { ...state, frames: state.frames + 1 };
	}
}

function render(
	context: OffscreenCanvasRenderingContext2D | null,
	data: {
		width: number;
		height: number;
		FPSData: State;
	},
) {
	if (!context) return;
	const { height, width } = data;
	const { fps, max, len } = data.FPSData;

	context.clearRect(0, 0, width, height);

	fps.map((frame, index) => {
		const line = { width: 1, height: (height * frame) / max };
		const position = { x: len - 1 - index, y: height - line.height };
		let color: string = COLORS.green;

		if (frame > 60) {
			color = COLORS.green;
		} else if (frame > 30) {
			color = COLORS.yellow;
		} else {
			color = COLORS.red;
		}

		context.fillStyle = color;
		context.fillRect(position.x, position.y, line.width, line.height);
	});
}
