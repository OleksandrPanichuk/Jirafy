'use server'

import { ChannelsApi } from './channels.service'

export const getAllChannels = async (slug: string) => {
	try {
		return await ChannelsApi.findAll(slug)
	} catch {
		return []
	}
}
