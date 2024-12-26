export default class Cursor {
	#DOM: {
		element: HTMLElement | null;
		inner: HTMLElement | null;
		cells: HTMLCollection | null;
	} = {
		element: null,
		cells: null,
		inner: null,
	};
	#cellSize: number = 0;
	#columns: number = 0;
	#cellsTotal: number = 0;
	#mousePosition = { x: 0, y: 0 };

	#settings = {
		ttl: 0.2,
	};
	#cachedCell: HTMLElement | null | Element = null;
	constructor(element: HTMLElement) {
		this.#DOM.element = element;
		this.#DOM.inner = this.#DOM.element.querySelector(".cursor__inner");

		this.#settings.ttl =
			Number(this.#DOM.element.getAttribute("data-ttl")) ||
			this.#settings.ttl;

		if (navigator.userAgent.toLocaleLowerCase().indexOf("firefox") > -1) {
		}
	}

	init() {
		window.addEventListener("resize", this.layout);

		const handleMove = () => {
			const cell = this.getCellAtCursor();

			if (cell === null || this.#cachedCell === cell) return;
			this.#cachedCell = cell;
		};
		window.addEventListener("mousemove", handleMove);
		window.addEventListener("pointermove", handleMove, { passive: true });
	}
	layout() {
		this.#columns = Number(
			getComputedStyle(this.#DOM.element as HTMLElement).getPropertyValue(
				"--columns"
			)
		);
	}
	getCellAtCursor() {
		const columnIndex = Math.floor(this.#mousePosition.x / this.#cellSize);
		const rowIndex = Math.floor(this.#mousePosition.y / this.#cellSize);
		const cellIndex = rowIndex * this.#columns + columnIndex;

		if (cellIndex >= this.#cellsTotal || cellIndex < 0) {
			console.error("Call Index out of bounds");
			return null;
		}
		if (this.#DOM.cells === null) return null;

		return this.#DOM.cells[cellIndex];
	}
}
