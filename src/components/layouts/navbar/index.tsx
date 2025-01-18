/* eslint-disable react-refresh/only-export-components */
import { Link } from '@tanstack/react-router';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import useTime from '~/hooks/use-time';
import type { FileRouteTypes } from '~/routeTree.gen';
import './base.scss';
import hoc, { type Props } from './hoc';

const Navbar: React.FC<Props> = ({ scope, fnToggleMenu }) => {
	const parentRef = React.useRef<HTMLDivElement>(null);
	const date = useTime();
	const { navigation } = resources;

	const virtualizer = useVirtualizer({
		count: navigation.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
		debug: true,
	});

	const CSSVariables = {
		'--virtual-contentHeight': `${virtualizer.getTotalSize()}px`,
	} as React.CSSProperties;

	console.log('virtual items', virtualizer.getVirtualItems());

	return (
		<header
			ref={scope}
			style={CSSVariables}
			className="header--outer">
			<div className="header--inner">
				<button onClick={fnToggleMenu} />
			</div>
			<nav
				data-lenis-prevent
				className="header--content">
				<div
					ref={parentRef}
					className="navigation--content">
					<div className="virtual--container">
						{virtualizer.getVirtualItems().map((virtual) => {
							const CSSVariables = {
								'--virtual-height': `${virtual.size}px`,
								'--virtual-yAxis': `${virtual.start}px`,
							} as React.CSSProperties;
							return (
								<Link
									onClick={fnToggleMenu}
									className="virtual--item"
									style={CSSVariables}
									to={navigation[virtual.index].to}
									key={virtual.index}>
									<p className="paragraph--content">
										<span className="text--content">
											{navigation[virtual.index].title + ' ' + virtual.index}
										</span>
										<span className="link--separator" />
									</p>
								</Link>
							);
						})}
					</div>
					{/* {Array.from({ length: 10 }).map((_, key) => (
							<Link
								onClick={fnToggleMenu}
								key={key}
								to={'/'}>
								<p>
									<span className="text--content">{key}</span>
									<span className="link--separator" />
								</p>
							</Link>
						))} */}
				</div>
				<span className="separator" />
				<div className="time--content">
					<p suppressHydrationWarning>{date.toISOString()}</p>
				</div>
			</nav>
		</header>
	);
};

export default hoc(Navbar);
const generateRandomTitle = () => {
	const adjectives = [
		'Amazing',
		'Incredible',
		'Fantastic',
		'Wonderful',
		'Splendid',
		'Awesome',
		'Impressive',
	];
	const nouns = ['Adventure', 'Journey', 'Experience', 'Quest', 'Odyssey', 'Saga', 'Story'];
	const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
	return `${randomAdjective} ${randomNoun}`;
};
const navigation = Array.from({ length: 10000 }).map(() => ({
	to: '/clip-path-scroll' satisfies FileRouteTypes['to'],
	title: generateRandomTitle(),
}));

const resources = {
	navigation: navigation,
};
