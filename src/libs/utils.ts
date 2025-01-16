export function isObject(data: unknown) {
	const type = typeof data;
	return type === 'function' || (type === 'object' && !!data);
}
export function hasWindowObject() {
	return typeof window !== 'undefined' && window.document;
}
export function isFunction(data: unknown) {
	return typeof data === 'function';
}
export function isProduction() {
	return import.meta.env.PROD;
}
declare global {
	interface Window {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		__REACT_DEVTOOLS_GLOBAL_HOOK__: any;
	}
}

export function disableReactDevTools() {
	if (hasWindowObject()) {
		if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
			return;
		}
		for (const key in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
			if (key === 'renderers') {
				window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = new Map();
				continue;
			}
			window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = isFunction(
				window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key],
			)
				? Function.prototype
				: null;
		}
	}
}
