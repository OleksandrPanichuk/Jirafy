'use client'
import { cloneElement, HTMLAttributes, isValidElement, ReactNode } from 'react'

export const useChildrenWithProps = <T = HTMLAttributes<HTMLElement>>(
	children: ReactNode,
	additionalProps: T
) => {
	if (!isValidElement(children)) {
		throw new Error('Children must be a valid React element.')
	}

	return cloneElement(children, additionalProps)
}
