'use client'

import { EmailApi, SendVerificationLinkInput } from '@/api'
import { IUseMutationProps, useMutation } from '@/hooks'
import { AxiosResponse } from 'axios'

export const useSendVerificationLinkMutation = <
	T extends AxiosResponse<string>,
	U extends SendVerificationLinkInput
>(
	options?: Omit<IUseMutationProps<T, U>, 'mutationFn'>
) => {
	return useMutation({
		...options,
		mutationFn: async (dto: U) => {
			const response = await EmailApi.sendVerificationLink(dto)
			return response as unknown as T
		}
	})
}
