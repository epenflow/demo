import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
	component: () => {
		return <div>Hello "/about"!</div>;
	},
});
