'use client'

import { SocketEvents } from '@/constants'
import { useAuth } from '@/features/auth'
import { toast } from '@/features/toast'
import { useSafeContext } from '@/hooks'
import { useSocket } from '@/providers'
import { SocketNamespace, TypeInvite, TypeInviteWithWorkspace } from '@/types'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IUserInvitesStore {
	invites: TypeInviteWithWorkspace[]
	set: (invites: TypeInviteWithWorkspace[]) => void
	add: (invite: TypeInviteWithWorkspace) => void
	update: (
		id: string,
		invite: Partial<Omit<TypeInviteWithWorkspace, 'id'>>
	) => void
	removeMany: (ids: string[]) => void
	removeOne: (id: string) => void
}

type UserInvitesContext = StoreApi<IUserInvitesStore>

interface IUserInvitesProviderProps extends PropsWithChildren {
	initialInvites?: TypeInviteWithWorkspace[]
}

const UserInvitesContext = createContext<UserInvitesContext>(
	{} as UserInvitesContext
)

export const UserInvitesProvider = ({
	children,
	initialInvites
}: IUserInvitesProviderProps) => {
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
				})),
			removeMany: (ids) =>
				set((state) => ({
					invites: state.invites.filter((i) => !ids.includes(i.id))
				})),
			removeOne: (id) =>
				set((state) => ({
					invites: state.invites.filter((i) => i.id !== id)
				}))
		}))
	)

	useEffect(() => {
		if (!user || !invitesSocket) {
			return
		}
		invitesSocket.emit(SocketEvents.JOIN_ROOM, user.id)

		invitesSocket.on(SocketEvents.EXCEPTION, (error) =>
			console.error('WsError', error)
		)

		// TODO:fix
		invitesSocket.on(
			SocketEvents.INVITE_CREATED,
			(invite: TypeInviteWithWorkspace) => {
				store.getState().add(invite)

				toast.info('New invite received')
			}
		)

		invitesSocket.on(SocketEvents.INVITE_UPDATED, (invite: TypeInvite) => {
			store.getState().update(invite.id, invite)
		})

		invitesSocket.on(SocketEvents.INVITE_DELETED, (inviteId: string) => {
			store.getState().removeOne(inviteId)

			toast.info('One of your invites was deleted')
		})

		return () => {
			invitesSocket.emit(SocketEvents.LEAVE_ROOM, user.id)
		}
	}, [invitesSocket, user, store])

	return (
		<UserInvitesContext.Provider value={store}>
			{children}
		</UserInvitesContext.Provider>
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
