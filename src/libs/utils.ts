import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...args: ClassValue[]) {
	return twMerge(clsx(args));
}

export function getPropertyValue(property: string, element?: Element) {
	const $element = element || document.documentElement;

	return getComputedStyle($element).getPropertyValue(property);
}
