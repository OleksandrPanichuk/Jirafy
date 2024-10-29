import { TypeUser } from "./user.types"

export type DecodedIdentityToken = {
	id: string
	verified: boolean
}

export type DecodedOAuthDataToken = { user: Partial<TypeUser> }
