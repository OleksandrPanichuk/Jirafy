'use client'
import { cn, mergeRefs } from '@/lib'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cva, VariantProps } from 'class-variance-authority'
import {
	ElementRef,
	FocusEvent,
	forwardRef,
	ReactNode,
	TextareaHTMLAttributes,
	useRef,
	useState
} from 'react'

const containerVariants = cva(
	'w-full flex items-center bg-zinc-800 rounded-md shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/textarea:shadow-none transition duration-400',
	{
		variants: {
			size: {
				sm: 'px-2 py-1',
				md: 'px-3 py-2'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	}
)

const textareaVariants = cva(
	'flex w-full border-none bg-transparent text-white placeholder-text-neutral-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			size: {
				sm: 'text-xs',
				md: 'text-sm'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	}
)

const prefixVariants = cva('cursor-pointer', {
	variants: {
		size: {
			sm: 'text-xs',
			md: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'md'
	}
})

export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof containerVariants> {
	startContent?: ReactNode
	classNames?: {
		wrapper?: string
		prefix?: string
		container?: string
	}
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			className,
			classNames,
			onFocus,
			onBlur,
			startContent,
			size = 'md',
			...props
		},
		ref
	) => {
		const radius = 100
		const [visible, setVisible] = useState(false)
		const [isFocused, setIsFocused] = useState(false)
		const textareaRef = useRef<ElementRef<'textarea'>>(null)

		const mouseX = useMotionValue(0)
		const mouseY = useMotionValue(0)

		function handleMouseMove({
			currentTarget,
			clientX,
			clientY
		}: React.MouseEvent<HTMLDivElement>) {
			const { left, top } = currentTarget.getBoundingClientRect()

			mouseX.set(clientX - left)
			mouseY.set(clientY - top)
		}

		function handleFocus(e: FocusEvent<HTMLTextAreaElement>) {
			setIsFocused(true)

			onFocus?.(e)
		}

		function handleBlur(e: FocusEvent<HTMLTextAreaElement>) {
			setIsFocused(false)

			onBlur?.(e)
		}

		function handleTextareaFocus() {
			textareaRef.current?.focus()
		}

		return (
			<motion.div
				style={{
					background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				className={cn(
					'p-[2px] rounded-lg transition duration-300 group/textarea',
					classNames?.wrapper
				)}
			>
				<div
					className={cn(
						containerVariants({ size }),
						isFocused && 'ring-[2px] ring-neutral-600',
						classNames?.container
					)}
				>
					{startContent && (
						<div
							onClick={handleTextareaFocus}
							className={cn(prefixVariants({ size }), classNames?.prefix)}
						>
							{startContent}
						</div>
					)}
					<textarea
						className={cn(textareaVariants({ size }), className)}
						onFocus={handleFocus}
						onBlur={handleBlur}
						ref={mergeRefs(ref, textareaRef)}
						{...props}
					/>
				</div>
			</motion.div>
		)
	}
)
Textarea.displayName = 'Textarea'

export { Textarea }
