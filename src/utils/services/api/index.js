// Creating custom axios for api base url
import axios from 'axios';
import { API_URL, GET, POST } from 'utils/constants/index';

const api = (url, request, data) => {
	switch (request) {
		case GET:
			return new Promise((resolve, reject) => {
				axios
					.get(API_URL + url)
					.then((res) => resolve(res))
					.catch((err) => reject(err));
			});
		case POST:
			return new Promise((resolve, reject) => {
				axios
					.post(API_URL + url, data)
					.then((res) => resolve(res))
					.catch((err) => reject(err));
			});
		default:
			break;
	}
};

export default api;
