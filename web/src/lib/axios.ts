
import baseAxios from 'axios'

import { getCookiesString } from './cookies'
import { absoluteApiUrl } from './utils'
import {isServer} from '@tanstack/react-query'

export const axios = baseAxios.create({
	baseURL: absoluteApiUrl(),
	withCredentials: true
})

axios.interceptors.request.use(async (config) => {
	if(isServer) {
		config.headers['Cookie'] = await getCookiesString()
	}
	return config
})
