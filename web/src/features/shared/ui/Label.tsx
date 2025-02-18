'use client'

import { cn } from '@/lib'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export interface ILabelProps extends ComponentPropsWithoutRef<'label'> {
	withAsterisk?: boolean
}

const Label = forwardRef<ElementRef<'label'>, ILabelProps>(
	({ className, withAsterisk, children, ...props }, ref) => (
		<label
			ref={ref}
			className={cn(
				'text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				className
			)}
			{...props}
		>
			{children}
			{withAsterisk && <span className="text-red-500 ml-1">*</span>}
		</label>
	)
)
Label.displayName = 'Label'

const FieldWrapper = forwardRef<
	ElementRef<'div'>,
	ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
	return (
		<div
			{...props}
			ref={ref}
			className={cn('flex flex-col gap-2 w-full', className)}
		>
			{children}
		</div>
	)
})

FieldWrapper.displayName = 'FieldWrapper'

export { Label, FieldWrapper }
