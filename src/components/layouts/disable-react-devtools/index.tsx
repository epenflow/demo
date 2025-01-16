'use client';
import type React from 'react';
import { disableReactDevTools } from '~/libs/utils';

const DisableReactDevtools: React.FC<{ condition?: boolean }> = ({ condition = false }) => {
	if (condition) {
		disableReactDevTools();
	}
	return null;
};
export default DisableReactDevtools;
