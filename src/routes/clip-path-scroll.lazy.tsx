import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import withLoader from '~/components/layouts/loader';

const View = React.lazy(() => import(`~/components/views/clip-path-scroll`));

export const Route = createLazyFileRoute('/clip-path-scroll')({
	component: withLoader(View),
});
