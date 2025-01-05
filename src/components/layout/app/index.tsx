import dynamic from "next/dynamic";
import React from "react";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { Navbar, Lenis } = resources;
	return (
		<Lenis root>
			<Navbar />
			{children}
		</Lenis>
	);
};
const resources = {
	Navbar: dynamic(() => import("@/components/layout/navbar")),
	Lenis: dynamic(() => import("@/components/layout/lenis")),
};
export default AppLayout;
