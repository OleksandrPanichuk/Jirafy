'use client'

import { SocketEvents } from '@/constants'
import { useAuth } from '@/features/auth'
import { useUserInvitesQuery } from '@/features/invites'
import { toast } from '@/features/toast'
import { useSafeContext } from '@/hooks'
import { useSocket } from '@/providers'
import { SocketNamespace, TypeInvite, TypeInviteWithUser } from '@/types'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IUserInvitesStore {
	invites: TypeInviteWithUser[]
	set: (invites: TypeInviteWithUser[]) => void
	add: (invite: TypeInviteWithUser) => void
	update: (id: string, invite: Partial<Omit<TypeInviteWithUser, 'id'>>) => void
}

type UserInvitesContext = StoreApi<IUserInvitesStore>

interface IUserInvitesProviderProps extends PropsWithChildren {
	initialInvites?: TypeInviteWithUser[]
}

const UserInvitesContext = createContext<UserInvitesContext>({} as UserInvitesContext)

export const UserInvitesProvider = ({ children, initialInvites }: IUserInvitesProviderProps) => {
	const invitesSocket = useSocket(SocketNamespace.INVITES)
	const user = useAuth((s) => s.user)

	const [store] = useState(
		createStore<IUserInvitesStore>((set) => ({
			invites: initialInvites ?? [],
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
			store.getState().add({
				...invite,
				user
			})

			toast.success('New invite received')
		})

		return () => {
			invitesSocket.emit(SocketEvents.LEAVE_ROOM, user.id)
		}
	}, [invitesSocket, user, store])

	return (
		<UserInvitesContext.Provider value={store}>{children}</UserInvitesContext.Provider>
	)
}

const defaultSelector = (state: IUserInvitesStore) => state

export const useUserInvitesStore = <T = IUserInvitesStore,>(
	selector: (store: IUserInvitesStore) => T = defaultSelector as (
		store: IUserInvitesStore
	) => T
): T => {
	const context = useSafeContext(UserInvitesContext)
	return useStore(context, selector)
}
