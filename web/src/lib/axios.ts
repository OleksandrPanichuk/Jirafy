import baseAxios from 'axios'

import { getCookiesString } from './cookies'
import { absoluteApiUrl } from './utils'

export const axios = baseAxios.create({
	baseURL: absoluteApiUrl(),
	withCredentials: true
})

axios.interceptors.request.use(async (config) => {
	config.headers['Cookie'] = await getCookiesString()
	return config
})
