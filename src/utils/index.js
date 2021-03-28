import axios from 'axios';

async function customFetch(URL, METHOD = 'get', config = null) {
	const data = await axios({ url: URL, method: METHOD, ...config })
		.then((res) => res.data)
		.catch((err) => console.log(err));

	return data;
}

export { customFetch };
