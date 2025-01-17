import React from 'react';
import { type Props } from '.';
import './base.scss';

const Loader: React.FC<Props> = ({ scope }) => {
	const { colors } = resources;

	const LoaderItem = () => {
		return colors.map((color, key) => {
			const CSSVariables = {
				'--loader-color': color,
			} as React.CSSProperties;
			return (
				<div
					key={key}
					style={CSSVariables}
					className="loader--item"
				/>
			);
		});
	};

	return (
		<div
			ref={scope}
			className="loader--outer">
			<div className="loader--inner loader--first">
				<LoaderItem />
			</div>
			<div className="loader--inner loader--second">
				<LoaderItem />
			</div>
		</div>
	);
};
export default Loader;
const resources = {
	colors: ['#ffffff', '#fef100', '#00d1fe', '#14ff01', '#fa00ff', '#ff3400', '#0105ff'],
};
