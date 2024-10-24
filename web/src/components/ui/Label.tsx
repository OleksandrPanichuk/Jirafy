'use client'

import { cn } from '@/lib'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const Label = forwardRef<
	ElementRef<'label'>,
	ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => (
	<label
		ref={ref}
		className={cn(
			'text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
			className
		)}
		{...props}
	/>
))
Label.displayName = 'Label'

const LabelInputContainer = forwardRef<
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

LabelInputContainer.displayName = 'LabelInputContainer'

export { Label, LabelInputContainer }
