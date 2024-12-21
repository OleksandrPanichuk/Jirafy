export const memberTableColumns = [
	{
		label: 'Full name',
		key: 'full-name'
	},
	{
		label: 'Display name',
		key: 'display-name'
	},
	{
		label: 'Email address',
		key: 'email'
	},
	{
		label: 'Role',
		key: 'role'
	},
	{
		label: 'Joining date',
		key: 'join-date'
	},
	{
		label: 'Actions',
		key: 'actions'
	}
] satisfies {
	label: string
	key: MembersTableHeaderKeys
}[]

export type MembersTableHeaderKeys =
	| 'full-name'
	| 'display-name'
	| 'email'
	| 'role'
	| 'join-date'
	| 'actions'
