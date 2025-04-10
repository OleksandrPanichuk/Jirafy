export const FormErrors = {
	required: {
		any: 'This field is required',
		firstName: 'First name is required',
		lastName: 'Last name is required',
		email: 'Email is required',
		password: 'Password is required',
		confirmPassword: 'Please, confirm your password',
		username: 'Display name is required',
		workspaceName: 'Workspace name is required',
		workspaceSlug: 'Workspace slug is required',
		workspaceSize: 'Workspace size is required',
		projectName: 'Project name is required',
		projectIdentifier: 'ID is required',
		channelsGroup: 'Channels group name is required',
		channels: 'Channel name is required',
	},
	length: {
		firstName: 'First name is too short',
		lastName: 'Last name is too short',
		password: 'Password is too short',
		username: 'Display name is too short',
		workspaceName: 'Workspace name is too short',
		workspaceSlug: 'Workspace slug is too short',
		projectName: 'Project name is too short',
		projectDescription: 'Project description is too short',
		projectIdentifier: 'ID is too long'
	},
	invalid: {
		email: 'Invalid email address',
		password: 'Password is too weak',
		verificationToken: 'Invalid token',
		workspaceSize: 'Workspace size cannot be negative',
		projectNetwork: 'Invalid network'
	},
	match: {
		passwords: 'Passwords do not match'
	}
} as const
