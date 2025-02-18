'use client'

import { cn } from '@/lib'
import Image from 'next/image'
import randomColor from 'randomcolor'

interface IWorkspaceLogoProps {
	size: number
	name: string
	src?: string
}

export const WorkspaceLogo = ({ name, src, size }: IWorkspaceLogoProps) => {
	if (src) {
		return (
			<div
				className={'rounded-md relative overflow-hidden'}
				style={{
					width: `${size}px`,
					height: `${size}px`
				}}
			>
				<Image src={src} className='object-cover' alt={`${name} logo`} fill />
			</div>
		)
	}

	return (
		<div
			className={cn('rounded-md flex items-center justify-center  font-bold')}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				backgroundColor: randomColor({
					seed: name.at(0),
					luminosity: 'dark'
				}),
				color: randomColor({
					luminosity: 'light',
					seed: name.at(0)
				})
			}}
		>
			{name[0].toUpperCase()}
		</div>
	)
}
