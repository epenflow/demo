import { createLazyFileRoute } from '@tanstack/react-router';
import withLoader from '~/components/layouts/loader';
import HelloLoader from '~/components/views/hello-loader';

export const Route = createLazyFileRoute('/')({
	component: withLoader(HelloLoader),
});
