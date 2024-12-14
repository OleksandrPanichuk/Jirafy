'use client'

import { Routes } from '@/constants'
import { ImageUploader } from '@/features/images'
import { toast } from '@/features/notifications'
import { useCurrentWorkspace, useWorkspacesStore } from '@/features/workspaces'
import { absoluteUrl, domainUrl } from '@/lib'
import { TypeFile } from '@/types'
import Image from 'next/image'
import { useCopyToClipboard } from 'react-use'

export const UpdateWorkspaceForm = () => {
	const workspace = useCurrentWorkspace()
	const updateWorkspaceStore = useWorkspacesStore((s) => s.updateWorkspace)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()

	const handleCopy = () => {
		copy(absoluteUrl(Routes.WORKSPACE_BY_SLUG(workspace.slug)))

		toast.success('Workspace URL copied to clipboard')
	}

	const handleLogoUpload = (uploaded: TypeFile) => {
		updateWorkspaceStore(workspace.id, {
			logo: uploaded
		})
	}

	const handleLogoRemove = () => {
		updateWorkspaceStore(workspace.id, {
			logo: undefined
		})
	}

	return (
		<div className={'px-2'}>
			<div className={'flex items-start gap-3'}>
				<ImageUploader
					value={workspace.logo}
					onUpload={handleLogoUpload}
					onRemove={handleLogoRemove}
				>
					<div
						className={
							'w-14 h-14 grid place-items-center rounded-lg aspect-video cursor-pointer bg-gray-700  relative'
						}
					>
						{workspace.logo ? (
							<Image
								src={workspace.logo.url}
								objectFit={'cover'}
								fill
								alt={'workspace url'}
							/>
						) : (
							<span className={'uppercase text-lg text-white'}>
								{workspace.name.at(0)}
							</span>
						)}
					</div>
				</ImageUploader>
				<div className={'flex flex-col gap-1'}>
					<h3 className={'text-lg font-semibold leading-6 mb:-my-5'}>
						{workspace.name}
					</h3>
					<button
						onClick={handleCopy}
						className={'text-sm tracking-tight text-left'}
					>
						{domainUrl(Routes.WORKSPACE_BY_SLUG(workspace.slug))}
					</button>
					<ImageUploader value={workspace.logo} onUpload={handleLogoUpload}>
						<button
							className={
								'flex items-center gap-1.5 text-left text-xs font-medium text-tw-primary-100'
							}
						>
							Upload logo
						</button>
					</ImageUploader>
				</div>
			</div>
		</div>
	)
}
