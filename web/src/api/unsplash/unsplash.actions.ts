'use server'

import { Random } from 'unsplash-js/dist/methods/photos/types'

import { createApi } from 'unsplash-js'

const unsplashClient = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: fetch
})

export async function getRandomPhotos({
	query = 'nature',
	count = 20
}: { query?: string; count?: number } = {}) {
	const { response } = await unsplashClient.photos.getRandom({
		query,
		orientation: 'landscape',
		count
	})
	return response as Random[] | undefined
}
