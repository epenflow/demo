"use client";
import gsap, { Flip, useGSAP } from "@/config/gsap";
import React from "react";
import "./scroll.css";

interface ScrollProps {
	containerRef: React.RefObject<HTMLElement | null>;
}
const Scroll: React.NamedExoticComponent<ScrollProps> = React.memo<ScrollProps>(
	({ containerRef }) => {
		return (
			<section ref={containerRef}>
				<section className="content content--initial">
					<div className="one box" />
				</section>
				<section className="content content--center content--blend">
					<div data-step className="content__img" />
					<h1 className="content__title font-alt">
						<span>DEMO</span>
						<br />
						<span>EF-STUDIO</span>
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
						<span>Natural</span>
						<div data-step className="content__img" />
						<span>Garments</span>
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
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Corporis, eveniet ut aliquid amet veniam quos
							facilis minus excepturi non voluptas earum, ad
							perspiciatis culpa provident praesentium, doloremque
							laboriosam modi voluptatibus.
						</p>
					</div>
				</section>
				<section className="content content--center content--center-tall">
					<div data-step className="content__img" />
					<div className="content__text content__text--large">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Incidunt quod ullam dolor, adipisci eveniet
							eum accusamus nostrum iusto mollitia rem, laborum
							quibusdam dolores minus eaque dignissimos id aperiam
							ducimus sequi.
						</p>
					</div>
				</section>
				<section className="flex items-center justify-center w-full h-svh">
					<div data-step className="w-full h-full" />
				</section>
			</section>
		);
	}
);

function ScrollHOC<T extends object>(
	Component: React.ComponentType<T & ScrollProps>
) {
	function Base(props: T) {
		const containerRef = React.useRef<HTMLElement | null>(null);
		const flipContext = React.useRef<ReturnType<
			typeof gsap.context
		> | null>(null);

		const createFlipOnScrollAnimation = (
			oneElement: Element | null,
			parentElement: HTMLElement | null
		) => {
			if (flipContext.current) flipContext.current.revert();

			const stepElements = [
				...containerRef.current!.querySelectorAll("[data-step]"),
			];

			flipContext.current = gsap.context(() => {
				const flipConfig = {
					duration: 1,
					ease: "sine.inOut",
				};

				const states = stepElements.map((stepElement) =>
					Flip.getState(stepElement)
				);

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
					const customFlipConfig = {
						...flipConfig,
						ease: index === 0 ? "none" : flipConfig.ease,
					};
					timeline.add(
						Flip.fit(
							oneElement,
							state,
							customFlipConfig
						) as GSAPAnimation,
						index ? "+=0.5" : 0
					);
				});
			});
		};

		const animationSpanOnScroll = () => {
			const spans = containerRef.current!.querySelectorAll(
				".content__title > span"
			);

			spans.forEach((span, index) => {
				const direction = index % 2 === 0 ? -150 : 150;
				const triggerElement = span.closest(".content--center")
					? span.parentElement
					: span;

				gsap.from(span, {
					x: direction,
					duration: 1,
					ease: "sine",
					scrollTrigger: {
						trigger: triggerElement,
						start: "top bottom",
						end: "+=45%",
						scrub: true,
					},
				});
			});
		};

		const animateFilterOnFirstSwitch = (
			oneElement: Element | null,
			parentElement: HTMLElement | null
		) => {
			gsap.fromTo(
				oneElement,
				{
					filter: "brightness(80%)",
					// // if not set the height
					// width: "100%",
					// height: "100%",
				},
				{
					filter: "brightness(100%)",
					ease: "sine",
					scrollTrigger: {
						trigger: parentElement,
						start: "clamp(top bottom)",
						end: "clamp(bottom top)",
						scrub: true,
						// markers: true,
					},
				}
			);
		};

		const addParallaxToText = () => {
			const firstTextElement =
				containerRef.current!.querySelector(".content__text");

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
					},
				}
			);
		};
		const addParallaxToColumnImages = () => {
			const columnImages = [
				...containerRef.current!.querySelectorAll(
					".content--column .content__img:not([data-step])"
				),
			];
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
							markers: true,
						},
					}
				);
			});
		};
		// const animateRelatedDemos = () => {};

		useGSAP(
			() => {
				if (!containerRef.current)
					throw new Error(
						"Missing Container Reference : Please ensure containerRef is properly injected."
					);

				const oneElement = containerRef.current!.querySelector(".one");
				const parentElement = oneElement!.parentElement;

				createFlipOnScrollAnimation(oneElement, parentElement);
				animationSpanOnScroll();
				animateFilterOnFirstSwitch(oneElement, parentElement);
				addParallaxToText();
				addParallaxToColumnImages();
			},
			{ scope: containerRef }
		);
		return <Component {...{ ...props, containerRef }} />;
	}
	return Base;
}
export default ScrollHOC(Scroll);
