import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...args: ClassValue[]) {
	return twMerge(clsx(args));
}

export function getPropertyValue(property: string, element?: Element) {
	const $element = element || document.documentElement;

	return getComputedStyle($element).getPropertyValue(property);
}

export function getComputeGridDimensions(size: number) {
	const row = Math.ceil(window.innerWidth / size);
	const column = Math.ceil(window.innerHeight / 2);
	const ceil = column * row;
	const width = row * size;
	const height = column * size;

	return { row, column, ceil, width, height };
}
