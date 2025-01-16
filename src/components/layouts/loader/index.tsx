import type React from 'react';
import { type Props } from './hoc';

const Loader: React.FC<Props> = ({ scope }) => {
	return (
		<div
			ref={scope}
			className="h-svh w-full fixed top-0 z-50 flex">
			{Array.from({ length: 10 }).map((_, key) => {
				const CSSVariables = {
					'--loader-width': `10%`,
				} as React.CSSProperties;
				return (
					<div
						data-loader
						key={key}
						style={CSSVariables}
						className="w-[var(--loader-width)] h-full flex-grow bg-white"
					/>
				);
			})}
		</div>
	);
};
export default Loader;
