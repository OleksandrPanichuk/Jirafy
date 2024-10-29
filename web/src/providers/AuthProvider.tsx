'use client'

import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { TypeUser } from '@/types'
import { useSafeContext } from '@/hooks'

interface IAuthStore {
	user: TypeUser | null
	setUser: (user: TypeUser | null) => void
}

type AuthContext = StoreApi<IAuthStore>

interface IAuthProviderProps {
	initialUser: TypeUser | null
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider = ({
	children,
	initialUser
}: PropsWithChildren<IAuthProviderProps>) => {
	const [store] = useState(
		createStore<IAuthStore>((set) => ({
			user: initialUser,
			setUser: (data) => set({ user: data })
		}))
	)
	return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = <T,>(selector: (store: IAuthStore) => T): T => {
	const context = useSafeContext(AuthContext)
	return useStore(context, selector)
}
