'use client';

import Default from '@/components/views/default';
import { useProcess } from '@/contexts/process';

export default function Home() {
	const { process = {} } = useProcess();

	if (process && typeof process === 'object' && Object.keys(process).length === 0) {
		return <Default />;
	}
	return (
		<>
			{Object.entries(process).map(([key, { Component }]) => (
				<Component key={key} />
			))}
		</>
	);
}
