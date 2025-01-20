import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all';
import React from 'react';
import SplitType from 'split-type';
import { isProduction } from '~/libs/utils';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const HelloLoader = () => {
	const { words, CSSVariables } = resources;
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
			texts.forEach((text) => {
				const splitText = new SplitType(text, {
					types: 'chars',
					tagName: 'span',
					charClass:
						'text-transparent bg-clip-text bg-cover [background-image:var(--noise-texture)] bg-slate-100 leading-normal',
				});
				const chars = splitText.chars;
				gsap.set(chars, {
					transform: `scaleY(0.1) scaleX(1.8)`,
					filter: 'blur(10px) brightness(50%)',
					willChange: 'filter, transform',
				});
				gsap.to(chars, {
					ease: 'none',
					transform: `scaleY(1) scaleX(1)`,
					filter: 'blur(0px) brightness(100%)',
					stagger: 0.01,
					force3D: false,
					scrollTrigger: {
						trigger: text,
						start: 'top bottom-=15%',
						end: 'bottom center+=15%',
						scrub: 1.5,
						markers: !isProduction(),
					},
				});
			});
		}, scope);
		return () => context.revert();
	}, [words]);

	return (
		<main
			style={CSSVariables}
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
			<footer className="container mt-52 mb-10 text-center font-medium">
				<a
					href="https://www.instagram.com/epenflow/"
					className="text-transparent bg-clip-text bg-gradient-to-tr from-slate-100 to-blue-600">
					--EF@epenflow//{date.getUTCFullYear().toString().slice(2)}
				</a>
			</footer>
		</main>
	);
};
export default HelloLoader;
const resources = {
	CSSVariables: {
		'--noise-texture': `url('https://ucarecdn.com/76ad4f2e-f2ad-4cd9-a9bd-8f4198ab7443/noise.png')`,
	} as React.CSSProperties,
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
