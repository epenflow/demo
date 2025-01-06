'use client';
import React from 'react';

const ContextFactory = <T,>(useContext: () => T) => {
	const Context = React.createContext({} as T);

	return {
		useContext: () => {
			const context = React.useContext(Context);

			// Check object if is an empty object
			if (context && typeof context === 'object' && Object.keys(context).length === 0) {
				throw new Error('useContext must be used within a Provider');
			}

			return context;
		},
		Provider: ({ children }: React.PropsWithChildren) => (
			<Context value={useContext()}>{children}</Context>
		),
	};
};
export default ContextFactory;
