import { Outlet, ScrollRestoration } from '@tanstack/react-router';
import React from 'react';
import { isProduction } from '~/libs/utils';
const App = () => {
	const { Navbar, DisableReactDevtools, TanstackRouterDevtools, Lenis, FPSStats } = resources;
	console.log(
		'%c--EF@epenflow///',
		'color:#00ff00;font-family:system-ui;font-size:4rem;font-weight:bold',
	);
	return (
		<React.Suspense>
			<Lenis root>
				<Navbar />
				<Outlet />
				<ScrollRestoration />
				<DisableReactDevtools condition={isProduction()} />
				<TanstackRouterDevtools />
				<FPSStats
					width={30 * 5}
					bottom={25}
					right={25}
				/>
			</Lenis>
		</React.Suspense>
	);
};
const resources = {
	FPSStats: React.lazy(() => import('~/components/layouts/fps-stats')),
	DisableReactDevtools: React.lazy(() => import('~/components/layouts/disable-react-devtools')),
	TanstackRouterDevtools: isProduction()
		? () => null
		: React.lazy(() =>
				import('@tanstack/router-devtools').then((response) => ({
					default: response.TanStackRouterDevtools,
				})),
			),
	Navbar: React.lazy(() => import('~/components/layouts/navbar')),
	Lenis: React.lazy(() => import('~/components/layouts/lenis')),
};
export default App;
