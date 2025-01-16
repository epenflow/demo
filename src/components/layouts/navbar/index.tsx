/* eslint-disable react-refresh/only-export-components */
import { Link } from '@tanstack/react-router';
import React from 'react';
import './base.scss';
import hoc, { type Props } from './hoc';

const Navbar: React.FC<Props> = ({ scope }) => {
	return (
		<header
			ref={scope}
			className="header--outer">
			<div className="header--inner">
				<button />
			</div>
			<nav className="header--content">
				<Link to="/">
					<span>Home</span>
				</Link>
				<Link to="/about">
					<span>About</span>
				</Link>
			</nav>
		</header>
	);
};
export default hoc(Navbar);
