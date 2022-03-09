// Creating custom axios for api base url
import axios from 'axios';

export const bitpin = axios.create({
	baseURL: 'https://api.bitpin.ir/v1',
});
