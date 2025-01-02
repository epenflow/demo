import dynamic from "next/dynamic";
import React from "react";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { Lenis } = resources;
	return <Lenis root>{children}</Lenis>;
	// return children;
};
const resources = {
	Lenis: dynamic(() => import("@/components/lenis")),
};
export default AppLayout;
