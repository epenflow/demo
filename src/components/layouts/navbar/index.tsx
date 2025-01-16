/* eslint-disable react-refresh/only-export-components */
import { Link } from '@tanstack/react-router';
import React from 'react';
import './base.scss';
import hoc, { type Props } from './hoc';

const Navbar: React.FC<Props> = ({ scope }) => {
	const { navigation } = resources;
	return (
		<header
			ref={scope}
			className="header--outer">
			<div className="header--inner">
				<button />
			</div>
			<nav
				data-lenis-prevent
				className="header--content">
				{navigation.map(({ to, title }, key) => (
					<Link
						key={key}
						to={to}>
						<div>
							<span className="text--content ">{title}</span>
							<span className="separator" />
						</div>
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
	] satisfies Array<{ to: string; title: string }>,
};
