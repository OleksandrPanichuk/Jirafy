'use server'

import { Random } from 'unsplash-js/dist/methods/photos/types'

import { createApi } from 'unsplash-js'

const unsplashClient = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: fetch
})

export async function getRandomPhoto(count: number = 20) {
	const { response } = await unsplashClient.photos.getRandom({
		query: 'nature',
		orientation: 'landscape',
		count
	})
	return response as Random[] | undefined
}

export async function searchPhotos(query: string, count: number = 20) {
	const { response } = await unsplashClient.search.getPhotos({
		query,
		orientation: 'landscape',
		perPage: count
	})
	return response?.results
}
