'use client'
import { cn, mergeRefs } from '@/lib'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import {
	ElementRef,
	FocusEvent,
	forwardRef,
	InputHTMLAttributes,
	ReactNode,
	useRef,
	useState
} from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	startContent?: ReactNode
	classNames?: {
		wrapper?: string
		prefix?: string
		container?: string
	}
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, classNames, onFocus, onBlur, startContent, type, ...props },
		ref
	) => {
		const radius = 100
		const [visible, setVisible] = useState(false)
		const [isFocused, setIsFocused] = useState(false)
		const inputRef = useRef<ElementRef<'input'>>(null)

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

		function handleFocus(e: FocusEvent<HTMLInputElement>) {
			setIsFocused(true)

			onFocus?.(e)
		}

		function handleBlur(e: FocusEvent<HTMLInputElement>) {
			setIsFocused(false)

			onBlur?.(e)
		}

		function handleInputFocus() {
			inputRef.current?.focus()
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
					'p-[2px] rounded-lg transition duration-300 group/input',
					classNames?.wrapper
				)}
			>
				<div
					className={cn(
						'w-full flex items-center bg-zinc-800 rounded-md px-3 py-2  shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400 h-10',
						isFocused && 'ring-[2px] ring-neutral-600',
						classNames?.container
					)}
				>
					{startContent && (
						<div
							onClick={handleInputFocus}
							className={cn('text-sm text-zinc-300', classNames?.prefix)}
						>
							{startContent}
						</div>
					)}
					<input
						type={type}
						className={cn(
							`flex   w-full border-none bg-transparent  text-white  text-sm  file:border-0 file:bg-transparent
              file:text-sm file:font-medium placeholder-text-neutral-600
              focus-visible:outline-none  
              disabled:cursor-not-allowed disabled:opacity-50
           `,
							className
						)}
						onFocus={handleFocus}
						onBlur={handleBlur}
						ref={mergeRefs(ref, inputRef)}
						{...props}
					/>
				</div>
			</motion.div>
		)
	}
)
Input.displayName = 'Input'

export { Input }
