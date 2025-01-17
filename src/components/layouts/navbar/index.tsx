/* eslint-disable react-refresh/only-export-components */
import { Link } from '@tanstack/react-router';
import React from 'react';
import type { FileRouteTypes } from '~/routeTree.gen';
import './base.scss';
import hoc, { type Props } from './hoc';

const Navbar: React.FC<Props> = ({ scope, fnToggleMenu }) => {
	const { navigation } = resources;
	return (
		<header
			ref={scope}
			className="header--outer">
			<div className="header--inner">
				<button onClick={fnToggleMenu} />
			</div>
			<nav
				data-lenis-prevent
				className="header--content">
				{navigation.map(({ to, title }, key) => (
					<Link
						onClick={fnToggleMenu}
						key={key}
						to={to}>
						<p>
							<span className="text--content">{title}</span>
							<span className="separator" />
						</p>
					</Link>
				))}
			</nav>
		</header>
	);
};

export default hoc(Navbar);
const resources = {
	navigation: [
		{
			to: '/',
			title: 'Home',
		},
		{
			to: '/about',
			title: 'About',
		},
		{
			to: '/clip-path-scroll',
			title: 'Clip Path Scroll',
		},
	] satisfies Array<{ to: FileRouteTypes['to']; title: string }>,
};
