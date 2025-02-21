import { Routes } from '@/constants'
import { Button } from '@/features/shared'
import Link from 'next/link'

const NotImplementedPage = () => {
	return (
		<div className="h-screen w-full grid place-items-center">
			<div className="flex flex-col gap-2 items-center">
				The page you tried to access is not implemented yet.
				<Button size="sm" as={Link} href={Routes.ROOT} variant={'ghost'}>
					Back to Home
				</Button>
			</div>
		</div>
	)
}

export default NotImplementedPage
