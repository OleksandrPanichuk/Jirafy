'use client'

import { updateCurrentUserSchema } from '@/api/users/users.dto'
import { useAuth } from '@/features/auth'
import { CoverPicker, ImageUploader } from '@/features/images'
import { useUpdateCurrentUserMutation } from '@/features/profile'
import {
	Button,
	FieldWrapper,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Label
} from '@/features/shared'
import { useUploadFileMutation } from '@/features/storage'
import { TypeFile } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'

import Image from 'next/image'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserInfo } from './UserInfo'

const formSchema = updateCurrentUserSchema.omit({
	coverImage: true,
	avatar: true
})

export type FormValues = z.infer<typeof formSchema>

export const CurrentProfileForm = () => {
	const user = useAuth((s) => s.user)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			username: user?.username
		},
		mode: 'onChange'
	})

	const [cover, setCover] = useState(user?.coverImage?.url)

	const { control, handleSubmit, watch } = form

	const {
		mutateAsync: updateUserAsync,
		mutate: updateUser,
		isPending
	} = useUpdateCurrentUserMutation()
	const { mutateAsync: uploadFile } = useUploadFileMutation()

	const handleCoverChange = async (data: File | string) => {
		try {
			let uploaded: TypeFile | undefined
			if (data instanceof File) {
				uploaded = (await uploadFile(data)).data
				setCover(uploaded.url)
			} else {
				setCover(data)
			}
			await updateUserAsync({
				coverImage: data instanceof File ? uploaded : { url: data }
			})
		} catch (err) {
			console.error(err)
		}
	}

	const handleAvatarUpload = (image: TypeFile) => {
		updateUser({
			avatar: image
		})
	}

	const handleAvatarRemove = () => {
		updateUser({
			avatar: null
		})
	}

	const onSubmit = (data: FormValues) => {
		const changes: Partial<FormValues> = {}
		if (data.firstName?.trim() !== user?.firstName?.trim()) {
			changes.firstName = data.firstName
		}
		if (data.lastName?.trim() !== user?.lastName?.trim()) {
			changes.lastName = data.lastName
		}
		if (data.username?.trim() !== user?.username?.trim()) {
			changes.username = data.username
		}
		if (Object.keys(changes).length === 0) {
			return
		}
		updateUser(changes)
	}

	if (!user) {
		return null
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" w-full my-16 lg:w-2/3 mx-auto px-3"
			>
				<div className="relative">
					<CoverPicker
						value={cover}
						onChange={handleCoverChange}
						text="Change cover"
					/>

					<ImageUploader
						value={user.avatar}
						onUpload={handleAvatarUpload}
						onRemove={handleAvatarRemove}
					>
						<div
							className={
								'w-14 h-14 grid place-items-center rounded-lg overflow-hidden aspect-video cursor-pointer bg-gray-700  absolute left-10 bottom-0 translate-y-[50%]'
							}
						>
							{user.avatar?.url ? (
								<Image
									src={user.avatar.url}
									className="object-cover"
									alt={'workspace url'}
									fill
								/>
							) : (
								<span className={'uppercase text-lg text-white'}>
									{user.firstName.at(0)}
								</span>
							)}
						</div>
					</ImageUploader>
				</div>
				<div className="mt-10 mb-4">
					<UserInfo control={control} />
				</div>
				<div className=" flex flex-col sm:grid gap-4  sm:grid-cols-2">
					<FormField
						control={control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel withAsterisk>First name</FormLabel>
								<FormControl>
									<Input
										size={'sm'}
										placeholder={'Enter your first name'}
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel withAsterisk>Last name</FormLabel>
								<FormControl>
									<Input
										size={'sm'}
										placeholder={'Enter your last name'}
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel withAsterisk>Display name</FormLabel>
								<FormControl>
									<Input
										size={'sm'}
										placeholder={'Enter your display name'}
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FieldWrapper>
						<Label htmlFor="email" withAsterisk>
							Email
						</Label>
						<Input
							value={user.email}
							id="email"
							size={'sm'}
							readOnly
							disabled
						/>
					</FieldWrapper>
				</div>
				<Button
					isDisabled={isPending}
					className="mt-4"
					size="sm"
					variant="primary"
					type="submit"
				>
					Save changes
				</Button>
			</form>
		</Form>
	)
}
