import { Routes } from '@/constants'
import { Button } from '@/features/shared'
import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className="h-screen w-full grid place-items-center p-4 bg-tw-bg-100">
			<div className=" flex flex-col gap-8 items-center">
				<div className="relative size-60 lg:size-80">
					<Image src={'/not-found.svg'} alt="not-found" fill />
				</div>
				<div className="space-y-2 text-center">
					<h3 className="text-lg font-semibold">Oops! Something went wrong.</h3>
					<p className="text-sm text-tw-text-200">
						Sorry, the page you are looking for cannot be found. It may have
						been removed, had its name changed, or is temporarily unavailable.
					</p>
				</div>
				<Button as={Link} href={Routes.ROOT} variant={'ghost'} size="sm">
					Go to Home
				</Button>
			</div>
		</div>
	)
}

export default NotFoundPage
