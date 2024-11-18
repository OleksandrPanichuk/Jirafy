import { TypeUser } from './user.types'

export type DecodedIdentityToken = {
	id: string
	verified: boolean
}

export type DecodedOAuthDataToken = { user: Partial<TypeUser> }

export enum Network {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE'
}


export type BreakpointsType =
	| 'lg'
	| 'max-lg'
	| 'md'
	| 'max-md'
	| 'sm'
	| 'max-sm'
	| 'xs'
	| 'max-xs'