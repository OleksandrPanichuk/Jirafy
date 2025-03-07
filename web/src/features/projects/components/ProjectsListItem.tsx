'use client'

import { DEFAULT_COVER_URL, Routes } from '@/constants'
import {
	useAddToFavoritesMutation,
	useFavoritesStore,
	useRemoveFromFavoritesMutation
} from '@/features/favorites'
import { useCurrentWorkspaceMember } from '@/features/members'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { useCopy } from '@/hooks'
import { absoluteUrl, formatDate } from '@/lib'
import { TypeProjectWithMembers } from '@/types'
import {
	Avatar,
	AvatarGroup,
	Card,
	CardBody,
	CardFooter,
	Image,
	Tooltip
} from '@nextui-org/react'
import {
	IconLink,
	IconSettings,
	IconStar,
	IconStarFilled
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

interface IProjectListItemProps {
	project: TypeProjectWithMembers
}

export const ProjectsListItem = ({ project }: IProjectListItemProps) => {
	const favorites = useFavoritesStore((s) => s.favorites)
	const currentMember = useCurrentWorkspaceMember()
	const slug = useCurrentWorkspaceSlug()

	const router = useRouter()

	const favorite = favorites.find((el) => el.projectId === project.id)!

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopy(true)

	const { mutate: removeFromFavorites } = useRemoveFromFavoritesMutation()
	const { mutate: addToFavorites } = useAddToFavoritesMutation()

	const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		e.preventDefault()
		if (favorite) {
			removeFromFavorites({
				favoriteId: favorite.id,
				memberId: currentMember.id
			})
		} else {
			addToFavorites({ projectId: project.id, memberId: currentMember.id })
		}
	}

	return (
		<Card className="flex flex-col rounded border border-tw-border-200 bg-tw-background-100">
			<CardBody
				onClick={() => router.push(Routes.PROJECT_ISSUES(slug, project.id))}
				className="overflow-visible p-0 relative cursor-pointer "
			>
				<Image
					src={project.cover?.url ?? DEFAULT_COVER_URL}
					alt={project.name}
					className="w-full object-cover h-[118px]"
					radius="none"
					width={'100%'}
				/>
				<div
					className={
						'absolute bottom-4 z-[10] flex h-10 w-full items-center justify-between gap-3 px-4'
					}
				>
					<div className="flex flex-grow items-center gap-2.5 truncate">
						<div className="h-9 w-9 flex-shrink-0 grid place-items-center rounded bg-white/10">
							{project.emoji}
						</div>
						<div>
							<h5 className="truncate font-semibold text-white">
								{project.name}
							</h5>
							<span className="flex items-center gap-1.5 text-xs font-medium text-white">
								{project.identifier}
							</span>
						</div>
					</div>

					<div className="flex h-full flex-shrink-0 items-center gap-2">
						<button
							onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								copy(absoluteUrl(Routes.PROJECT_ISSUES(slug, project.id)))
							}}
							className="flex h-6 w-6 items-center justify-center rounded bg-white/10"
						>
							<IconLink className="size-4" />
						</button>
						<button
							onClick={handleToggleFavorite}
							className="flex h-6 w-6 items-center justify-center rounded bg-white/10"
						>
							{favorite ? (
								<IconStarFilled className="size-4 fill-yellow-500" />
							) : (
								<IconStar className="size-4" />
							)}
						</button>
					</div>
				</div>
			</CardBody>
			<CardFooter className="flex h-[104px] w-full flex-col justify-between items-start rounded-b p-4">
				<p className="line-clamp-2 break-words text-sm text-tw-text-300">
					Created on {formatDate(project.createdAt)}
				</p>
				<div className="items-center flex justify-between w-full pl-2.5">
					<AvatarGroup
						max={5}
						total={project._count.members}
						size="sm"
						renderCount={(count) => {
							if (count <= 5) {
								return null
							}
							return (
								<p className="text-xs text-foreground font-medium ms-2">
									+{count - 5} more
								</p>
							)
						}}
					>
						{project.members.map((member) => (
							<Tooltip
								key={member.id}
								content={
									<span className="text-sm w-max">
										{member.user.firstName} {member.user.lastName}
									</span>
								}
							>
								<Avatar
									src={member.user.avatar?.url}
									name={member.user.username}
									className="!transition-none !animate-none  !translate-x-0"
									showFallback
								/>
							</Tooltip>
						))}
					</AvatarGroup>
					{/* TODO: show settings icon if current user */}
					<Link
						href={Routes.PROJECT_SETTINGS(slug, project.id)}
						className="flex items-center justify-center rounded p-1 text-tw-text-400 hover:bg-tw-bg-80 hover:text-tw-text-200"
					>
						<IconSettings className="size-3.5" />
					</Link>
				</div>
			</CardFooter>
		</Card>
	)
}
