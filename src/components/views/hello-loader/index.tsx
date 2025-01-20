import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all';
import React from 'react';
import SplitType from 'split-type';
import { isProduction } from '~/libs/utils';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const HelloLoader = () => {
	const { words } = resources;
	const date = new Date();
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

			const texts: HTMLElement[] = gsap.utils.toArray('[data-text]');
			texts.forEach((text, index) => {
				const splitText = new SplitType(text, {
					types: 'words',
					wordClass: 'leading-normal',
				});
				gsap.fromTo(
					splitText.words,
					{
						overflow: 'hidden',
						opacity: 0.5,
						yPercent: 0 >= index ? 0 : -25,
						scale: 0 >= index ? 1 : 0.75,
						filter: 'blur(0.25rem) brightness(50%)',
					},
					{
						yPercent: 0,
						opacity: 1,
						scale: 1,
						filter: 'blur(0rem)  brightness(100%)',
						ease: 'sine.inOut',
						stagger: {
							each: 0.25,
							amount: 0.5,
						},
						scrollTrigger: {
							trigger: text,
							start: 'top center',
							end: 'center center',
							scrub: 1.5,
							markers: !isProduction(),
						},
					},
				);
			});
		}, scope);
		return () => context.revert();
	}, [words]);

	return (
		<main
			ref={scope}
			className="overflow-hidden">
			<section className="h-svh w-full flex items-center justify-center text-4xl font-medium">
				<q
					data-hello
					className="leading-normal">
					{words[0]}
				</q>
			</section>
			<section className="h-full container space-y-4 text-xl lg:text-4xl">
				<h1 data-text>--EF@Word__Hello</h1>
				<div className="space-y-5">
					<span className="block h-[1px] w-full bg-white/10" />
					<p
						data-text
						className="text-justify lg:text-pretty w-full h-fit overflow-hidden">
						'Hello', 'Bonjour', 'Ciao', 'Olà', 'سلام', 'やあ', 'Hallå', 'Guten tag',
						'Hola', 'Привет', '你好', '안녕하세요', 'สวัสดี', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'ಹಲೋ',
						'नमस्ते', 'Sveiki', 'Merhaba', 'Shalom', 'Γειά σου', 'Kia ora', 'ສະບາຍດີ',
						'வணக்கம்', 'გამარჯობა', 'ជំរាបសួរ', 'Aloha', 'Zdravstvuyte', 'Hei',
						'Sawubona', 'Terve', 'Moïen', 'Bula', 'Cześć', 'Kamusta', 'Sawasdee',
						'Goddag', 'Bok', 'Halo', 'Sain baina uu', 'Góðan dag', 'Dzień dobry', 'Hei',
						'Ni hao', 'Konnichiwa', 'Swastiastu', 'Mingalaba', 'Yassas', 'Vanakkam',
						'Marhaba', 'Szia', 'Selamat pagi', 'God dag', 'Zdravstvujte', 'Sawadee',
						'Namaskaram', 'Dia dhuit', 'Mhoro', 'Haloha', 'Pozdrav', 'Salam', 'Konnichi
						wa', 'Sawatdee',
					</p>
					<span className="block h-[1px] w-full bg-white/10" />
				</div>
			</section>
			<footer className="container my-14 text-center font-medium">
				<a
					href="https://www.instagram.com/epenflow/"
					className="text-transparent bg-clip-text bg-gradient-to-tr from-slate-100 to-blue-700">
					--EF@epenflow//{date.getUTCFullYear().toString().slice(2)}
				</a>
			</footer>
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
