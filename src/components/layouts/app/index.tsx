import { Outlet } from '@tanstack/react-router';
import React from 'react';
import { isProduction } from '~/libs/utils';

const App = () => {
	const { Navbar, DisableReactDevtools, TanstackRouterDevtools, Lenis } = resources;
	return (
		<>
			<Lenis root>
				<Navbar />
				<Outlet />
				<React.Suspense>
					<DisableReactDevtools condition={isProduction()} />
					<TanstackRouterDevtools />
				</React.Suspense>
			</Lenis>
		</>
	);
};
const resources = {
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
