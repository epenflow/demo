import React from 'react';

export default function useTime(delay?: number) {
	const [date, setDate] = React.useState<Date>(new Date());

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setDate((prev) => {
				prev = new Date();
				return prev;
			});
		}, delay ?? 1_000);

		return () => {
			clearInterval(intervalId);
		};
	}, [setDate, delay]);

	return date;
}
