import { cn } from '@/lib'

interface IBottomGradientProps {
	className?: string
}

export const BottomGradient = ({ className }: IBottomGradientProps) => {
	return (
		<>
			<span
				className={cn(
					'group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent',
					className
				)}
			/>
			<span
				className={cn(
					'group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent',
					className
				)}
			/>
		</>
	)
}
