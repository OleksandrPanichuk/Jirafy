import { Context, useContext } from 'react'

type AdditionalProps = {
	hookName?: string
}

export const useSafeContext = <T>(
	context: Context<T>,
	hookName: string = 'useSafeContext'
): NonNullable<T> => {
	const contextValue = useContext(context)
	if (!contextValue) {
		throw new Error(
			`${hookName} must be used within a ${context.displayName || 'Provider'} with a value`
		)
	}
	return contextValue
}
