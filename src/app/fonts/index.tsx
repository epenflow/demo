import { Inter, Victor_Mono } from 'next/font/google';
const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});
const victorMono = Victor_Mono({
	variable: '--font-victor-mono',
	subsets: ['latin'],
});
const fonts = {
	inter: inter.variable,
	victorMono: victorMono.variable,
};

export default fonts;
