export const FormErrors = {
	required: {
		any: 'This field is required',
		firstName: 'First name is required',
		lastName: 'Last name is required',
		email: 'Email is required',
		password: 'Password is required',
		confirmPassword: 'Please, confirm your password',
	},
	length: {
		firstName: 'First name is too short',
		lastName: 'Last name is too short',
		password: 'Password is too short',
	},
	invalid: {
		email: 'Invalid email address',
		password: 'Password is too weak',
	},
	match: {
		passwords: 'Passwords do not match',
	},
} as const
