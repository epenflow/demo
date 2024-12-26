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
	constructor(element: HTMLElement) {
		this.#DOM.element = element;
		this.#DOM.inner = this.#DOM.element.querySelector(".cursor__inner");
	}
}
