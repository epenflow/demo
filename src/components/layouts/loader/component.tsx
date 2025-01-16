import type React from 'react';
import { type Props } from '.';

const Loader: React.FC<Props> = ({ scope }) => {
	const colors = ['#ffffff', '#fef100', '#00d1fe', '#14ff01', '#fa00ff', '#ff3400', '#0105ff'];
	return (
		<div
			ref={scope}
			className="h-svh w-full fixed top-0 z-50 flex">
			{colors.map((color, key) => {
				const CSSVariables = {
					'--loader-width': `10%`,
					'--loader-color': color,
				} as React.CSSProperties;
				return (
					<div
						data-loader
						key={key}
						style={CSSVariables}
						className="w-[var(--loader-width)] h-full flex-grow bg-[var(--loader-color)]"
					/>
				);
			})}
		</div>
	);
};
export default Loader;
