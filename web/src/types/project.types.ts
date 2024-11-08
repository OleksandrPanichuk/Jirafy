import { Network } from "./common.types"
import { TypeFile } from "./file.types"


export type TypeProject = {
	id:string
	name:string
	description?:string
	cover?:TypeFile
	emoji?:string
	network:Network
	identifier:string

	createdAt:Date 
	updatedAt:Date

	workspaceId:string
}