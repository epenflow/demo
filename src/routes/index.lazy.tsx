import { createLazyFileRoute } from '@tanstack/react-router';
import withLoader from '~/components/layouts/loader/hoc';

export const Route = createLazyFileRoute('/')({
	component: withLoader(Index),
});

function Index() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
		</div>
	);
}
