// Creating custom axios for api base url
import axios from 'axios'

const url = axios.create({
	baseURL: 'https://api.bitpin.ir/v1',
})

export default url
