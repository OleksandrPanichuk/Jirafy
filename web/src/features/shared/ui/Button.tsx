'use client'
import { cn } from '@/lib'
import { ButtonProps, Button as NextUIButton } from '@nextui-org/react'
import { cva, VariantProps } from 'class-variance-authority'

const buttonVariants = cva('rounded', {
	variants: {
		variant: {
			primary:
				'text-white bg-tw-primary-100 hover:bg-tw-primary-200  focus:bg-tw-primary-200',
			ghost:
				'bg-transparent border-tw-border-200 hover:bg-tw-border-200  border',
			danger:
				'focus:bg-red-600 focus:text-red-200 bg-red-500 hover:bg-red-600 text-white'
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
})

interface IButtonProps
	extends Omit<ButtonProps, 'variant'>,
		VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, ...props }: IButtonProps) => {
	return (
		<NextUIButton
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		/>
	)
}
