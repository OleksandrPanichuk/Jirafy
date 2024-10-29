import Image from 'next/image'

interface ILogoProps {
	width?: number
	height?: number
	className?: string
}

export const Logo = ({ className, height = 32, width = 32 }: ILogoProps) => {
	return (
		<Image
			src="/logo.svg"
			alt="Jirafy Logo"
			width={width}
			height={height}
			className={className}
		/>
	)
}
