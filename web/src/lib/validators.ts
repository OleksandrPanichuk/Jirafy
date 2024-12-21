import { FormErrors } from '@/constants/errors'
import { isMongoId } from 'validator'
import { z } from 'zod'

export const zRequired = (message: string = FormErrors.required.any) => {
	return z.string({ required_error: message }).trim().min(1, message)
}

export const zMongoId = ({
	message_invalid = 'Invalid id',
	message_required = FormErrors.required.any
}: { message_invalid?: string; message_required?: string } = {}) => {
	return z
		.string({ required_error: message_required })
		.refine(isMongoId, { message: message_invalid })
}

export const zUploadedFile = () => {
	return z.object({
		url: z.string().url(),
		key: z.string().optional()
	})
}
