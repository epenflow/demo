import { createLazyFileRoute } from '@tanstack/react-router';
import withLoader from '~/components/layouts/loader/hoc';

export const Route = createLazyFileRoute('/about')({
	component: withLoader(() => {
		return <div className="h-[1000svh]">Hello "/about"!</div>;
	}),
});
