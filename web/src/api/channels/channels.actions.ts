'use server'

import { ChannelsApi } from './channels.service'

export const getAllChannels = async (slug: string) => {
	try {
		return await ChannelsApi.findAll(slug)
	} catch {
		return []
	}
}

export const getChannelByName = async (slug: string, name: string) => {
	try {
		return await ChannelsApi.findByName(slug, name)
	} catch {
		return null
	}
}
