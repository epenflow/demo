"use client";
import { useGSAP } from "@/config/gsap";
import React from "react";
import "./main.css";

interface MainProps {
	scope: React.RefObject<HTMLElement | null>;
}
const Main: React.FC<MainProps> = ({ scope }) => {
	return (
		<main ref={scope}>
			<div className="spacer">scroll down</div>
			<div className="main">
				<div className="container initial">
					<div className="box gradient-blue"></div>
				</div>
				<div className="container second">
					<div data-step className="marker"></div>
				</div>
				<div className="container third">
					<div data-step className="marker"></div>
				</div>
			</div>

			<div className="spacer final"></div>
		</main>
	);
};
function MainHOC<T extends object>(
	Component: React.ComponentType<T & MainProps>
) {
	function Base(props: T) {
		const scope = React.useRef<HTMLElement | null>(null);

		function flipOnScrollAnimate() {}

		useGSAP(() => {}, { scope });

		return <Component {...props} scope={scope} />;
	}

	return Base;
}

export default MainHOC(Main);
