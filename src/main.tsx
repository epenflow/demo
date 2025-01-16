import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
createRoot(document.getElementById('body--container')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
