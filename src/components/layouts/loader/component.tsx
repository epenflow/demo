import React from 'react';
import './base.scss';

const Loader: React.FC = () => {
	const { colors } = React.useMemo(() => resources, []);

	return (
		<div className="loader--outer">
			<div className="loader--inner loader--first">
				{colors.map((color, key) => {
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
				})}
			</div>
			<div className="loader--inner loader--second">
				{colors.map((color, key) => {
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
				})}
			</div>
		</div>
	);
};
export default Loader;
const resources = {
	colors: ['#ffffff', '#fef100', '#00d1fe', '#14ff01', '#fa00ff', '#ff3400', '#0105ff'],
};
