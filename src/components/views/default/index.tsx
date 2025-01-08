'use client';
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
		useGSAP(
			(context, contextSafe) => {
				const squares: Array<HTMLElement> = [];
				const squareSize = Number(
					getComputedStyle(document.documentElement)
						.getPropertyValue('--box-size')
						.match(/\d+/)?.[0],
				);

				if (scope.current && contextSafe) {
					function setupSquare(size: number) {
						const numOfColumn = Math.ceil(window.innerWidth / size);
						const numOfRow = Math.ceil(window.innerHeight / size);
						const numOfSquare = numOfColumn * numOfRow;
						const containerWidth = `${numOfColumn * size}px`;
						const containerHeight = `${numOfRow * size}px`;
						return {
							numOfColumn,
							numOfRow,
							numOfSquare,
							containerHeight,
							containerWidth,
						};
					}

					function createSquare(numOfSquare: number) {
						for (let i = 0; i < numOfSquare; i++) {
							const square = document.createElement('div');
							square.classList.add('view--box');
							scope.current?.appendChild(square);
							squares.push(square);
						}
					}
					const { numOfSquare, containerHeight, containerWidth } =
						setupSquare(squareSize);

					scope.current.style.width = containerWidth;
					scope.current.style.height = containerHeight;
					const init = contextSafe(() => createSquare(numOfSquare));
					init();
					window.addEventListener('resize', init);

					return () => {
						window.removeEventListener('resize', init);
					};
				}
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
