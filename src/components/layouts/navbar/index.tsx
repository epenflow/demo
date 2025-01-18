import { useGSAP } from '@gsap/react';
import { Link } from '@tanstack/react-router';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import gsap from 'gsap';
import React from 'react';
import useTime from '~/hooks/use-time';
import HeaderAnimator from '~/libs/modules/header-animator';
import TextAnimator from '~/libs/modules/text-animator';
import type { FileRouteTypes } from '~/routeTree.gen';
import { useLoader } from '../loader';
import './base.scss';

const Navbar: React.FC = () => {
	const scope = React.useRef<HTMLElement>(null);
	const virtualRef = React.useRef<HTMLDivElement>(null);
	const timeline = React.useRef<GSAPTimeline | null>(null);
	const [isTrigger, setTrigger] = React.useState<boolean>(false);

	const { navigation } = React.useMemo(() => resources, []);
	const { setLoaderDuration } = useLoader();

	const virtualizer = useVirtualizer({
		count: navigation.length,
		getScrollElement: () => virtualRef.current,
		estimateSize: () => 35,
		debug: true,
	});
	const CSSVariables = {
		'--virtual-contentHeight': `${virtualizer.getTotalSize()}px`,
	} as React.CSSProperties;

	useGSAP(
		() => {
			const header = new HeaderAnimator(scope.current);
			if (typeof header.timeline !== 'undefined') {
				timeline.current = header.timeline;
			}
		},
		{ scope },
	);

	React.useEffect(() => {
		if (isTrigger) {
			timeline.current?.play();
		} else {
			timeline.current?.reverse();
			setLoaderDuration(timeline.current?.duration() || 0);
		}
	}, [isTrigger, setLoaderDuration]);

	function fnToggle() {
		setTrigger((prev) => !prev);
	}

	return (
		<header
			ref={scope}
			style={CSSVariables}
			className="header--outer">
			<div className="header--inner">
				<button onClick={fnToggle} />
			</div>
			<nav
				data-lenis-prevent
				className="header--content">
				<div
					ref={virtualRef}
					className="navigation--content">
					<div className="virtual--container">
						{virtualizer.getVirtualItems().map((virtual) => (
							<VirtualLink
								key={virtual.index}
								virtual={virtual}
								fnToggle={fnToggle}
							/>
						))}
					</div>
				</div>
				<span className="separator" />
				<TimeContent />
			</nav>
		</header>
	);
};
const resources = {
	navigation: [{ title: 'Home', to: '/' }, ...getRandomNavigation(10_000)] satisfies Array<{
		title: string;
		to: FileRouteTypes['to'];
	}>,
};
function getRandomNavigation(length: number) {
	const title = ['home', 'about', 'clip path scroll'];
	const to = ['/', '/about'];

	return Array.from({ length }).map(() => ({
		title: title[Math.floor(Math.random() * title.length)],
		to: to[Math.floor(Math.random() * to.length)] as FileRouteTypes['to'],
	}));
}

const TimeContent = () => {
	const date = useTime();
	return (
		<div className="time--content">
			<p suppressHydrationWarning>{date.toISOString()}</p>
		</div>
	);
};
const VirtualLink: React.FC<{
	virtual: VirtualItem;
	fnToggle: () => void;
}> = ({ virtual, fnToggle }) => {
	const { navigation } = React.useMemo(() => resources, []);
	const scope = React.useRef<HTMLAnchorElement>(null);
	const CSSVariables = {
		'--virtual-height': `${virtual.size}px`,
		'--virtual-yAxis': `${virtual.start}px`,
	} as React.CSSProperties;

	React.useEffect(() => {
		const context = gsap.context(() => {
			if (scope.current) {
				const text = scope.current.querySelector('.text--content') as HTMLElement;
				const spans: HTMLSpanElement[] = gsap.utils.toArray('span');
				const textAnimator = new TextAnimator(text);
				scope.current.addEventListener('mouseenter', () => {
					textAnimator.animate();
				});
				spans.forEach((span) => {
					gsap.from(span, {
						yPercent: -100,
						xPercent: -100,
						rotateY: 45,
						ease: 'sine.inOut',
						stagger: { each: 0.25, amount: 0.25 },
					});
				});
			}
		}, scope);
		return () => context.revert();
	}, []);

	return (
		<Link
			ref={scope}
			onClick={fnToggle}
			to={navigation[virtual.index].to}
			className="virtual--item"
			style={CSSVariables}>
			<p className="paragraph--content">
				<span className="text--content">
					{navigation[virtual.index].title}&nbsp;{virtual.index}
				</span>
				<span className="link--separator" />
			</p>
		</Link>
	);
};

export default Navbar;
