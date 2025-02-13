'use client'

import { Button } from '@/components/ui'
import { Routes } from '@/constants'
import {
	useAcceptInvitesMutation,
	useRejectInvitesMutation,
	UserInviteCard,
	useUserInvitesStore
} from '@/features/invites'
import { useConfirm } from '@/hooks'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'

export const UserInvitesList = () => {
	const router = useRouter()
	const [ConfirmationModal, confirm] = useConfirm()

	const invites = useUserInvitesStore((s) => s.invites)
	const [selected, setSelected] = useState<Set<string>>(new Set())

	const { mutateAsync: acceptInvites, isPending: isAccepting } =
		useAcceptInvitesMutation()
	const { mutate: rejectInvites, isPending: isRejecting } =
		useRejectInvitesMutation()

	const handleToggle = (id: string) => {
		if (selected.has(id)) {
			setSelected((prev) => {
				const newSelected = new Set(prev)
				newSelected.delete(id)
				return newSelected
			})
		} else {
			setSelected((prev) => new Set([...prev, id]))
		}
	}

	const handleAccept = async () => {
		try {
			await acceptInvites({ invites: Array.from(selected) })
			router.push(Routes.ROOT)
		} catch {}
	}

	const handleReject = async () => {
		const ok = await confirm()
		if (!ok) {
			return
		}

		rejectInvites(
			{ invites: Array.from(selected) },
			{
				onSuccess: () => {
					router.push(Routes.ROOT)
				}
			}
		)
	}

	const isDisabled = isAccepting || isRejecting

	return (
		<>
			<ConfirmationModal />
			<div className="md:w-3/5 space-y-4">
				<div className="space-y-4 max-h-[37vh] overflow-y-auto">
					{invites.map((invite) => (
						<UserInviteCard
							key={invite.id}
							data={invite}
							onToggle={() => handleToggle(invite.id)}
							isSelected={selected.has(invite.id)}
							isDisabled={isDisabled}
						/>
					))}
				</div>
				<div className="flex gap-2 flex-col xs:flex-row">
					<Button
						className="max-xs:w-full"
						onPress={handleAccept}
						variant="primary"
						size="sm"
						isDisabled={!selected.size || isDisabled}
					>
						Accept & Join
					</Button>

					<Button
						className="max-xs:w-full"
						onPress={router.back}
						variant="ghost"
						size="sm"
						isDisabled={isDisabled}
					>
						Go Home
					</Button>
					<div className="flex-1 max-xs:hidden" />
					<Button
						className="min-w-20 max-xs:w-full"
						onPress={handleReject}
						variant="danger"
						size="sm"
						isDisabled={!selected.size || isDisabled}
					>
						Reject
					</Button>
				</div>
			</div>
		</>
	)
}
