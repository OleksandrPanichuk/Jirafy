'use client'

import { useEffect, useState } from 'react'

type Props = {
	onMount?: () => void
	onUnmount?: () => void
	beforeMount?: () => void
}

export const useMounted = ({ beforeMount, onMount, onUnmount }: Props = {}) => {
	const [isMounted, setIsMounted] = useState(false)

	if (!isMounted) {
		beforeMount?.()
	}

	useEffect(() => {
		setIsMounted(true)
		onMount?.()

		return () => {
			setIsMounted(false)
			onUnmount?.()
		}
	}, [onMount, onUnmount])

	return isMounted
}
