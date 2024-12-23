"use client";
import dynamic from "next/dynamic";
import React from "react";
import "./demo.css";
interface DemoProps {
	containerRef: React.RefObject<HTMLElement | null>;
}
const Demo: React.NamedExoticComponent<DemoProps> = React.memo<DemoProps>(
	({ containerRef }) => {
		return (
			<section ref={containerRef}>
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

		return <Component {...{ ...props, containerRef }} />;
	}
	return Base;
}
export default dynamic(() => Promise.resolve(DemoHOC(Demo)));
