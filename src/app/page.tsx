'use client';

import dynamic from 'next/dynamic';

const Default = dynamic(() => import('@/components/views/default'));

export default function Home() {
	return <Default />;
}
