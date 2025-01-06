import dynamic from 'next/dynamic';

export default function Home() {
	return Object.entries(resources.Views).map(([key, Component]) => <Component key={key} />);
}
const resources = {
	Views: {
		Test: dynamic(() => import('@/components/views/test')),
	},
};
