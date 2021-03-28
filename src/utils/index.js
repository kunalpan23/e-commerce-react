import axios from 'axios';

async function customFetch(URL, METHOD = 'get', config = null) {
	const data = await axios({ url: URL, method: METHOD, ...config }).then(
		(res) => res.data
	);

	return data;
}

export { customFetch };
