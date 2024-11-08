'use client'
import { Logo } from '@/components/common'
import { Routes } from '@/constants'
import { useAuth } from '@/features/auth'
import { CreateWorkspaceForm, useWorkspacesStore } from '@/features/workspaces'
import Link from 'next/link'

// TODO: check for invites for this user. If there is an invite, show a вибір to join the workspace or create a new one
const CreateWorkspacePage = () => {
	const user = useAuth((s) => s.user)
	const workspaces = useWorkspacesStore((s) => s.workspaces)

	const LogoComponent = workspaces.length ? Link : 'div'

	return (
		<div className="flex min-h-screen bg-tw-bg-100 ">
			<div className="sm:flex-[1] hidden w-full justify-center sm:flex">
				<div className="relative">
					<div className="flex-1 absolute left-4 top-0 w-[2px] h-full border border-tw-border-200" />
					<LogoComponent
						href={Routes.ROOT}
						className="flex-1 absolute top-[10%] z-10 bg-tw-bg-100 flex items-center gap-2 p-1"
					>
						<Logo />
						<span className="text-3xl font-bold">Jirafy</span>
					</LogoComponent>
				</div>
				<div className="absolute right-14 top-16">
					<p className="text-xs select-none">{user?.email}</p>
				</div>
			</div>
			<div className="flex-[2] md:flex-[8] self-center p-4">
				<div className="w-full sm:max-w-md">
					<CreateWorkspaceForm />
				</div>
			</div>
		</div>
	)
}

export default CreateWorkspacePage
