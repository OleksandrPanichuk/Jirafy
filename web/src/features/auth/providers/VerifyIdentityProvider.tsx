'use client'

import { useSafeContext } from '@/hooks'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface VerifyIdentityStore {
	isIdentityVerified: boolean
	setIsIdentityVerified: (isIdentityVerified: boolean) => void
}

type VerifyIdentityContext = StoreApi<VerifyIdentityStore>

interface IVerifyIdentityProviderProps {
	initialVerified?: boolean
}

const VerifyIdentityContext = createContext<VerifyIdentityContext>(
	{} as VerifyIdentityContext
)

export const VerifyIdentityProvider = ({
	children,
	initialVerified
}: PropsWithChildren<IVerifyIdentityProviderProps>) => {
	const [store] = useState(
		createStore<VerifyIdentityStore>((set) => ({
			isIdentityVerified: initialVerified || false,
			setIsIdentityVerified: (isIdentityVerified) => set({ isIdentityVerified })
		}))
	)
	return <VerifyIdentityContext.Provider value={store}>{children}</VerifyIdentityContext.Provider>
}

export const useVerifyIdentityStore = <T,>(
	selector: (store: VerifyIdentityStore) => T
): T => {
	const context = useSafeContext(VerifyIdentityContext)
	return useStore(context, selector)
}
