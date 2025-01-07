import AppLayout from '@/components/layout/app';
import { cn } from '@/libs/utils';
import type { Metadata } from 'next';
import fonts from './fonts';
import './globals.css';

export const metadata: Metadata = {
	title: 'Demo',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={process.env.NODE_ENV === 'production'}
				className={cn('antialiased', fonts.inter, fonts.victorMono)}>
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
