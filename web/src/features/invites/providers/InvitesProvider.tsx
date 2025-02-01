'use client'

import { SocketEvents } from '@/constants'
import { useAuth } from '@/features/auth'
import { useUserInvitesQuery } from '@/features/invites'
import { toast } from '@/features/toast'
import { useSafeContext } from '@/hooks'
import { useSocket } from '@/providers'
import { SocketNamespace, TypeInvite } from '@/types'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IInvitesStore {
	invites: TypeInvite[]
	set: (invites: TypeInvite[]) => void
	add: (invite: TypeInvite) => void
	update: (id: string, invite: Partial<Omit<TypeInvite, 'id'>>) => void
}

type InvitesContext = StoreApi<IInvitesStore>

interface IInvitesProviderProps extends PropsWithChildren {}

const InvitesContext = createContext<InvitesContext>({} as InvitesContext)

export const InvitesProvider = ({ children }: IInvitesProviderProps) => {
	const invitesSocket = useSocket(SocketNamespace.INVITES)
	const user = useAuth((s) => s.user)

	const [store] = useState(
		createStore<IInvitesStore>((set) => ({
			invites: [],
			add: (invite) =>
				set((state) => ({ invites: [...state.invites, invite] })),
			set: (invites) => set({ invites }),
			update: (id, invite) =>
				set((state) => ({
					invites: state.invites.map((i) =>
						i.id === id ? { ...i, ...invite } : i
					)
				}))
		}))
	)

	useUserInvitesQuery({
		onSuccess: (invites) => {
			store.getState().set(invites)
		}
	})


	useEffect(() => {
		if (!user || !invitesSocket) {
			return
		}
		invitesSocket.emit(SocketEvents.JOIN_ROOM, user.id)

		invitesSocket.on(SocketEvents.EXCEPTION, (error) => console.error('WsError',error))

		invitesSocket.on(SocketEvents.INVITE_CREATED, (invite: TypeInvite) => {
			store.getState().add(invite)

			toast.success('New invite received')
		})

		return () => {
			invitesSocket.emit(SocketEvents.LEAVE_ROOM, user.id)
		}
	}, [invitesSocket, user, store])

	return (
		<InvitesContext.Provider value={store}>{children}</InvitesContext.Provider>
	)
}

const defaultSelector = (state: IInvitesStore) => state

export const useInvitesStore = <T = IInvitesStore,>(
	selector: (store: IInvitesStore) => T = defaultSelector as (
		store: IInvitesStore
	) => T
): T => {
	const context = useSafeContext(InvitesContext)
	return useStore(context, selector)
}
