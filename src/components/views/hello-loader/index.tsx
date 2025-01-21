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
					types: 'words',
					wordClass:
						'text-transparent bg-clip-text bg-cover [background-image:var(--noise-texture)] bg-slate-100 leading-normal',
				});
				const $textType = splitText.words;
				gsap.set($textType, {
					filter: 'blur(0.25rem)',
					opacity: 0.75,
					willChange: 'filter, transform,opacity',
				});
				gsap.to($textType, {
					ease: 'none',
					opacity: 1,
					filter: 'blur(0rem)',
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

			const marqueeTween = gsap
				.to('[data-text-marquee]', {
					xPercent: -100,
					duration: 5,
					repeat: -1,
					ease: 'none',
				})
				.totalProgress(0.5);

			ScrollTrigger.create({
				trigger: '[data-hero]',
				start: 'top top',
				end: 'bottom',
				markers: true,
				onUpdate: (self: ScrollTrigger) => {
					gsap.to(marqueeTween, {
						timeScale: self.direction === -1 ? 1 : -1,
						overwrite: true,
					});
				},
			});
		}, scope);
		return () => context.revert();
	}, [words]);

	return (
		<main
			style={CSSVariables}
			ref={scope}
			className="overflow-hidden">
			<section
				data-hero
				className="relative w-full min-h-svh">
				<div className="w-full h-svh flex items-center justify-center">
					<q
						data-hello
						className="leading-normal text-4xl font-medium">
						{words[0]}
					</q>
				</div>
				<div className="absolute bottom-10 overflow-clip w-full">
					<div
						data-text-marquee
						className="flex relative items-center justify-between w-full gap-2 font-medium">
						{words.map((text, key) => (
							<p
								key={`${text}-${key}`}
								className="flex-shrink-0">
								{text}
							</p>
						))}
					</div>
				</div>
			</section>
			<section className="h-full container space-y-4 text-xl lg:text-4xl">
				<h1 data-text>--EF@Word__Hello</h1>
				<div className="space-y-5">
					<span className="block h-[1px] w-full bg-white/10" />
					<p
						data-text
						className="text-justify lg:text-pretty w-full h-fit overflow-hidden">
						{words.map((text, key) => (
							<span key={`${text}-${key}`}>“{text}”,</span>
						))}
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
