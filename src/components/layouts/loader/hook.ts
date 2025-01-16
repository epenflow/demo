import { create } from 'zustand';

interface LoaderContext {
	duration: number;
	setDuration: (time: number) => void;
}

export const useLoader = create<LoaderContext>((setter) => ({
	duration: 0,
	setDuration(time: number) {
		setter({ duration: time });
	},
}));
