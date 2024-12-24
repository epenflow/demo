"use client";

import gsap, { Flip, useGSAP } from "@/config/gsap";

import React from "react";
import "./demo.css";

interface DemoProps {
	containerRef: React.RefObject<HTMLElement | null>;
}
const Demo: React.NamedExoticComponent<DemoProps> = React.memo<DemoProps>(
	({ containerRef }) => {
		return (
			<section ref={containerRef} suppressHydrationWarning>
				<div className="spacer" />
				<div className="main">
					<div className="content-container initial">
						<div className="box gradient-blue" />
					</div>
					<div className="content-container second">
						<div className="marker" />
					</div>
					<div className="content-container third">
						<div className="marker" />
					</div>
				</div>
				<div className="spacer final" />
			</section>
		);
	}
);
function DemoHOC<T extends object>(
	Component: React.ComponentType<T & DemoProps>
) {
	function Base(props: T) {
		const containerRef = React.useRef<HTMLElement | null>(null);
		const flipContext = React.useRef<ReturnType<
			typeof gsap.context
		> | null>(null);
		const createTimeline = () => {
			if (flipContext.current) flipContext.current.revert();

			flipContext.current = gsap.context(() => {
				const secondState = Flip.getState(".second .marker");
				const thirdState = Flip.getState(".third .marker");
				const flipConfig = {
					ease: "none",
					duration: 1,
				};

				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: ".content-container.initial",
						endTrigger: ".final",
						start: "clamp(top center)",
						end: "clamp(top center)",
						scrub: 1,
						// markers: true,
					},
				});

				timeline
					.add(
						Flip.fit(
							".box",
							secondState,
							flipConfig
						) as GSAPAnimation
					)
					.add(
						Flip.fit(
							".box",
							thirdState,
							flipConfig
						) as GSAPAnimation,
						"+=0.5"
					);
			});
		};
		useGSAP(
			() => {
				createTimeline();
			},
			{ scope: containerRef }
		);
		return <Component {...{ ...props, containerRef }} />;
	}
	return Base;
}
export default DemoHOC(Demo);
