'use client'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
	useFormContext,
} from 'react-hook-form'

import { Label, LabelInputContainer } from '@/components/ui'
import { cn } from '@/lib'
import { IconAlertTriangle } from '@tabler/icons-react'

const Form = FormProvider

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
)

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
)

const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<LabelInputContainer ref={ref} {...props} />
		</FormItemContext.Provider>
	)
})
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
	React.ElementRef<'label'>,
	React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField()

	return (
		<Label
			ref={ref}
			className={cn(error && 'text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField()

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	)
})
FormDescription.displayName = 'FormDescription'

const FormError = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { error } = useFormField()
	if (!error || !String(error.message)) {
		return null
	}

	return (
		<div
			className={cn(
				'bg-[#3B1219] border-[#72232D] flex gap-2 items-center shadow px-3 py-2 rounded border transition-colors duration-100',
				className
			)}
			{...props}
			ref={ref}
		>
			<div className=' flex gap-2 items-center'>
				<IconAlertTriangle size={20} />
				<span className='font-medium text-sm'>{String(error.message)}</span>
			</div>
		</div>
	)
})

FormError.displayName = 'FormError'

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn('text-sm font-medium text-destructive', className)}
			{...props}
		>
			{body}
		</p>
	)
})
FormMessage.displayName = 'FormMessage'

export {
	Form,
	FormControl,
	FormDescription,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
}