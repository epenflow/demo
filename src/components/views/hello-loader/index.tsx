import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all';
import React from 'react';
import SplitType from 'split-type';
import { isProduction } from '~/libs/utils';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const HelloLoader = () => {
	const { words } = resources;
	const scope = React.useRef<HTMLElement>(null);

	React.useEffect(() => {
		const context = gsap.context(() => {
			let currentIndex = 1;
			gsap.to('[data-hello]', {
				opacity: 1,
				delay: 0.5,
				duration: 1,
				repeat: -1,
				onRepeat: () => {
					const text = words[currentIndex];
					gsap.to('[data-hello]', {
						text,
						ease: 'sine.inOut',
						onComplete: () => {
							currentIndex = (currentIndex + 1) % words.length;
						},
					});
				},
			});

			const paragraph = scope.current?.querySelector('[data-paragraph]') as HTMLElement;
			if (paragraph) {
				const splitText = new SplitType(paragraph, { types: 'words' });
				gsap.fromTo(
					splitText.words,
					{
						overflow: 'hidden',
						opacity: 0.5,
						yPercent: -100,
						scale: 0.9,
						filter: 'blur(0.25rem) brightness(50%)',
					},
					{
						opacity: 1,
						yPercent: 0,
						scale: 1,
						filter: 'blur(0rem)  brightness(100%)',
						ease: 'sine.inOut',
						stagger: {
							each: 0.25,
							amount: 0.5,
						},
						scrollTrigger: {
							trigger: '[data-paragraph]',
							start: 'top center',
							end: 'center center',
							scrub: 1.5,
							markers: !isProduction(),
						},
					},
				);
			}
		}, scope);
		return () => context.revert();
	}, [words]);

	return (
		<main ref={scope}>
			<section className="h-svh w-full flex items-center justify-center text-4xl font-medium">
				<h1 data-hello>{words[0]}</h1>
			</section>
			<section
				data-parent-paragraph
				className="min-h-svh h-svh w-full lg:text-4xl container flex flex-col justify-between lg:py-10 space-y-10 overflow-x-hidden">
				<h1>_______________Word_______________</h1>
				<p
					data-paragraph
					className="text-pretty w-full h-fit">
					'Hello', 'Bonjour', 'Ciao', 'Olà', 'سلام', 'やあ', 'Hallå', 'Guten tag', 'Hola',
					'Привет', '你好', '안녕하세요', 'สวัสดี', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'ಹಲೋ', 'नमस्ते',
					'Sveiki', 'Merhaba', 'Shalom', 'Γειά σου', 'Kia ora', 'ສະບາຍດີ', 'வணக்கம்',
					'გამარჯობა', 'ជំរាបសួរ', 'Aloha', 'Zdravstvuyte', 'Hei', 'Sawubona', 'Terve',
					'Moïen', 'Bula', 'Cześć', 'Kamusta', 'Sawasdee', 'Goddag', 'Bok', 'Halo', 'Sain
					baina uu', 'Góðan dag', 'Dzień dobry', 'Hei', 'Ni hao', 'Konnichiwa',
					'Swastiastu', 'Mingalaba', 'Yassas', 'Vanakkam', 'Marhaba', 'Szia', 'Selamat
					pagi', 'God dag', 'Zdravstvujte', 'Sawadee', 'Namaskaram', 'Dia dhuit', 'Mhoro',
					'Haloha', 'Pozdrav', 'Salam', 'Konnichi wa', 'Sawatdee',
				</p>
				<h1>--EF@Hello.</h1>
			</section>
		</main>
	);
};
export default HelloLoader;
const resources = {
	words: [
		'Hello',
		'Bonjour',
		'Ciao',
		'Olà',
		'سلام',
		'やあ',
		'Hallå',
		'Guten tag',
		'Hola',
		'Привет',
		'你好',
		'안녕하세요',
		'สวัสดี',
		'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
		'ಹಲೋ',
		'नमस्ते',
		'Sveiki',
		'Merhaba',
		'Shalom',
		'Γειά σου',
		'Kia ora',
		'ສະບາຍດີ',
		'வணக்கம்',
		'გამარჯობა',
		'ជំរាបសួរ',
		'Aloha',
		'Zdravstvuyte',
		'Hei',
		'Sawubona',
		'Terve',
		'Moïen',
		'Bula',
		'Cześć',
		'Kamusta',
		'Sawasdee',
		'Goddag',
		'Bok',
		'Halo',
		'Sain baina uu',
		'Góðan dag',
		'Dzień dobry',
		'Hei',
		'Ni hao',
		'Konnichiwa',
		'Swastiastu',
		'Mingalaba',
		'Yassas',
		'Vanakkam',
		'Marhaba',
		'Szia',
		'Selamat pagi',
		'God dag',
		'Zdravstvujte',
		'Sawadee',
		'Namaskaram',
		'Dia dhuit',
		'Mhoro',
		'Haloha',
		'Pozdrav',
		'Salam',
		'Konnichi wa',
		'Sawatdee',
	],
};
