import { TypeInviteWithUser } from '@/types'
import { create } from 'zustand'

interface IWorkspaceInvitesStore {
	invites: TypeInviteWithUser[]
	set: (invites: TypeInviteWithUser[]) => void
	remove: (id: string) => void
	update: (id: string, data: Partial<Omit<TypeInviteWithUser, 'id'>>) => void
}

export const useWorkspaceInvitesStore = create<IWorkspaceInvitesStore>(
	(set) => ({
		invites: [],
		set: (newInvites) => set(() => ({ invites: newInvites })),
		remove: (id) =>
			set((state) => ({ invites: state.invites.filter((i) => i.id !== id) })),
		update: (id, data) =>
			set((state) => ({
				invites: state.invites.map((i) => (i.id === id ? { ...i, ...data } : i))
			}))
	})
)
