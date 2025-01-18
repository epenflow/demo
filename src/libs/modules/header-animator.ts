import gsap from 'gsap';

export default class HeaderAnimator {
	#scope?: HTMLElement;
	#timeline?: GSAPTimeline;
	constructor(scope?: HTMLElement | null) {
		if (!scope || !(scope instanceof HTMLElement)) {
			return;
		}
		this.#scope = scope;
		this.#timeline = gsap.timeline({
			paused: true,
			defaults: { ease: 'power4.inOut', duration: 0.5 },
		});
		this.#createTimeline();
	}

	#createTimeline() {
		// const span = this.#scope?.querySelectorAll('.paragraph--content > span');
		if (typeof this.#timeline !== 'undefined' && typeof this.#scope !== 'undefined') {
			const position = [0, 0.5] as const;
			this.#timeline.to('.header--inner', { '--header-width': '20rem' }, position[0]);
			this.#timeline.to(
				'button',
				{ left: `calc(20rem - 1rem)`, ease: 'linear' },
				position[1],
			);
			this.#timeline.to(
				this.#scope,
				{
					height: `calc(50svh - calc(var(--header-top) * 2))`,
					duration: 1,
				},
				position[1],
			);

			this.#timeline.from('.header--content', { autoAlpha: 0, display: 'none' }, position[1]);
			/**
			 * issue can't animate
			 */
			// this.#timeline.from(
			// 	span,
			// 	{
			// 		yPercent: -100,
			// 		xPercent: -100,
			// 		rotateY: 45,
			// 		ease: 'sine.inOut',
			// 		stagger: { each: 0.25, amount: 0.25 },
			// 	},
			// 	position[0] + position[1],
			// );
		}
	}
	get timeline() {
		return this.#timeline;
	}
}
