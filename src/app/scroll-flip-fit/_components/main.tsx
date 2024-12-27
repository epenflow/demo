"use client";
import gsap, { Flip, useGSAP } from "@/config/gsap";
import React from "react";
import "./main.css";

interface MainProps {
	scope: React.RefObject<HTMLElement | null>;
}
const Main: React.FC<MainProps> = ({ scope }) => {
	return (
		<main ref={scope}>
			<section className="section">
				<div className="box" />
			</section>
			<section className="section two">
				<div className="middle" />
			</section>
			<section className="section">
				<div className="final" />
			</section>
		</main>
	);
};
function MainHOC<T extends object>(
	Component: React.ComponentType<T & MainProps>
) {
	function Base(props: T) {
		const scope = React.useRef<HTMLElement | null>(null);

		function flipOnScrollAnimate() {
			const box = scope.current!.querySelector(".box");
			const middle = scope.current!.querySelector(".middle");
			const final = scope.current!.querySelector(".final");
			const timeline = gsap.timeline();
			timeline.set(box, {
				width: "100%",
				height: "100%",
			});
			timeline
				.add(
					Flip.fit(box, middle, {
						duration: 2,
						ease: "none",
					}) as GSAPAnimation,
					"+=0.5"
				)
				.add(
					Flip.fit(box, final, {
						duration: 2,
						ease: "none",
					}) as GSAPAnimation,
					"+=0.5"
				);
		}

		useGSAP(
			() => {
				flipOnScrollAnimate();
			},
			{ scope }
		);

		return <Component {...props} scope={scope} />;
	}

	return Base;
}

export default MainHOC(Main);
