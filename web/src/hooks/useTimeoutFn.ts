'use client'
import { useCallback, useEffect, useRef } from 'react'

type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void]

export function useTimeoutFn(
	fn: () => void,
	ms: number = 0
): UseTimeoutFnReturn {
	const ready = useRef<boolean | null>(false)
	const timeout = useRef<ReturnType<typeof setTimeout>>()
	const callback = useRef(fn)

	const isReady = useCallback(() => ready.current, [])

	const set = useCallback(() => {
		ready.current = false
		timeout.current && clearTimeout(timeout.current)

		timeout.current = setTimeout(() => {
			ready.current = true
			callback.current()
		}, ms)
	}, [ms])

	const clear = useCallback(() => {
		ready.current = null
		timeout.current && clearTimeout(timeout.current)
	}, [])

	useEffect(() => {
		callback.current = fn
	}, [fn])

	useEffect(() => {
		set()

		return clear
	}, [ms])

	return [isReady, clear, set]
}
