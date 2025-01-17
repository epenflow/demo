import SplitType, { type SplitTypeOptions } from 'split-type';
import { debounce } from '../utils';

export default class TextSplitter {
	#onResize: (() => void) | null;
	#splitText: SplitType;
	#previousContainerWidth: number | null = null;
	#splitOptions: {
		types?: SplitTypeOptions['types'];
	};
	constructor(
		private textElement: HTMLElement,
		options: {
			resizeCallback?: () => void;
			splitTypeTypes?: SplitTypeOptions['types'];
		},
	) {
		const { resizeCallback, splitTypeTypes } = options;
		this.#splitOptions = splitTypeTypes ? { types: splitTypeTypes } : {};
		this.#onResize = typeof resizeCallback === 'function' ? resizeCallback : null;

		this.#splitText = new SplitType(textElement, this.#splitOptions);
		if (this.#onResize) {
			this.#initResizeObserver();
		}
	}

	#initResizeObserver() {
		this.#previousContainerWidth = null;

		const resizeObserver = new ResizeObserver(
			debounce((entries) => this.#handleResize(entries), 100),
		);

		resizeObserver.observe(this.textElement);
	}

	#handleResize(entries: ResizeObserverEntry[]) {
		const [{ contentRect }] = entries;

		const width = Math.floor(contentRect.width);

		if (this.#previousContainerWidth && this.#previousContainerWidth !== width) {
			this.#splitText.split(this.#splitOptions);
			if (this.#onResize) {
				this.#onResize();
			}
		}
		this.#previousContainerWidth = width;
	}
	get revert() {
		return this.#splitText.revert();
	}
	get lines() {
		return this.#splitText.lines;
	}
	get words() {
		return this.#splitText.words;
	}
	get chars() {
		return this.#splitText.chars;
	}
}
