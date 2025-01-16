'use client';
import { createRootRoute } from '@tanstack/react-router';
import App from '../components/layouts/app';

export const Route = createRootRoute({
	component: App,
});
