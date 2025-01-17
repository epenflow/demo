import gsap from 'gsap';
import TextSplitter from './text-splitter';

const lettersAndSymbols = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'-',
	'_',
	'+',
	'=',
	';',
	':',
	'<',
	'>',
	',',
];
export default class TextAnimator {
	#textElement: HTMLElement;
	#splitter: TextSplitter;
	#originalText: string[];
	constructor(textElement: HTMLElement) {
		if (!textElement || !(textElement instanceof HTMLElement)) {
			throw new Error('Invalid text element provided');
		}
		this.#textElement = textElement;
		this.#splitter = new TextSplitter(this.#textElement, {
			splitTypeTypes: 'words,chars',
		});
		this.#originalText = this.#splitter.chars!.map((char) => char.innerHTML);
	}

	animate() {
		this.reset();
		const chars = this.#splitter.chars;
		chars?.forEach((char, position) => {
			const initialHTML = char.innerHTML;
			let repeatCount = 0;

			gsap.fromTo(
				char,
				{
					opacity: 0,
				},
				{
					duration: 0.03,
					onStart: () => {
						gsap.set(char, { opacity: 1 });
					},
					onComplete: () => {
						gsap.set(char, { innerHTML: initialHTML, delay: 0.03 });
					},
					repeat: 3,
					onRepeat: () => {
						repeatCount++;
						if (repeatCount === 1) {
							gsap.set(char, { opacity: 0 });
						}
					},
					repeatRefresh: true,
					repeatDelay: 0.04,
					delay: (position + 1) * 0.07,
					innerHTML: () =>
						lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
					opacity: 1,
				},
			);
		});
	}

	reset() {
		const chars = this.#splitter.chars;
		chars?.forEach((char, index) => {
			gsap.killTweensOf(char);
			char.innerHTML = this.#originalText[index];
		});
	}
}
