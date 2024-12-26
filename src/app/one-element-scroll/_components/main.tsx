"use client";
import gsap, { Flip, useGSAP } from "@/config/gsap";
import React from "react";
import "./main.css";

export interface MainProps {
	containerRef: React.RefObject<HTMLElement | null>;
}
const Main: React.FC<MainProps> = ({ containerRef }) => {
	return (
		<main ref={containerRef} suppressHydrationWarning>
			<section className="content content--initial">
				<div
					className="one"
					style={{
						backgroundImage:
							'url("https://ucarecdn.com/ebcff02d-688c-4265-b14f-e868d88b3a88/-/preview/999x669/")',
					}}
				/>
			</section>
			<section className="content content--center content--blend">
				<div data-step className="content__img" />
				<h1 className="content__title font-alt">
					<span>Epen</span>
					<br />
					<span>Flow</span>
				</h1>
			</section>
			<section className="content content--column">
				<div className="content__img box" />
				<div className="content__img box" />
				<div data-step className="content__img content__img--mid" />
				<div className="content__img box" />
				<div className="content__img box" />
			</section>
			<section className="content content--lines">
				<h2 className="content__title content__title--medium font-alt">
					<span>Lorem</span>
					<div data-step className="content__img" />
					<span>Ipsum</span>
				</h2>
				<h2 className="content__title content__title--medium font-alt">
					<span>Crafted with</span>
					<div className="content__img box" />
					<span>Love</span>
				</h2>
				<h2 className="content__title content__title--medium font-alt">
					<span>with</span>
					<div className="content__img box" />
					<span>respect</span>
				</h2>
			</section>
			<section className="content content--sides">
				<div data-step className="content__img" />
				<div className="content__text">
					<p>
						<strong>Welcome to EF-Studio </strong>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Vero corrupti dolore omnis possimus natus odit sapiente,
						nisi, nulla blanditiis, veritatis ad facilis fugit ipsum
						magnam ea! Eaque necessitatibus officia amet.
					</p>
				</div>
			</section>
			<section className="content content--center content--center-tall">
				<div data-step className="content__img" />
				<div className="content__text content__text--large">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Dolorum sit quam quis iste aspernatur, harum inventore
						aliquam, maiores commodi praesentium quaerat ea a minima
						quasi maxime magni et voluptatem earum.
					</p>
				</div>
			</section>
			<section className="content content--grid">
				<div className="content__img box" />
				<div data-step className="content__img" />
				<div className="content__img box" />
				<div className="content__img box" />
				<div className="content__img box" />
				<div className="content__img box" />
				<div className="content__img box" />
				<div className="content__img box" />
				<div className="content__img box" />
			</section>

			<section className="outro">
				<h2 className="outro__title font-alt">More you might like</h2>
				<div className="card-wrap">
					{Array.from({ length: 5 }).map((_, key) => (
						<div key={key} className="card">
							<div className="card__img box" />
							<span className="card__title font-cap">
								Staggered (3D) Grid Animations with
								Scroll-Triggered Effects
							</span>
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

function MainHOC<T extends object>(
	Component: React.ComponentType<T & MainProps>
) {
	function Base(props: T) {
		const containerRef = React.useRef<HTMLElement | null>(null);

		function createFlipOnScrollAnimation(
			oneElement: Element | null,
			parentElement: Element | null
		) {
			const stepElements: HTMLElement[] =
				gsap.utils.toArray("[data-step]");

			const states = stepElements.map((step) => Flip.getState(step));

			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: parentElement,
					start: "clamp(center center)",
					endTrigger: stepElements[stepElements.length - 1],
					end: "clamp(center center)",
					scrub: true,
					immediateRender: false,
					// markers: true,
				},
			});

			states.forEach((state, index) => {
				timeline.add(
					Flip.fit(oneElement, state, {
						duration: 1,
						ease: index === 0 ? "none" : "sine.inOut",
						// scale: true,
						// absolute: true,
					}) as GSAPAnimation,
					index ? "+=0.5" : 0
				);
			});
		}

		function animateSpansOnScroll() {
			const spans = containerRef.current!.querySelectorAll(
				".content__title > span"
			);

			spans.forEach((span, index) => {
				const direction = index % 2 === 0 ? -150 : 150;
				const trigger = span.closest(".content--center")
					? span.parentElement
					: span;

				gsap.from(span, {
					x: direction,
					duration: 1,
					ease: "sine",
					scrollTrigger: {
						trigger: trigger,
						start: "top bottom",
						end: "+45%",
						scrub: true,
						// markers: true,
					},
				});
			});
		}

		function animateImageOnScroll() {
			const images: HTMLElement[] = gsap.utils.toArray(
				".content--lines .content__img:not([data-step]), .content--grid .content__img:not([data-step]"
			);

			images.forEach((image) => {
				gsap.fromTo(
					image,
					{
						scale: 0,
						autoAlpha: 0,
						filter: "brightness(180%) saturate(0%)",
					},
					{
						scale: 1,
						autoAlpha: 1,
						filter: "brightness(100%) saturate(100%)",
						duration: 1,
						ease: "sine",
						scrollTrigger: {
							trigger: image,
							start: "top bottom",
							end: "end+=45%",
							scrub: true,
							// markers: true,
						},
					}
				);
			});
		}

		function addParallaxToText() {
			const firstTextElement =
				containerRef.current?.querySelector(".content__text");

			if (!firstTextElement) return;

			gsap.fromTo(
				firstTextElement,
				{
					y: 250,
				},
				{
					y: -250,
					ease: "sine",
					scrollTrigger: {
						trigger: firstTextElement,
						start: "top bottom",
						end: "top top",
						scrub: true,
						// markers: true,
					},
				}
			);
		}

		function animateFilterOnFirstSwitch(oneElement: Element | null) {
			gsap.fromTo(
				oneElement,
				{
					filter: "brightness(80%)",
					// width: "100%",
					// height: "100%",
				},
				{
					filter: "brightness(100%)",
					ease: "sine",
					scrollTrigger: {
						trigger: oneElement,
						start: "clamp(top bottom)",
						end: "clamp(bottom top)",
						scrub: true,
						// markers: true,
					},
				}
			);
		}

		function addParallaxToColumnImages() {
			const columnImages: HTMLElement[] = gsap.utils.toArray(
				".content--column .content__img:not([data-step])"
			);
			const totalImages = columnImages.length;
			const middleIndex = (totalImages - 1) / 2;

			columnImages.forEach((image, index) => {
				const intensity = Math.abs(index - middleIndex) * 75;

				gsap.fromTo(
					image,
					{
						y: intensity,
					},
					{
						y: -intensity,
						ease: "sine",
						scrollTrigger: {
							trigger: image,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
							// markers: true,
						},
					}
				);
			});
		}

		useGSAP(
			() => {
				if (!containerRef.current)
					throw new Error(
						`Missing Container Reference : Please ensure containerRef is properly injected.`
					);

				const oneElement = containerRef.current.querySelector(".one");
				const parentElement = oneElement!.parentElement;

				createFlipOnScrollAnimation(oneElement, parentElement);
				animateSpansOnScroll();
				animateImageOnScroll();
				addParallaxToText();
				animateFilterOnFirstSwitch(oneElement);
				addParallaxToColumnImages();

				window.addEventListener("resize", () => {
					createFlipOnScrollAnimation(oneElement, parentElement);
					animateFilterOnFirstSwitch(oneElement);
				});
			},
			{ scope: containerRef }
		);
		return <Component {...props} containerRef={containerRef} />;
	}
	return Base;
}

export default MainHOC(Main);
