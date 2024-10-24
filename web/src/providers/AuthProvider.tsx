'use client'

import { TypeUser } from '@/types'
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react'

interface IAuthContext {
	user: TypeUser | null
	setUser: Dispatch<SetStateAction<TypeUser | null>>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<TypeUser | null>(null)
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
