import { Outlet } from '@tanstack/react-router';
import React from 'react';
import { isProduction } from '~/libs/utils';
import './app.scss';

const App = () => {
	const { Navbar, DisableReactDevtools, TanstackRouterDevtools } = resources;
	return (
		<>
			<Navbar />
			<Outlet />
			<React.Suspense>
				<DisableReactDevtools condition={isProduction()} />
				<TanstackRouterDevtools />
			</React.Suspense>
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
};
export default App;
