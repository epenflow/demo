import { createLazyFileRoute } from '@tanstack/react-router';
import withLoader from '~/components/layouts/loader';
import View from '~/components/views/clip-path-scroll';

export const Route = createLazyFileRoute('/clip-path-scroll')({
	component: withLoader(View),
});
