import { useState, useEffect } from 'react';

import { bitpin } from 'utils/services/api';

function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			await bitpin
				.get(url)
				.then((res) => setData(res.data.results))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(true);
				});
		})();
	}, []);

	return { data, error, loading };
}

export default useFetch;
