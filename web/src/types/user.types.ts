import { TypeFile } from '@/types'

export type TypeUser = {
	id: string
	email: string
	firstName: string
	lastName: string
	username: string
	avatar?: TypeFile
	coverImage?: TypeFile

	verified: boolean

	createdAt: Date
	updatedAt: Date
}
