'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import ContextFactory from '../factory';

type Process = Record<
	string,
	{
		title: string;
		Component: React.ComponentType<{}>;
	}
>;
export const directory: Process = {
	Test: {
		title: 'test',
		Component: dynamic(() => import('@/components/views/test')),
	},
	Hero: {
		title: 'hero',
		Component: dynamic(() => import('@/components/views/hero')),
	},
	About: {
		title: 'about',
		Component: dynamic(() => import('@/components/views/about')),
	},
};
function useProcessContext() {
	const [process, $setProcess] = React.useState<Process>({});

	const setProcess = React.useCallback(
		({ event, key }: { event?: React.MouseEvent; key: string }) => {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			$setProcess(() => ({ [key]: directory[key] }));
			console.log(process);
		},
		[process],
	);
	return {
		process,
		setProcess,
	};
}

export const { Provider: ProcessProvider, useContext: useProcess } =
	ContextFactory(useProcessContext);
