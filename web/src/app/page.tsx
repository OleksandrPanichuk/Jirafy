'use client'
import { toast } from '@/features/notifications'
import { Button } from '@nextui-org/react'

const Page = () => {
	return (
		<div>
			<Button
				color='primary'
				onClick={() =>
					toast.success('Hello, World!', {
						position: 'top-left',
					})
				}
			>
				Click Me
			</Button>
		</div>
	)
}

export default Page
