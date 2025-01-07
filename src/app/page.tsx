'use client';

import { useProcess } from '@/contexts/process';
import dynamic from 'next/dynamic';

const Default = dynamic(() => import('@/components/views/default'));

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
