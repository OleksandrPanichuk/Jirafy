'use client'

import { cn } from '@/lib'
import { Button, ButtonVariantProps, Tooltip } from "@heroui/react"
import Link from 'next/link'

interface ISidebarNavButtonProps {
	tooltipText?: string
	href: string
	isCollapsed: boolean
	variant?: ButtonVariantProps['variant']
	size?: ButtonVariantProps['size']
	startContent?: React.ReactNode
	children?: React.ReactNode
	className?: string
}

export const SidebarNavButton = ({
	tooltipText,
	href,
	isCollapsed,
	startContent,
	children,
	variant = 'light',
	size = 'sm',
	className
}: ISidebarNavButtonProps) => {
	return (
		<Tooltip
			hidden={!isCollapsed}
			content={<span className="text-sm">{tooltipText ?? children}</span>}
			placement="right"
		>
			<Button
				href={href}
				as={Link}
				variant={variant}
				size={size}
				isIconOnly={isCollapsed}
				startContent={startContent}
				className={cn(
					'font-medium leading-5 text-xs text-tw-text-200 rounded',
					!isCollapsed && 'justify-start',
					className
				)}
			>
				{!isCollapsed && children}
			</Button>
		</Tooltip>
	)
}
