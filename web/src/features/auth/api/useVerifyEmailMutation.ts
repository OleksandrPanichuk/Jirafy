'use client'

import { EmailApi, VerifyEmailInput } from '@/api'
import { IUseMutationProps, useMutation } from '@/hooks'
import { AxiosResponse } from 'axios'

export const useVerifyEmailMutation = <
	T extends AxiosResponse<string>,
	U extends VerifyEmailInput
>(
	options?: Omit<IUseMutationProps<T, U>, 'mutationFn'>
) => {
	return useMutation({
		...options,
		mutationFn: async (dto: U) => {
			const response = await EmailApi.verifyEmail(dto)
			return response as unknown as T
		}
	})
}
