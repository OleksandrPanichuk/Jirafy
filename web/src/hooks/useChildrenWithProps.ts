import { cloneElement, HTMLAttributes, isValidElement, ReactNode } from 'react'

export const useChildrenWithProps = (
	children: ReactNode,
	additionalProps: HTMLAttributes<HTMLElement>
) => {
	if (!isValidElement(children)) {
		throw new Error('Children must be a valid React element.')
	}

	return cloneElement(children, additionalProps)
}
