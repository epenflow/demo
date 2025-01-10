'use client';
import { getComputeGridDimensions, getPropertyValue } from '@/libs/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap/all';
import React from 'react';
import './base.css';

gsap.registerPlugin(useGSAP);

interface Props {
	scope: React.RefObject<HTMLElement | null>;
}
const Default: React.FC<Props> = ({ scope }) => {
	return (
		<main
			ref={scope}
			className="default-view">
			<div className="default--view-content">
				<h1>DEMO</h1>
				<p>BY--EF//@epenflow</p>
			</div>
		</main>
	);
};

function hoc<T extends object>(Component: React.ComponentType<T & Props>) {
	return function HOC(props: T) {
		const scope = React.useRef<HTMLElement>(null);
		const { contextSafe } = useGSAP({ scope });

		const loadGrid = contextSafe(() => {
			const size = Number(getPropertyValue('--box-size').match(/\d+/)?.[0]);
			const { ceil } = getComputeGridDimensions(size);

			function createSquares(parent: HTMLElement | null, ceil: number, className?: string) {
				for (let index = 0; index < ceil; index++) {
					const div = document.createElement('div');
					div.classList.add(className || '');
					parent?.appendChild(div);
				}
			}

			createSquares(scope.current, ceil, 'view--box');
		});

		useGSAP(
			() => {
				loadGrid();
				window.addEventListener('resize', loadGrid);
				return () => window.addEventListener('resize', loadGrid);
			},
			{ scope },
		);

		useGSAP(
			(context, contextSafe) => {
				const boxes: HTMLElement[] = gsap.utils.toArray('.view--box');
				if (contextSafe) {
					boxes.forEach((box) => {
						const mousemove = contextSafe(() => {
							gsap.to(box, {
								keyframes: {
									backgroundColor: ['red', 'yellow', 'green'],
								},
								borderRadius: '2.5rem',
								duration: 0.5,
							});
						});
						const mouseleave = contextSafe(() => {
							gsap.to(box, {
								keyframes: {
									borderRadius: [2, 0],
									backgroundColor: ['red', 'yellow', 'green', 'transparent'],
								},
							});
						});
						box.addEventListener('mousemove', mousemove);
						box.addEventListener('mouseleave', mouseleave);

						return () => {
							box.removeEventListener('mousemove', mousemove);
							box.removeEventListener('mouseleave', mouseleave);
						};
					});
				}
			},
			{ scope },
		);
		return <Component {...{ ...props, scope }} />;
	};
}

export default hoc(Default);
