import { IsNotEmpty, IsString, MinLength } from "class-validator"


export class VerifyIdentityInput {

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	readonly password: string
}