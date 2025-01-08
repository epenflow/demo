import { cn } from '@/libs/utils';
import React from 'react';

interface Props extends React.ComponentProps<'div'> {
	type?: 'char' | 'word';
}
const SplitText: React.FC<Props> = ({ type = 'char', children, ...rest }) => {
	const splitter = type === 'char' ? '' : /(?=\s)|(?<=\s)/;
	if (Array.isArray(children)) {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		const $children: Array<{
			children?: string;
			className?: string;
			type?: string | React.JSXElementConstructor<any>;
		}> = [];

		children.forEach((child: React.ReactNode) => {
			if (typeof child === 'string') {
				$children.push({
					children: child,
				});
			} else if (React.isValidElement(child)) {
				const props = child.props as {
					children?: string;
					className?: string;
				};
				$children.push({
					children: props.children,
					className: props.className,
					type: child.type,
				});
			}
		});

		return (
			<div
				{...rest}
				className="inline-block overflow-hidden">
				{$children.map((child, key) => {
					const Element = child.type || 'span';
					return (
						<Element
							key={key}
							className={cn(child.className, 'inline-block overflow-hidden')}>
							{child.children?.split(splitter).map((result, index) => (
								<span
									data-splitter
									key={index}
									className="inline-block leading-normal whitespace-pre">
									{result}
								</span>
							))}
						</Element>
					);
				})}
			</div>
		);
	}

	if (typeof children === 'string') {
		return (
			<div
				{...rest}
				className="inline-block overflow-hidden">
				{children.split(splitter).map((result, key) => (
					<span
						data-splitter
						key={key}
						className="inline-block leading-normal whitespace-pre">
						{result}
					</span>
				))}
			</div>
		);
	}

	return null;
};
export default SplitText;
