import { zMongoId } from '@/lib'
import { z } from 'zod'

export const removeFromFavoritesSchema = z.object({
	memberId: zMongoId(),
	favoriteId: zMongoId()
})

export type RemoveFromFavoritesInput = z.infer<typeof removeFromFavoritesSchema>

export const addToFavoritesSchema = z.object({
	projectId: zMongoId(),
	memberId: zMongoId()
})

export type AddToFavoritesInput = z.infer<typeof addToFavoritesSchema>
