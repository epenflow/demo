'use client';
import SplitText from '@/components/base/split-text';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import './base.css';
gsap.registerPlugin(useGSAP);

interface Props {
	scope: React.RefObject<HTMLElement | null>;
}
const Navbar: React.FC<Props> = ({ scope }) => {
	return (
		<header
			ref={scope}
			className="header-container">
			<nav className="navbar">
				<section className="navbar-heading">
					<SplitText>
						<span className="font-inter">sds </span>
						<br />
						<span>sds</span>
					</SplitText>
				</section>
			</nav>
		</header>
	);
};
const resources = {
	select: {
		default: '',
		options: [
			{
				label: 'Scroll Trigger',
				value: 'test',
			},
		] satisfies Array<{
			value: string;
			label: string;
		}>,
	},
};
function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function $hoc(props: T) {
		const scope = React.useRef<HTMLElement>(null);
		useGSAP(
			() => {
				const heading = gsap.utils.toArray('[data-splitter]');
				gsap.from(heading, {
					yPercent: 100,
					ease: 'sine.inOut',
					stagger: {
						each: 0.5,
						amount: 1,
					},
				});
				console.log({ heading });
			},
			{ scope },
		);
		return <Component {...{ ...props, scope }} />;
	};
}
export default hoc(Navbar);
