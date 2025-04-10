export enum ChannelType {
	TEXT = 'TEXT',
	VOICE = 'VOICE'
}

export type TypeChannel = {
	id: string
	workspaceId: string
	name: string
	type: ChannelType
	groupId: string
}

export type TypeChannelsGroup = {
	id: string
	name: string
	workspaceId: string
}

export type TypeChannelsGroupWithChannels = TypeChannelsGroup & {
	channels: TypeChannel[]
}
