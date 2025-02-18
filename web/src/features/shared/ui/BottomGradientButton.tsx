'use client'

import { forwardRef } from 'react'

import { cn } from '@/lib'
import { ButtonProps, Button as NextUIButton } from '@nextui-org/react'
import { BottomGradient } from './BottomGradient'

export const BottomGradientButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, ...props }, ref) => {
		return (
			<NextUIButton
				ref={ref}
				className={cn(
					'bg-gradient-to-br relative group/btn  from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]',
					className
				)}
				{...props}
			>
				{children}
				<BottomGradient className='!h-0.5' />
			</NextUIButton>
		)
	}
)

BottomGradientButton.displayName = 'Button'
