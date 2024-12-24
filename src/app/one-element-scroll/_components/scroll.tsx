"use client";
import gsap, { Flip, useGSAP } from "@/libs/config/gsap";
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

		const createFlipOnScrollAnimation = () => {
			if (flipContext.current) flipContext.current.revert();

			const oneElement = containerRef.current!.querySelector(".one");
			const parentElement = oneElement!.parentElement;
			const stepElements = [
				...containerRef.current!.querySelectorAll("[data-step]"),
			];
			console.log(stepElements, oneElement, parentElement);

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
						markers: true,
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
		useGSAP(
			() => {
				createFlipOnScrollAnimation();
				animationSpanOnScroll();
			},
			{ scope: containerRef }
		);
		return <Component {...{ ...props, containerRef }} />;
	}
	return Base;
}
export default ScrollHOC(Scroll);
