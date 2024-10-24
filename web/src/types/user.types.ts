import { TypeFile } from '@/types'

export type TypeUser = {
	id: string
	email: string
	firstName: string
	lastName: string
	avatar: TypeFile

	createdAt: Date
	updatedAt: Date
}
