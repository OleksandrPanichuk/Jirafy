'use client'

import { UpdateWorkspaceInput, updateWorkspaceSchema } from '@/api'
import {
	Button,
	FieldWrapper,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	Label
} from '@/components/ui'
import { Routes } from '@/constants'
import { ImageUploader } from '@/features/images'
import { toast } from '@/features/toast'
import {
	SizeSelect,
	useCurrentWorkspace,
	useUpdateWorkspaceMutation
} from '@/features/workspaces'
import { useCopy } from '@/hooks'
import { absoluteUrl, domainUrl } from '@/lib'
import { TypeFile } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Input } from '@nextui-org/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

type FormValues = Omit<Required<UpdateWorkspaceInput>, 'logo'>

export const UpdateWorkspaceForm = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopy()

	const workspace = useCurrentWorkspace()
	const form = useForm<FormValues>({
		resolver: zodResolver(updateWorkspaceSchema.omit({ logo: true })),
		defaultValues: {
			name: workspace.name,
			size: workspace.size,
			workspaceId: workspace.id
		}
	})

	const { handleSubmit, control } = form

	const { mutate: updateWorkspace, isPending } = useUpdateWorkspaceMutation()

	const handleCopy = () => {
		copy(absoluteUrl(Routes.WORKSPACE_BY_SLUG(workspace.slug)))

		toast.success('Workspace URL copied to clipboard')
	}

	const handleLogoUpload = (uploaded: TypeFile) => {
		updateWorkspace({
			workspaceId: workspace.id,
			logo: uploaded
		})
	}

	const handleLogoRemove = () => {
		updateWorkspace({
			workspaceId: workspace.id,
			logo: null
		})
	}

	const onSubmit = (values: FormValues) => {
		updateWorkspace(values)
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
							'w-14 h-14 grid place-items-center rounded-lg overflow-hidden aspect-video cursor-pointer bg-gray-700  relative'
						}
					>
						{workspace.logo ? (
							<Image
								src={workspace.logo.url}
								objectFit={'cover'}
								alt={'workspace url'}
								fill
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
			<Divider className={'my-6'} />
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={'flex flex-col gap-8 items-start'}
				>
					<div className={'grid xl:grid-cols-2 2xl:grid-cols-3 gap-10 w-full'}>
						<FormField
							control={control}
							name={'name'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Workspace name</FormLabel>
									<FormControl>
										<Input
											variant="flat"
											classNames={{
												inputWrapper: 'rounded-md'
											}}
											isDisabled={isPending}
											placeholder={'Name'}
											{...field}
										/>
									</FormControl>
									<FormError />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={'size'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company size</FormLabel>
									<FormControl>
										<SizeSelect disabled={isPending} {...field} />
									</FormControl>
									<FormError />
								</FormItem>
							)}
						/>
						<FieldWrapper className={'pointer-events-none'}>
							<Label htmlFor={'slug'}>Workspace URL</Label>
							<Input
								variant="flat"
								id={'slug'}
								classNames={{
									inputWrapper: 'rounded-md'
								}}
								isDisabled={isPending}
								value={domainUrl(Routes.WORKSPACE_BY_SLUG(workspace.slug))}
								readOnly
							/>
						</FieldWrapper>
					</div>
					<Button isDisabled={isPending} type={'submit'} size={'sm'}>
						{isPending ? 'Updating' : 'Update workspace'}
					</Button>
				</form>
			</Form>
			<Divider className={'my-6'} />
		</div>
	)
}
