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
			});
		};
		useGSAP(
			() => {
				createFlipOnScrollAnimation();
			},
			{ scope: containerRef }
		);
		return <Component {...{ ...props, containerRef }} />;
	}
	return Base;
}
export default ScrollHOC(Scroll);
